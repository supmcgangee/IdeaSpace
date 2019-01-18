import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Idea } from '../../models/idea';
import { IdeaInfoComponent } from '../../dialogue/idea-info/idea-info.component';
import { Space } from '../../models/space';
import { WorkSpaceService } from '../work-space/work-space.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  @Input()
  idea: Idea;
  @Input()
  currentSpace: Space;

  constructor(
    private service: WorkSpaceService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  openIdeaInfoDialog(){
    let dialogRef = this.dialog.open(IdeaInfoComponent, {
      width: '500px',
      data: { title: this.idea.Title, body: this.idea.Body, canBeDeleted: this.currentSpace.canBeDeleted }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.toDelete == true) {
        this.deleteIdea(this.idea.Title);
      }
    });
  }

  async deleteIdea(ideaTitle: string) {
    await this.service.deleteIdea(this.currentSpace.Name, ideaTitle);
    this.emitter.emit();
  }
}
