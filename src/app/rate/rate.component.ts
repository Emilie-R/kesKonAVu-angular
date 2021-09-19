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
    this.data.followUp.note < 1 ? this.isNo = true : (this.data.followUp.note == 1 ? this.isNone = true : this.isYes = true);
  }

  onClose(): void {
    // sauvegarde de la note
    this.followupService.followUpRated = this.data.followUp;
    
    this.dialogRef.close();
  }

  onClickNo(){


      this.isNo = !this.isNo;
      this.data.followUp.note = 0;
      this.isNone = false;
      this.isYes = false;
  }
  onClickNone(){


    this.isNo = false;
    this.isNone = !this.isNone;
    this.data.followUp.note = 1;
    this.isYes = false;
}
onClickYes(){


  this.isNo = false;
  this.isNone = false;
  this.isYes = !this.isYes;
  this.data.followUp.note = 3;
}

}
