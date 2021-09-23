import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { ResourceDialogComponent } from '../resource-dialog/resource-dialog.component';
import { FollowupService } from '../services/followup.service';
import { ListFollowupsService } from '../services/list-followups.service';

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
              public listFollowupsService : ListFollowupsService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.isMesEnvies = true;
    this.selectedSortByCriteria = this.sortByCriteria[0];
    this.selectedFilterByNote = this.filterByNote[0];

    /* Appel à l'API pour collecter les followUp du user */
    this.listFollowupsService.getResourcesListsFromApi(ResourceType.serie);

    /* Abonnement à la liste des envies */ 
      this.listFollowupsService.seriesWishList$.subscribe(
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
        this.listFollowupsService.seriesSeenList$.subscribe(
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
    this.followUpList = this.listFollowupsService.seriesWishList$.getValue();
  } 

  onClickDejaVus(){
    this.isMesEnvies = false;
    this.followUpList = this.listFollowupsService.seriesSeenList$.getValue();
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
    this.followUpList = this.listFollowupsService.sortListByCriteria(ResourceType.serie, Status.vu, selected.value);
  }

  onChangeFilterByCriteria(selected:any) {
    this.selectedFilterByNote = selected;
    this.followUpList = this.listFollowupsService.filterListByCriteria(ResourceType.serie, Status.vu, selected.value);

  }

  ngOnDestroy(){
    
  }
}
