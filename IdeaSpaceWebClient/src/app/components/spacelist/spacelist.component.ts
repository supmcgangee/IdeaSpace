import { Component, OnInit } from '@angular/core';
import { SpacelistService } from 'src/app/components/spacelist/spacelist.service'
import { Space } from '../models/space';

@Component({
  selector: 'app-spacelist',
  templateUrl: './spacelist.component.html',
  styleUrls: ['./spacelist.component.scss']
})
export class SpacelistComponent implements OnInit {

  spaces : Space[] = [];
  spaceNames : string[] = [];

  newSpaceName : string = "";

  constructor(
    private service : SpacelistService 
  ) { }

  ngOnInit() {
    this.updateSpacesList();
  }

  async updateSpacesList() {
    await this.service.getAllSpaces()
    .then(data => {
          data.forEach(space => {
            let newspace : Space = new Space;

            newspace.Name = space.Name;
            newspace.canBeDeleted = space.canBeDeleted;

            this.spaces.push(newspace);
          });
        });

    this.spaceNames = [];
    this.spaces.forEach(space => {
      this.spaceNames.push(space.Name);
    });
  }

  async createNewSpace(){
    let newSpace : Space = new Space;
    newSpace.Name = this.newSpaceName;
    await this.service.createNewSpace(newSpace);
    console.log("Created Space: " + this.newSpaceName);
    this.newSpaceName = '';
    this.updateSpacesList();
  }
}
