import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {

  deletePromptShown: boolean;
  editMode: boolean;
  nameTemp: string;
  oldName: string;

  constructor(public dialogRef: MatDialogRef<GroupInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.deletePromptShown = false;
    this.editMode = false;
    this.nameTemp = "";
    this.oldName = "";
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.nameTemp = this.data.group.Name;
  }

  saveEdit() {
    this.data.toSave = true;
    this.editMode = false;
    this.oldName = this.data.group.Name;
    this.data.group.Name = this.nameTemp;
  }

  closeDialog(): void {
    this.dialogRef.close({
      toDelete: this.data.toDelete,
      toDeleteAll: this.data.toDeleteAll,
      toSave: this.data.toSave,
      newName: this.data.group.Name,
      oldName: this.oldName
    });
  }
}

export interface DialogData {
  toDelete: boolean;
  toDeleteAll: boolean;
  toSave: boolean;
  group: Group;
  canBeDeleted: boolean;
  canBeEdited: boolean;
}
