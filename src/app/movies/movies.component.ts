import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FollowUpModel, ResourceType } from '../models/followup.model';
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
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isMesEnvies = true;
    this.selectedSortByCriteria = this.sortByCriteria[0];
    this.selectedFilterByNote = this.filterByNote[0];
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

  onChangeSortByCriteria(selected:any) {
    this.selectedSortByCriteria = selected;
    let followupListNull:Array<FollowUpModel>;
    let followupListNotNull:Array<FollowUpModel>;

    switch(selected.value){
      case "noteDesc" :
        /* On classe les notes null à la fin de liste */
        followupListNull = this.followupService.moviesSeenList$.getValue().filter(a => a.note == null);
        followupListNotNull = this.followupService.moviesSeenList$.getValue().filter(a => a.note != null);
        this.followUpList = [...followupListNotNull.sort((a, b) => b.note - a.note), ...followupListNull];
        break;
      case "noteAsc" :
        /* On classe les notes null à la fin de liste */
        followupListNull = this.followupService.moviesSeenList$.getValue().filter(a => a.note == null);
        followupListNotNull = this.followupService.moviesSeenList$.getValue().filter(a => a.note != null);
        this.followUpList = [...followupListNotNull.sort((a, b) => a.note - b.note), ...followupListNull];
        break;
      default :
        this.followUpList = this.followUpList.sort((a, b) => b.lastModification - a.lastModification);
    }
  }

  onChangeFilterByCriteria(selected:any) {
    this.selectedFilterByNote = selected;
    switch(selected.value){
      case "Top" :
        this.followUpList = this.followupService.moviesSeenList$.getValue().filter(a => a.note === 3);
        break;
      case "Bien" :
        this.followUpList = this.followupService.moviesSeenList$.getValue().filter(a => a.note === 1);
        break;
      case "Bof" :
        this.followUpList = this.followupService.moviesSeenList$.getValue().filter(a => a.note === 0);
        break;
      case "None" :
        this.followUpList = this.followupService.moviesSeenList$.getValue().filter( a => a.note == null );
        break;
      default :
        this.followUpList = this.followupService.moviesSeenList$.getValue();
    }
  }

  ngOnDestroy(){
    
  }
}
