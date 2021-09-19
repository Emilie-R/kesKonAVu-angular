import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { FollowUpModel } from '../models/followup.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RateComponent } from '../rate/rate.component';
import { FollowupService } from '../services/followup.service';

export interface DialogData {
  followUp:FollowUpModel;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() followUp!:FollowUpModel | undefined; 

  constructor(public dialog: MatDialog,
    private followupService : FollowupService) { }

  ngOnInit(): void {
    // si retour de la modale de notation
    if (this.followUp.note != this.followupService.followUpRated.note
      && this.followupService.followUpRated.note != null){
        this.followUp.note = this.followupService.followUpRated.note;
    }
  }

  goToDetailPage(){
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      this.dialog.open(DetailComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUp:this.followUp}
      });

   }
   goToRate(){
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      this.dialog.open(RateComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUp:this.followUp}
      });
   }


  }
