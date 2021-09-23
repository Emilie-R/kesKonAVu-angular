import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { ProgressionComponent } from '../progression/progression.component';
import { RateComponent } from '../rate/rate.component';
import { FollowupService } from '../services/followup.service';
import { ListFollowupsService } from '../services/list-followups.service';

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

  oldNote:number=0;

  constructor(private dialog: MatDialog,
    private followupService : FollowupService,
    private listFollowupsService : ListFollowupsService) { 
  }

  ngOnInit(): void {
    console.log(this.followUp);

    this.isSerie = this.followUp.resourceType == ResourceType.serie;
    this.isMovie = this.followUp.resourceType == ResourceType.movie;
    this.isWish = this.followUp.status == Status.avoir;
    if(this.followUp.note > 0){this.oldNote=this.followUp.note};
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

  goToRate(){
    // Ouvrir une modale(boîte de dialogue) qui contient un template HTML du détail
      // On utilise MatDialog
      const dialogRef = this.dialog.open(RateComponent, {
        width:'50%',
        panelClass:'my-panel-dialog',
        data: {followUpData:this.followUp}
      });
      // sauvegarde du followUp avant màj
      this.followupService.followUpBefore = this.followUp;


      dialogRef.afterClosed().subscribe(result => {
       
            this.followUp.note = this.followupService.followUpRated.note;

            //màj note dans la bdd : à optimiser
            if(this.oldNote != this.followUp.note){
              this.followupService.updateFollowup(this.followUp.idFollowUp,this.followUp.note,this.followUp.status)
              .subscribe(
                (data:FollowUpModel) => {
                    /*Mise à jour du followUp dans la liste */
                    let newList = this.listFollowupsService.getOneFollowUpList(data.status, data.resourceType)
                            .map((item:FollowUpModel) => item.idFollowUp == data.idFollowUp ? data : item);
                    this.listFollowupsService.UpdateOneFollowUpList(data.status, data.resourceType, newList);
                }
              )
              // réactualisation sauvegarde note du followUp
              this.oldNote = this.followUp.note;
          }
        

      });
  }

  deleteFollowUp(followUp:FollowUpModel) {
    console.log(followUp);
    this.followupService.deleteFollowUp(followUp);
  }

  openEpisodeProgression() {
    const dialogRefEP = this.dialog.open(ProgressionComponent, {
      width:'70%',
      panelClass:'my-panel-dialog',
      data: {followUpData:this.followUp}
    });
 
  }

  setFollowupStatus() {

    if(this.isWish){
      this.followUp.status = Status.vu;
      // rafraichissement des BehavirSubject du service followUp$
      if(this.isMovie){
        let listOldWishMovies = this.listFollowupsService.moviesWishList$.getValue();
        let listNewWishMovies = listOldWishMovies.filter(data => data.idFollowUp != this.followUp.idFollowUp);
        this.listFollowupsService.moviesWishList$.next(listNewWishMovies);
        // list des ajouts
        let OldSeenMovies = this.listFollowupsService.moviesSeenList$.getValue();
        OldSeenMovies.push(this.followUp);
        this.listFollowupsService.moviesSeenList$.next(OldSeenMovies);


      } else {
        let listOldWishSeries = this.listFollowupsService.seriesWishList$.getValue();
        let listNewWishSeries = listOldWishSeries.filter(data => data.idFollowUp != this.followUp.idFollowUp);
        this.listFollowupsService.seriesWishList$.next(listNewWishSeries);
        // list des ajouts
        let OldSeenSeries = this.listFollowupsService.seriesSeenList$.getValue();
        OldSeenSeries.push(this.followUp);
        this.listFollowupsService.seriesSeenList$.next(OldSeenSeries);

      }
    } else {
      this.followUp.status = Status.avoir;
      // rafraichissement des BehavirSubject du service followUp$
      if(this.isMovie){
        let listOldSeenMovies = this.listFollowupsService.moviesSeenList$.getValue();
        let listNewSeenMovies = listOldSeenMovies.filter(data => data.idFollowUp != this.followUp.idFollowUp);
        this.listFollowupsService.moviesSeenList$.next(listNewSeenMovies);
        // list des ajouts
        let OldWishMovies = this.listFollowupsService.moviesWishList$.getValue();
        OldWishMovies.push(this.followUp);
        this.listFollowupsService.moviesWishList$.next(OldWishMovies);

      } else {
        let listOldSeenSeries = this.listFollowupsService.seriesSeenList$.getValue();
        let listNewSeenSeries = listOldSeenSeries.filter(data => data.idFollowUp != this.followUp.idFollowUp);
        this.listFollowupsService.seriesSeenList$.next(listNewSeenSeries);
        // list des ajouts
        let OldWishSeries = this.listFollowupsService.seriesWishList$.getValue();
        OldWishSeries.push(this.followUp);
        this.listFollowupsService.seriesWishList$.next(OldWishSeries);

      }
    }

    this.followupService.updateFollowup(this.followUp.idFollowUp,this.followUp.note,this.followUp.status)
            .subscribe(
              (data:FollowUpModel) => {
                /*Mise à jour du followUp dans la liste */
                let newList = this.listFollowupsService.getOneFollowUpList(data.status, data.resourceType)
                .map((item:FollowUpModel) => item.idFollowUp == data.idFollowUp ? data : item);

                this.listFollowupsService.UpdateOneFollowUpList(data.status, data.resourceType, newList);
              }
            )
  }

}
