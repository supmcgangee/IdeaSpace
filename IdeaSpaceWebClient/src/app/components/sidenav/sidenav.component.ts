import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavOpened : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav(){
    this.sidenavOpened = !this.sidenavOpened;
  }
}
