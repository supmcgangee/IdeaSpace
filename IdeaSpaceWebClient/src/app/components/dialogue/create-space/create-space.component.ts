import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.scss']
})
export class CreateSpaceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.data.createSpace = false;
  }

  closeDialog(): void {
      this.dialogRef.close({createSpace: this.data.createSpace, name: this.data.name});
  }
}

export interface DialogData {
  createSpace: boolean;
  name: string;
}