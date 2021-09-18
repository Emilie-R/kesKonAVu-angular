import { Component, Input, OnInit } from '@angular/core';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { FollowupService } from '../services/followup.service';

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

  constructor(private followUpService: FollowupService) { 
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

  deleteFollowUp(followUp:FollowUpModel) {
    console.log(followUp);
    this.followUpService.deleteFollowUp(followUp);
  }

  openEpisodeProgression() {
    alert("Restitution de la progression par épisodes");
  }

  setFollowupStatus() {
    alert ("Mise à jour du statut du followup");
  }

}
