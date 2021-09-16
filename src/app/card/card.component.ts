import { Component, Input, OnInit } from '@angular/core';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() followUp;

  isSerie:boolean;
  isMovie:boolean;
  isWish:boolean;

  constructor() { 
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
    alert("Sur le détail de la ressource");
  }

  deleteFollowUp() {
    alert("Supprimer le followUp");
  }

  openEpisodeProgression() {
    alert("Restitution de la progression par épisodes");
  }

  setFollowupStatus() {
    alert ("Mise à jour du statut du followup");
  }

}
