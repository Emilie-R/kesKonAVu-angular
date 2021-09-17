import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResourceType } from '../models/followup.model';
import { ResourceDialogComponent } from '../resource-dialog/resource-dialog.component';
import { FollowupService } from '../services/followup.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

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

    /* Appel à l'API pour collecter les followUp du user */
    this.followupService.getMoviesWishListFromApi();

    /* Abonnement à la liste des envies */ 
      this.followupService.seriesWishList$.subscribe(
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
        this.followupService.seriesSeenList$.subscribe(
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
    this.followUpList = this.followupService.seriesWishList$.getValue();
  } 

  onClickDejaVus(){
    this.isMesEnvies = false;
    this.followUpList = this.followupService.seriesSeenList$.getValue();
  }

  openAddResourceDialog() {
    this.dialog.open(ResourceDialogComponent, {
      data: { resourceType: ResourceType.serie, isMesEnvies : this.isMesEnvies },
      height: '95%',
      width: '40%'
    })
  }

  onChangeSortByCriteria(selected:any) {
    this.selectedSortByCriteria = selected;
    switch(selected.value){
      case "noteDesc" :
        this.followUpList = this.followUpList.sort((a, b) => a.note - b.note);
        break;
      case "noteAsc" :
        this.followUpList = this.followUpList.sort((a, b) => b.note - a.note);
        break;
      default :
        this.followUpList = this.followUpList.sort((a, b) => b.lastModification - a.lastModification);
    }
  }

  onChangeFilterByCriteria(selected:any) {
    this.selectedFilterByNote = selected;
    switch(selected.value){
      case "Top" :
        this.followUpList = this.followupService.seriesSeenList$.getValue().filter(a => a.note === 3);
        break;
      case "Bien" :
        this.followUpList = this.followupService.seriesSeenList$.getValue().filter(a => a.note === 1);
        break;
      case "Bof" :
        this.followUpList = this.followupService.seriesSeenList$.getValue().filter(a => a.note === 0);
        break;
      case "None" :
        this.followUpList = this.followupService.seriesSeenList$.getValue().filter( a => a.note == null );
        break;
      default :
        this.followUpList = this.followupService.seriesSeenList$.getValue();
    }
  }

  ngOnDestroy(){
    
  }
}
