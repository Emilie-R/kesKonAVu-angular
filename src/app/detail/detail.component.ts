import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../card/card.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  isNo:boolean = false;
  isNone:boolean=false;
  isYes:boolean=false;

  constructor(public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if(this.data.followUpData.note < 1){

      this.isNo = true;

    }
    if(this.data.followUpData.note == 1){

      this.isNone = true;

    }
    if(this.data.followUpData.note > 1){

      this.isYes = true;

    }
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

}