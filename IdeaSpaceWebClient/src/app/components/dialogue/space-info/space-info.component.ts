import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-space-info',
  templateUrl: './space-info.component.html',
  styleUrls: ['./space-info.component.scss']
})
export class SpaceInfoComponent implements OnInit {

  deletePromptShown: boolean = false;
  editMode: boolean = false;

  nameTemp: string = "";
  descTemp: string = "";

  constructor(public dialogRef: MatDialogRef<SpaceInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.toDelete = false;
    this.data.toSave = false;
    this.nameTemp = this.data.name;
    this.descTemp = this.data.desc;
  }

  deletePrompt(input: boolean) {
    this.deletePromptShown = input;
  }

  toggleEdit(){
    this.editMode = !this.editMode;
    this.nameTemp = this.data.name;
    this.descTemp = this.data.desc;
  }

  saveEdit(){
    this.data.toSave = true;
    this.data.name = this.nameTemp;
    this.data.desc = this.descTemp;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close({ 
      toDelete: this.data.toDelete, 
      toSave: this.data.toSave,
      name: this.data.name,
      descrition: this.data.desc,
    });
  }
}

export interface DialogData {
  toDelete: boolean;
  toSave: boolean;
  name: string;
  desc: string;
  canBeDeleted: boolean;
  canCreateIdeas: boolean;
}