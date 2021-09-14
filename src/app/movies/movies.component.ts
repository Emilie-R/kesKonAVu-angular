import { Component, OnInit } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FollowUpModel } from '../models/followup.model';
import { FollowupService } from '../services/followup.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  isMesEnvies!:boolean;
  followUpList!:Array<any>;
  wishListNb!:number;
  seenListNb!:number;

  subcriptions!:[Subscription];

  constructor(private followupService : FollowupService) { }

  ngOnInit(): void {
    this.isMesEnvies = true;
    
    this.followupService.getMoviesWishListFromApi();

    /* Abonnement à la liste des envies */ 
      this.followupService.moviesWishList$.subscribe(
        (data) => {
        // Récupère le nombre d'éléments de la liste
        this.wishListNb = data.length;
        // Récupère la liste à afficher par défaut
        this.followUpList = data;
}
        );

    /* Abonnement à la liste des déjà vus */ 
        this.followupService.moviesSeenList$.subscribe(
          (data) => {
            console.log(data);
            // Récupère le nombre d'éléments de la liste
            this.seenListNb = data.length;
            });
  }

  onClickMesEnvies(){
    this.isMesEnvies = true;
    this.followUpList = this.followupService.moviesWishList$.getValue();
  } 

  onClickDejaVus(){
    this.isMesEnvies = false;
    this.followUpList = this.followupService.moviesSeenList$.getValue();
  }

  OnClickAddFilm() {
    alert("Ajouter un Film");
  }

  ngOnDestroy(){
    
  }
}
