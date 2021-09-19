import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { FollowUpModel } from '../models/followup.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  goToDetailPage(){
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      this.dialog.open(DetailComponent, {
        width:'50%',
        data: {followUp:this.followUp}
      });
   }
  }
