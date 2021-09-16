import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResourceType } from '../models/followup.model';
import { ResourceDialogComponent } from '../resource-dialog/resource-dialog.component';
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

  constructor(public followupService : FollowupService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isMesEnvies = true;
    this.followupService.getMoviesWishListFromApi();

    /* Abonnement à la liste des envies */ 
      this.followupService.moviesWishList$.subscribe(
        (data) => {
          // Récupère le nombre d'éléments de la liste
          this.wishListNb = data.length;

          if (this.isMesEnvies) { 
            // Récupère la liste à afficher par défaut
            this.followUpList = data;
          } 
        }
        );

    /* Abonnement à la liste des déjà vus */ 
        this.followupService.moviesSeenList$.subscribe(
          (data) => {
            // Récupère le nombre d'éléments de la liste
            this.seenListNb = data.length;
            if (! this.isMesEnvies) { 
              // Récupère la liste à afficher par défaut
              this.followUpList = data;
            } 
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

  openAddResourceDialog() {
    this.dialog.open(ResourceDialogComponent, {
      data: { resourceType: ResourceType.movie, isMesEnvies : this.isMesEnvies },
      height: '95%',
      width: '40%'
    })
  }

  ngOnDestroy(){
    
  }
}
