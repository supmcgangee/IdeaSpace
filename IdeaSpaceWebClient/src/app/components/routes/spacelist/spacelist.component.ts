import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Space } from '../../models/space';
import { MatDialog } from '@angular/material';
import { CreateSpaceComponent } from '../../dialogue/create-space/create-space.component';
import { SpaceInfoComponent } from '../../dialogue/space-info/space-info.component';
import { SpacelistService } from './spacelist.service';

@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  @Output() spaceEmitter = new EventEmitter();

  spaces: Space[] = [];
  currentSpace: Space;
  hoverSpace: Space;

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
          newspace.Description = space.Description;
          newspace.Groups = space.Groups;
          newspace.canBeDeleted = space.canBeDeleted;
          newspace.canCreateIdeas = space.canCreateIdeas;

          this.spaces.push(newspace);
        });
      });
  }

  openCreateSpaceDialogue() {
    let dialogRef = this.dialog.open(CreateSpaceComponent, {
      width: '500px',
      data: { name: "", desc: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.createSpace == true) {
        let newSpace: Space = new Space;
        newSpace.Name = result.name;
        newSpace.Description = result.desc;
        this.createNewSpace(newSpace);
      }
    });
  }

  openSpaceInfoDialog(space: Space) {
    let dialogRef = this.dialog.open(SpaceInfoComponent, {
      width: '500px',
      data: {
        name: space.Name,
        desc: space.Description,
        canBeDeleted: space.canBeDeleted,
        canCreateIdeas: space.canCreateIdeas
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.toDelete == true) {
        this.deleteSpace(space.Name);
      }
    });
  }

  async createNewSpace(newSpace: Space) {
    if (this.checkName(newSpace.Name)) {
      await this.service.createNewSpace(newSpace);
    }
    else {
      console.error("Invalid name entered: " + newSpace.Name)
    }
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
    switch (name) {
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
