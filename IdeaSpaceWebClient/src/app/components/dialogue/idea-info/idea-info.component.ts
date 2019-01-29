import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-info',
  templateUrl: './idea-info.component.html',
  styleUrls: ['./idea-info.component.scss']
})
export class IdeaInfoComponent implements OnInit {

  editMode: boolean = false;
  deletePromptShown: boolean = false;

  titleTemp: string = "";
  oldTitle: string = "";
  bodyTemp: string = "";

  constructor(public dialogRef: MatDialogRef<IdeaInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.toDelete = false;
    this.data.toSave = false;
    this.titleTemp = this.data.title;
    this.bodyTemp = this.data.body;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.titleTemp = this.data.title;
    this.bodyTemp = this.data.body;
  }

  saveEdit() {
    this.data.toSave = true;
    this.editMode = false;
    this.oldTitle = this.data.title;
    this.data.title = this.titleTemp;
    this.data.body = this.bodyTemp;
    this.closeDialog();
  }
  //Save method not called when clicking ouside of box. Result maybe is undefined at that point ¬.¬.

  deletePrompt() {
    this.deletePromptShown = true;
  }

  closeDialog(): void {
    this.dialogRef.close({
      toDelete: this.data.toDelete,
      toSave: this.data.toSave,
      newTitle: this.data.title,
      oldTitle: this.oldTitle,
      newBody: this.data.body
    });
  }
}

export interface DialogData {
  toDelete: boolean;
  toSave: boolean;
  title: string;
  body: string;
  parent: string;
  canBeDeleted: boolean;
  canBeEdited: boolean;
}