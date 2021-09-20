import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
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

  @Input() followUp:FollowUpModel;

  isSerie:boolean;
  isMovie:boolean;
  isWish:boolean;

  constructor(private dialog: MatDialog,
    private followupService : FollowupService) { 
  }

  ngOnInit(): void {
    console.log(this.followUp);

    this.isSerie = this.followUp.resourceType == ResourceType.serie;
    this.isMovie = this.followUp.resourceType == ResourceType.movie;
    this.isWish = this.followUp.status == Status.avoir;
  }


  getCutTitle() {
    if (this.followUp.title.length > 18) {
      return this.followUp.title.substring(0,16) + "...";
    } else {
      return this.followUp.title;
    }
    
  }

  goToDetailPage(){
    
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      this.dialog.open(DetailComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUpData:this.followUp}
      });
  }

  deleteFollowUp(followUp:FollowUpModel) {
    console.log(followUp);
    this.followupService.deleteFollowUp(followUp);
  }

  openEpisodeProgression() {
    alert("Restitution de la progression par épisodes");
  }

  setFollowupStatus() {
    alert ("Mise à jour du statut du followup");
  }

}
