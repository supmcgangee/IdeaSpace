import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WorkSpaceService } from './work-space.service';
import { MatDialog } from '@angular/material/dialog';
import { Space } from '../../models/space';
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
  hoverGroup: Group;

  @Input()
  set changeSpace(currentSpace: Space) {
    this.currentSpace = currentSpace;
    if (this.currentSpace.Name != undefined) {
      this.updateGroupList();
    }
  }

  constructor(
    private service: WorkSpaceService,
    public dialog: MatDialog,
    private cookie: CookieService) { }

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
      newGroup.open = this.getOpenData(group);
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
        this.allGroups[index].Ideas.sort((a, b) => a.OrderIndex - b.OrderIndex);
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

  editNewGroup() {
    this.groupCreateMode = true;
  }

  async createNewGroup() {
    this.groupCreateMode = false;
    this.currentSpace.Groups.push(this.groupCreateName);
    await this.service.createNewSpace(this.currentSpace);

    this.groupCreateName = ""
    this.updateGroupList();
    this.setOpenData(this.groupCreateName, false);
  }

  setOpenData(groupName: string, state: boolean) {
    this.cookie.set(this.currentSpace.Name + "/" + groupName, state.toString());
  }

  getOpenData(groupName: string): boolean {
    let state = (this.cookie.get(this.currentSpace.Name + "/" + groupName) == "true");
    return state;
  }
}
