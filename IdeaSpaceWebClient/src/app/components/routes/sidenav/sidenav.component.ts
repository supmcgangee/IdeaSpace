import { Component, OnInit } from '@angular/core';
import { Space } from '../../models/space';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavOpened : boolean = true;
  selectedSpace : Space = new Space;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav(){
    this.sidenavOpened = !this.sidenavOpened;
  }

  updateCurrentSpace(space : Space){
    this.selectedSpace = space;
  }
}
