import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-info',
  templateUrl: './idea-info.component.html',
  styleUrls: ['./idea-info.component.scss']
})
export class IdeaInfoComponent implements OnInit {

  deletePromptShown: boolean = false;

  constructor(public dialogRef: MatDialogRef<IdeaInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.toDelete = false;
  }

  deletePrompt() {
    this.deletePromptShown = true;
  }

  closeDialog(): void {
    this.dialogRef.close({ toDelete: this.data.toDelete });
  }
}

export interface DialogData {
  toDelete: boolean;
  title: string;
  body: string;
  canBeDeleted: boolean;
}