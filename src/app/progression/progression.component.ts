import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../card/card.component';
import { FollowupService } from '../services/followup.service';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {

  // variables pour afficher le tableau de progression
  listOfSeasonNumber:Array<number>;
  episodeFollowUpList:Array<any>;
  isSeen:boolean = false;

  constructor(public dialogRef: MatDialogRef<ProgressionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private followupService : FollowupService) { }

  ngOnInit(): void {
    this.followupService.getFollowUpListOfEpisodesFromApi(this.data.followUpData.idFollowUp).subscribe(
      (data:any) => {
                  // tri par numéro saison puis numéro épisode
                  this.episodeFollowUpList = data.episodeFollowUpDTOList.sort(
                  (a,b) => a.episode.seasonNumber - b.episode.seasonNumber || a.episode.number - b.episode.number);
                  this.listOfSeasonNumber = data.episodeFollowUpDTOList.map(
                      e => {
                      var rObj = [];
                      rObj.push(e.episode.seasonNumber);
                      // obtention d'un array constitué d'array à un seul élément
                      return rObj;
                      }

                   );
                   // constitution d'un array<number>
                   this.listOfSeasonNumber = this.listOfSeasonNumber.reduce(
                    function(previousValue, currentValue) {
                      return previousValue.concat(currentValue)
                    },
                    []
                  )
                  // suppression des doublons
                  this.listOfSeasonNumber = Array.from(new Set(this.listOfSeasonNumber));
                  console.log(this.episodeFollowUpList)
              }
            );
  }

  setIsSeen() {
    this.isSeen = !this.isSeen;
  }
    
  onClose(): void {​
      this.dialogRef.close();
  }​

  onSave(){
    alert("Enregistrer la progression");
    this.dialogRef.close();
  }
}
