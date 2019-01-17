import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-space-info',
  templateUrl: './space-info.component.html',
  styleUrls: ['./space-info.component.scss']
})
export class SpaceInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SpaceInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.toDelete = false;
  }

  closeDialog(): void {
    this.dialogRef.close({ toDelete: this.data.toDelete });
  }
}

export interface DialogData {
  toDelete: boolean;
  name : string;
  canBeDeleted: boolean;
}