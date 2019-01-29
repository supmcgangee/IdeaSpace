import { Component, OnInit, Input } from '@angular/core';
import { Space } from '../../models/space';
import { Idea } from '../../models/idea';
import { WorkSpaceService } from './work-space.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateIdeaComponent } from '../../dialogue/create-idea/create-idea.component';
import { Group } from '../../models/group';
import { GroupInfoComponent } from '../../dialogue/group-info/group-info.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-work-space',
  template: `Current Space: {{currentSpace.Name}}`,
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss']
})
export class WorkSpaceComponent implements OnInit {

  private currentSpace: Space = new Space;
  private allGroups: Group[] = [];

  groupCreateMode: boolean = false;
  groupCreateName: string = "";
  hoverGroup: Group;

  @Input()
  set changeSpace(currentSpace: Space) {
    this.currentSpace = currentSpace;
    if (this.currentSpace.Name != undefined) {
      this.updateGroupList();
    }
  }

  constructor(
    private service: WorkSpaceService,
    public dialog: MatDialog,
    private cookie: CookieService) { }

  ngOnInit() {
  }

  async updateGroupList() {
    this.allGroups = [];
    if (this.currentSpace.Groups == null) {
      this.currentSpace.Groups = [];
    }
    this.currentSpace.Groups.forEach(group => {
      let newGroup: Group = new Group;
      newGroup.Name = group;
      newGroup.Ideas = [];
      newGroup.open = this.getOpenData(group);
      this.allGroups.push(newGroup);
    });

    let foundGroups = await this.service.getAllGroups(this.currentSpace.Name);
    let unhandledGroup = new Group;
    unhandledGroup.Ideas = [];

    foundGroups.forEach(group => {
      let index = this.allGroups.findIndex(g => g.Name == group.Name)
      if (index >= 0) {
        this.allGroups[index].Ideas = [];
        group.Ideas.forEach(idea => {
          this.allGroups[index].Ideas.push(idea)
        });
        group.Ideas;
      }
      else {
        unhandledGroup.Name = "-Unhandled-";
        group.Ideas.forEach(idea => {
          unhandledGroup.Ideas.push(idea);
        });
      }
    });

    if (unhandledGroup.Ideas.length > 0) {
      this.allGroups.push(unhandledGroup);
    }
  }

  openCreateIdeaDialog(group: string) {
    let dialogRef = this.dialog.open(CreateIdeaComponent, {
      width: '500px',
      data: { title: "", body: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.createIdea == true) {
        let idea = new Idea;
        idea.Title = result.title;
        idea.Body = result.body;
        idea.ParentGroup = group;
        this.createNewIdea(idea);
      }
    });
  }

  openGroupInfoDialog(group: Group) {
    let dialogRef = this.dialog.open(GroupInfoComponent, {
      width: '500px',
      data: { group: group, canBeDeleted: this.currentSpace.canBeDeleted, canBeEdited: this.currentSpace.canCreateIdeas }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.toSave == true) {
        this.saveGroupData(result.newName, result.oldName);
      }
      if (result != undefined && result.toDelete == true) {
        this.deleteGroup(result.newName, false);
      }
      else if (result != undefined && result.toDeleteAll == true) {
        this.deleteGroup(result.newName, true);
      }
    });
  }

  async saveGroupData(newName: string, oldName: string) {
    let index = this.currentSpace.Groups.findIndex(g => g == oldName);
    this.currentSpace.Groups[index] = newName;

    index = this.allGroups.findIndex(g => g.Name == newName);
    this.allGroups[index].Ideas.forEach(idea => {
      idea.ParentGroup = newName;
      this.createNewIdea(idea);
    });

    this.cookie.delete(this.currentSpace + "/" + oldName);
    await this.service.createNewSpace(this.currentSpace);
  }

  async deleteGroup(groupName: string, withData: boolean) {
    if (withData == true) {
      let foundGroups = await this.service.getAllGroups(this.currentSpace.Name);
      let fIndex = foundGroups.findIndex(g => g.Name == groupName);

      foundGroups[fIndex].Ideas.forEach(i => {
        this.deleteIdea(i.Title);
      });
    }
    let index: number = this.currentSpace.Groups.findIndex(g => g == groupName);
    this.currentSpace.Groups.splice(index)

    await this.service.createNewSpace(this.currentSpace);
    this.cookie.delete(this.currentSpace + "/" + groupName)
    this.updateGroupList();
  }

  async createNewIdea(idea: Idea) {
    if (idea.Title != "") {
      await this.service.createNewIdea(this.currentSpace.Name, idea);
      this.updateGroupList();
    }
  }

  async deleteIdea(idea: string) {
    await this.service.deleteIdea(this.currentSpace.Name, idea);
    this.updateGroupList();
    console.log(this.currentSpace.Groups)
  }

  editNewGroup() {
    this.groupCreateMode = true;
  }

  async createNewGroup() {
    this.groupCreateMode = false;
    this.currentSpace.Groups.push(this.groupCreateName);
    await this.service.createNewSpace(this.currentSpace);

    this.groupCreateName = ""
    this.updateGroupList();
    this.setOpenData(this.groupCreateName, false);
  }

  dragAndDrop(event: CdkDragDrop<Group>) {
    console.log(event.item)
    console.log(event.container.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.Ideas, event.previousIndex, event.currentIndex);
    } else {
      let newIdea: Idea = new Idea;
      newIdea.Title = event.previousContainer.data.Ideas[event.previousIndex].Title;
      newIdea.Body = event.previousContainer.data.Ideas[event.previousIndex].Body;
      newIdea.ParentGroup = event.container.data.Name;
      transferArrayItem(event.previousContainer.data.Ideas,
        event.container.data.Ideas,
        event.previousIndex,
        event.currentIndex);
      this.createNewIdea(newIdea)
    }
  }

  preventResize(){
    this.allGroups.forEach(group => {
      if(group.Ideas.length == 0){
        group.open = false;
        this.setOpenData(group.Name, false);
      }
    });
  }

  setOpenData(groupName: string, state: boolean) {
    this.cookie.set(this.currentSpace.Name + "/" + groupName, state.toString());
  }

  getOpenData(groupName: string) : boolean {
    let state = (this.cookie.get(this.currentSpace.Name + "/" + groupName) == "true");
    return state;
  }
}
