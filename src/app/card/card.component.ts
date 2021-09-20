import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { FollowUpModel } from '../models/followup.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RateComponent } from '../rate/rate.component';
import { FollowupService } from '../services/followup.service';

export interface DialogData {
  followUpData:FollowUpModel;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() followUp!:FollowUpModel | undefined; 

  constructor(private dialog: MatDialog,
    private followupService : FollowupService) { }

  ngOnInit(): void {
    
  }

  goToDetailPage(){

    if(this.followupService.followUpRated != null){
      this.followUp = this.followupService.followUpRated
    }
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      this.dialog.open(DetailComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUpData:this.followUp}
      });

   }
   goToRate(){
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      const dialogRef = this.dialog.open(RateComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUpData:this.followUp}
      });
      // sauvegarde du followUp avant màj
      this.followupService.followUpBefore = this.followUp;


      dialogRef.afterClosed().subscribe(result => {
       
            this.followUp.note = this.followupService.followUpRated.note;

            //màj note dans la bdd : à optimiser

            this.followupService.updateFollowup(this.followUp.idFollowUp,this.followUp.note,this.followUp.status)
            .subscribe(
              // (data)=> console.log(data)
            )
        

      });
   }


  }
