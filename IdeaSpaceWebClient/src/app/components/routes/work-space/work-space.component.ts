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
  private groups: Group[] = [];

  columns: number;
  rows: number;

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
    if (!this.currentSpace.Name != null) {
      await this.service.getAllGroups(this.currentSpace.Name)
        .then(data => {
          this.groups = [];
          data.forEach(group => {
            let newGroup: Group = new Group;

            newGroup.Name = group.Name;
            newGroup.Ideas = group.Ideas;

            this.groups.push(newGroup);
          });
        });
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
}
