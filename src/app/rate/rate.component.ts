import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../card/card.component';
import { FollowupService } from '../services/followup.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  isNo:boolean = false;
  isNone:boolean=false;
  isYes:boolean=false;

  constructor(public dialogRef: MatDialogRef<RateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private followupService : FollowupService) { }

  ngOnInit(): void {
    // récupération de la note du followUp si elle est renseignée
    this.data.followUpData.note < 1 ? this.isNo = true : (this.data.followUpData.note == 1 ? this.isNone = true : this.isYes = true);
  }

  onClose(): void {
    // sauvegarde de la note
    console.log('note dans RateComponent', this.data.followUpData.note, 'note avant',this.followupService.followUpBefore.note)
    
    this.followupService.followUpRated = this.data.followUpData;
    
    this.dialogRef.close();
  }

  onClickNo(){


      this.isNo = !this.isNo;
      if(this.isNo) {
        this.data.followUpData.note = 0;}
      this.isNone = false;
      this.isYes = false;
      //pas d enote équivalent à note = 0
    if(!this.isNone && !this.isNo && !this.isYes){
      this.data.followUpData.note = 0;

    }
  }
  onClickNone(){
    this.isNo = false;
    this.isNone = !this.isNone;
    if(this.isNone){
      this.data.followUpData.note = 1;}
    this.isYes = false;
    //pas d enote équivalent à note = 0
    if(!this.isNone && !this.isNo && !this.isYes){
      this.data.followUpData.note = 0;

    }
}
onClickYes(){


  this.isNo = false;
  this.isNone = false;
  this.isYes = !this.isYes;
  if(this.isYes){
  this.data.followUpData.note = 3;}
  //pas d enote équivalent à note = 0
  if(!this.isNone && !this.isNo && !this.isYes){
    this.data.followUpData.note = 0;

  }
}

}