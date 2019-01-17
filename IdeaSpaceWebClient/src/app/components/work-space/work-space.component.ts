import { Component, OnInit, Input } from '@angular/core';
import { Space } from '../models/space';
import { Idea } from '../models/idea';
import { WorkSpaceService } from './work-space.service';

@Component({
  selector: 'app-work-space',
  template: `Current Space: {{currentSpace.Name}}`,
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss']
})
export class WorkSpaceComponent implements OnInit {

  private currentSpace: Space = new Space;
  private ideas: Idea[] = [];
  newIdeaTitle : string = "";
  newIdeaBody : string = "";

  @Input()
  set changeSpace(currentSpace: Space) {
    this.currentSpace = currentSpace;
    if(this.currentSpace.Name != undefined) {
      this.updateIdeaList();
    }
  }

  constructor(private service: WorkSpaceService) { }

  ngOnInit() {
     
  }

  async updateIdeaList() {
    console.log(this.currentSpace.canBeDeleted);
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

  async createNewIdea(){
    if(this.newIdeaTitle != ""){
      let newIdea : Idea = new Idea;
      newIdea.Title = this.newIdeaTitle;
      newIdea.Body = this.newIdeaBody;

      await this.service.createNewIdea(this.currentSpace.Name, newIdea);
      this.updateIdeaList();
    }

    this.newIdeaTitle = "";
    this.newIdeaBody = "";
  }

  async deleteIdea(ideaTitle : string){
    await this.service.deleteIdea(this.currentSpace.Name, ideaTitle);
    this.updateIdeaList();
  }
}
