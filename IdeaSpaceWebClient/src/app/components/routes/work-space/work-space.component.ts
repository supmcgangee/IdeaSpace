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
  private ideas: Idea[] = [];

  columns : number;
  rows : number; 

  @Input()
  set changeSpace(currentSpace: Space) {
    this.currentSpace = currentSpace;
    if (this.currentSpace.Name != undefined) {
      this.updateGroupList();
      this.updateIdeaList();
    }
  }

  constructor(
    private service: WorkSpaceService,
    public dialog: MatDialog) { }

  ngOnInit() {

  }

  async updateGroupList(){
    if(!this.currentSpace.Name != null){
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

  async updateIdeaList() {
    if (!this.currentSpace.Name != null) {
      await this.service.getAllIdeas(this.currentSpace.Name)
        .then(data => {
          this.ideas = [];
          data.forEach(idea => {
            let newIdea: Idea = new Idea;

            newIdea.Title = idea.Title;
            newIdea.Body = idea.Body;

            this.ideas.push(newIdea);
          });
        });
    }
  }

  openCreateIdeaDialog() {
    let dialogRef = this.dialog.open(CreateIdeaComponent, {
      width: '500px',
      data: { title: "", body: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.createIdea == true) {
        let newIdeaTitle = result.title;
        let newIdeaBody = result.body;
        this.createNewIdea(newIdeaTitle, newIdeaBody);
      }
    });
  }

  async createNewIdea(newIdeaTitle: string, newIdeaBody: string) {
    if (newIdeaTitle != "") {
      let newIdea: Idea = new Idea;
      newIdea.Title = newIdeaTitle;
      newIdea.Body = newIdeaBody;

      await this.service.createNewIdea(this.currentSpace.Name, newIdea);
      this.updateIdeaList();
    }
  }
}
