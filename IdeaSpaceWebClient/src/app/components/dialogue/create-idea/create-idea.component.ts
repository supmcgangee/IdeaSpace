import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss']
})
export class CreateIdeaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateIdeaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.createIdea = false;
  }

  closeDialog(){
    this.dialogRef.close({ createIdea: this.data.createIdea, title: this.data.title, body: this.data.body });
  }
}

export interface DialogData{
  createIdea : boolean;
  title : string;
  body : string;
}
