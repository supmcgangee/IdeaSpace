import { Component, OnInit, Input } from '@angular/core';
import { Space } from '../../models/space';
import { Idea } from '../../models/idea';
import { WorkSpaceService } from './work-space.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateIdeaComponent } from '../../dialogue/create-idea/create-idea.component';
import { Group } from '../../models/group';

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

  @Input()
  set changeSpace(currentSpace: Space) {
    this.currentSpace = currentSpace;
    if (this.currentSpace.Name != undefined) {
      this.updateGroupList();
    }
  }

  constructor(
    private service: WorkSpaceService,
    public dialog: MatDialog) { }

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
        let newIdeaTitle = result.title;
        let newIdeaBody = result.body;
        this.createNewIdea(newIdeaTitle, newIdeaBody, group);
      }
    });
  }

  async createNewIdea(newIdeaTitle: string, newIdeaBody: string, parentGroup: string) {
    if (newIdeaTitle != "") {
      let newIdea: Idea = new Idea;
      newIdea.Title = newIdeaTitle;
      newIdea.Body = newIdeaBody;
      newIdea.ParentGroup = parentGroup;

      await this.service.createNewIdea(this.currentSpace.Name, newIdea);
      this.updateGroupList();
    }
  }

  editNewGroup() {
    this.groupCreateMode = true;
  }

  async createNewGroup() {
    this.groupCreateMode = false;
    this.currentSpace.Groups.push(this.groupCreateName);
    await this.service.createNewSpace(this.currentSpace);
    this.updateGroupList();
  }
}
