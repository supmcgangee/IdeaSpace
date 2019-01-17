import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpacelistService } from 'src/app/components/spacelist/spacelist.service'
import { Space } from '../models/space';
import { MatDialog } from '@angular/material';
import { CreateSpaceComponent } from '../dialogue/create-space/create-space.component';
import { SpaceInfoComponent } from '../dialogue/space-info/space-info.component';

@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  @Output() spaceEmitter = new EventEmitter();

  spaces: Space[] = [];
  currentSpace: Space;

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

  openCreateSpaceDialogue() {
    let dialogRef = this.dialog.open(CreateSpaceComponent, {
      width: '230px',
      data: { name: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.createSpace == true) {
        let newSpaceName = result.name;
        this.createNewSpace(newSpaceName);
      }
    });
  }

  openSpaceInfoDialog(space: Space) {
    let dialogRef = this.dialog.open(SpaceInfoComponent, {
      width: '230px',
      data: { name: space.Name, canBeDeleted: space.canBeDeleted }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.toDelete == true) {
        this.deleteSpace(space.Name);
      }
    });
  }

  async createNewSpace(newSpaceName: string) {
    if (this.checkName(newSpaceName)) {
      let newSpace: Space = new Space;
      newSpace.Name = newSpaceName;
      await this.service.createNewSpace(newSpace);
    }
    else{
      console.error("Invalid name entered: " + newSpaceName)
    }
    newSpaceName = '';
    this.updateSpacesList();
  }

  async deleteSpace(spaceId: string) {
    //TODO - Add confirmation dialogue prompt 
    console.log(spaceId)
    await this.service.deleteSpace(spaceId);
    this.updateSpacesList();
  }

  checkName(name: string): boolean {
    console.log(name);
    switch(name){
      case null:
      case undefined:
      case "":
        return false;
      default:
        break;
    }
    return true;
  }

  updateCurrentSpace(space: Space) {
    this.currentSpace = space;
    this.spaceEmitter.emit(this.currentSpace);
  }
}
