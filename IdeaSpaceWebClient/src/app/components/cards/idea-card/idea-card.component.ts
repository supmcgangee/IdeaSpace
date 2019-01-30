import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Idea } from '../../models/idea';
import { IdeaInfoComponent } from '../../dialogue/idea-info/idea-info.component';
import { Space } from '../../models/space';
import { MatDialog } from '@angular/material/dialog';
import { IdeaCardService } from './idea-card.service';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  hovering: boolean;

  @Input()
  idea: Idea;
  @Input()
  currentSpace: Space;

  constructor(
    private service: IdeaCardService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  calcOverLength(): boolean {
    if (this.idea.Body.length >= 250)
      return true;
    return false;
  }

  openIdeaInfoDialog() {
    console.log(this.idea);
    let dialogRef = this.dialog.open(IdeaInfoComponent, {
      width: '650px',
      data: {
        title: this.idea.Title,
        id: this.idea.Id,
        body: this.idea.Body,
        parent: this.idea.ParentGroup,
        canBeDeleted: this.currentSpace.canBeDeleted,
        canBeEdited: this.currentSpace.canCreateIdeas
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.toSave == true) {
        this.idea.Title = result.newTitle;
        this.idea.Body = result.newBody;
        console.log(this.idea)
        if (result.oldTitle != result.newTitle)
          this.deleteIdea(result.oldTitle)
        this.saveIdea();
      }
      if (result != undefined && result.toDelete == true) {
        this.deleteIdea(this.idea.Title);
      }
    });
  }

  async saveIdea() {
    await this.service.createNewIdea(this.currentSpace.Name, this.idea);
    this.emitter.emit();
  }

  async deleteIdea(ideaTitle: string) {
    await this.service.deleteIdea(this.currentSpace.Name, ideaTitle);
    this.emitter.emit();
  }
}
