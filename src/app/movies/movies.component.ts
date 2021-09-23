import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { ResourceDialogComponent } from '../resource-dialog/resource-dialog.component';
import { FollowupService } from '../services/followup.service';
import { ListFollowupsService } from '../services/list-followups.service';

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
  selectedSortByCriteria:any;
  selectedFilterByNote:any;

  sortByCriteria: any[] = [
    {value : "dateMaj", viewValue:"Dernières modifications"},
    {value : "noteDesc", viewValue:"Notes décroissantes"},
    {value : "noteAsc", viewValue:"Notes croissantes"}
  ]

  filterByNote: any[] = [
    {value : "all", viewValue:"Toutes les notes"},
    {value : "Top", viewValue:"Top"},
    {value : "Bien", viewValue:"Bien"},
    {value : "Bof", viewValue:"Bof"},
    {value : "None", viewValue:"Pas de note"}
  ]
  subcriptions!:[Subscription];

  constructor(public followupService : FollowupService,
              public listFollowupsService : ListFollowupsService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isMesEnvies = true;
    this.selectedSortByCriteria = this.sortByCriteria[0];
    this.selectedFilterByNote = this.filterByNote[0];
    //this.listFollowupsService.getMoviesWishListFromApi();
    this.listFollowupsService.getResourcesListsFromApi(ResourceType.movie);
    
    /* Abonnement à la liste des envies */ 
      this.listFollowupsService.moviesWishList$.subscribe(
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
        this.listFollowupsService.moviesSeenList$.subscribe(
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
    this.followUpList = this.listFollowupsService.moviesWishList$.getValue();
  } 

  onClickDejaVus(){
    this.isMesEnvies = false;
    this.followUpList = this.listFollowupsService.moviesSeenList$.getValue();
  }

  openAddResourceDialog() {
    this.dialog.open(ResourceDialogComponent, {
      data: { resourceType: ResourceType.movie, isMesEnvies : this.isMesEnvies },
      height: '95%',
      width: '40%'
    })
  }

  onChangeSortByCriteria(selected:any) {
    this.selectedSortByCriteria = selected;
    this.followUpList = this.listFollowupsService.sortListByCriteria(ResourceType.movie, Status.vu, selected.value);
  }

  onChangeFilterByCriteria(selected:any) {
    this.selectedFilterByNote = selected;
    this.followUpList = this.listFollowupsService.filterListByCriteria(ResourceType.movie, Status.vu, selected.value);

  }

  ngOnDestroy(){
    
  }
}
