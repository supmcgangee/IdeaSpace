import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { CreateIdeaComponent } from '../../dialogue/create-idea/create-idea.component';
import { GroupInfoComponent } from '../../dialogue/group-info/group-info.component';
import { GroupCardService } from './group-card.service';
import { Space } from '../../models/space';
import { Group } from '../../models/group';
import { Idea } from '../../models/idea';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {

  @Output() 
  emitter = new EventEmitter();

  hovering: boolean;

  @Input() 
  group: Group;
  @Input() 
  currentSpace: Space;

  constructor(
    private service: GroupCardService,
    private dialog: MatDialog,
    private cookie: CookieService) { }

  ngOnInit() {
  }

  dragAndDrop(event: CdkDragDrop<Group>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.Ideas, event.previousIndex, event.currentIndex);
    } else {
      let newIdea: Idea = new Idea;
      newIdea.Title = event.previousContainer.data.Ideas[event.previousIndex].Title;
      newIdea.Id = event.previousContainer.data.Ideas[event.previousIndex].Id;
      newIdea.Body = event.previousContainer.data.Ideas[event.previousIndex].Body;
      newIdea.ParentGroup = event.container.data.Name;
      transferArrayItem(event.previousContainer.data.Ideas,
        event.container.data.Ideas,
        event.previousIndex,
        event.currentIndex);
      this.createNewIdea(newIdea)
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
        this.deleteGroup(false);
      }
      else if (result != undefined && result.toDeleteAll == true) {
        this.deleteGroup(true);
      }
    });
  }

  preventResize() {
    if (this.group.Ideas.length == 0) {
      this.group.open = false;
      this.setOpenData(false);
    }
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
  }

  async saveGroupData(newName: string, oldName: string) {
    let index = this.currentSpace.Groups.findIndex(g => g == oldName);
    this.currentSpace.Groups[index] = newName;

    this.group.Ideas.forEach(idea => {
      idea.ParentGroup = newName;
      this.createNewIdea(idea);
    });

    this.cookie.delete(this.currentSpace + "/" + oldName);
    await this.service.createNewSpace(this.currentSpace);
  }

  async deleteGroup(withData: boolean) {
    if (withData == true) {
      this.group.Ideas.forEach(i => {
        this.deleteIdea(i.Title);
      });
    }
    let index: number = this.currentSpace.Groups.findIndex(g => g == this.group.Name);
    this.currentSpace.Groups.splice(index)

    await this.service.createNewSpace(this.currentSpace);
    this.cookie.delete(this.currentSpace + "/" + this.group.Name)
    this.updateGroupList();
  }

  updateGroupList() {
    this.emitter.emit();
  }

  setOpenData(state: boolean) {
    this.cookie.set(this.currentSpace.Name + "/" + this.group.Name, state.toString());
  }

  getOpenData(): boolean {
    let state = (this.cookie.get(this.currentSpace.Name + "/" + this.group.Name) == "true");
    return state;
  }
}
