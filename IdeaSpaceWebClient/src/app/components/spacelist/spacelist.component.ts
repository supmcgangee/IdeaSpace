import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpacelistService } from 'src/app/components/spacelist/spacelist.service'
import { Space } from '../models/space';
import { MatDialog } from '@angular/material';
import { CreateSpaceComponent } from '../dialogue/create-space/create-space.component';

@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  @Output() spaceEmitter = new EventEmitter();

  spaces: Space[] = [];
  currentSpace: Space;

  newSpaceName: string = "";

  constructor(
    private service: SpacelistService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateSpacesList();
    this.currentSpace = new Space;
    this.currentSpace.Name = 'Default Dir';
  }

  async updateSpacesList() {
    await this.service.getAllSpaces()
      .then(data => {
        this.spaces = [];
        data.forEach(space => {
          let newspace: Space = new Space;

          newspace.Name = space.Name;
          newspace.canBeDeleted = space.canBeDeleted;

          this.spaces.push(newspace);
        });
      });
  }

  openCreateSpaceDialogue(){
    let dialogRef = this.dialog.open(CreateSpaceComponent, {
      width: '400px',
      data: { name: this.newSpaceName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.createSpace == true){
        this.newSpaceName = result.name;
        this.createNewSpace();
      }
    });
  }

  async createNewSpace() {
    let newSpace : Space = new Space;
    newSpace.Name = this.newSpaceName;
    await this.service.createNewSpace(newSpace);
    this.newSpaceName = '';
    this.updateSpacesList();
  }

  async deleteSpace(spaceId: string) {
    //TODO - Add confirmation dialogue prompt 
    console.log(spaceId)
    await this.service.deleteSpace(spaceId);
    this.updateSpacesList();
  }

  updateCurrentSpace(space: Space) {
    this.currentSpace = space;
    this.spaceEmitter.emit(this.currentSpace);
  }
}
