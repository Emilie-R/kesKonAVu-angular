import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { DialogData } from '../card/card.component';
import { EpisodeNode } from '../models/episode.model';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { FollowupService } from '../services/followup.service';
import { ListFollowupsService } from '../services/list-followups.service';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {

  // variables pour afficher le tableau de progression
  listOfSeasonNumber:Array<number>;
  treeOfSerie:Array<any>;
  serieProgression;

  private transformer = (node, level) => {
    return {
      id: node.id,
      idEpisode: node.idEpisode,
      title: node.title,
      status: node.status,
      number: node.number,
      type: node.type,
      season : node.season,
      expandable : node.type == "saison",
      level : level
    }
  }

  treeControl = new FlatTreeControl((node:any) => node.level,
                                    (node:any)=> node.type == "saison");

  treeFlattener = new MatTreeFlattener(this.transformer, 
                                    (node:any) => node.level,
                                    (node:any) => node.type == "saison",
                                    (node:any) => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public dialogRef: MatDialogRef<ProgressionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private followupService : FollowupService,
              private listFollowUpService : ListFollowupsService) { }
  
  hasChild = (_: number, node) => node.type == "saison";

  ngOnInit(): void {

    /* Recherche de la liste des Episodes Followup et construction de la progression */
    this.followupService.getFollowUpListOfEpisodesFromApi(this.data.followUpData.idFollowUp).subscribe(
      (data:any) => {

                  /* Sauvegarde de la liste envoyée par l'API */
                  this.serieProgression = data;
                  data.episodeFollowUpDTOList.forEach(item => item.episodeStatusEnum = item.episodeStatusEnum ?  item.episodeStatusEnum : Status.avoir);

                  /*Extraire la liste des saisons sous forme de tableau trié*/
                  this.listOfSeasonNumber = data.episodeFollowUpDTOList
                      .map(item => item.episode.seasonNumber);
                  
                  /* Dédoublonnage et tri des saisons par numéro */
                  this.listOfSeasonNumber = this.listOfSeasonNumber
                                  .filter((item, pos) => this.listOfSeasonNumber.indexOf(item) == pos)
                                  .sort((a,b) => a-b);
                  
                  /* On alimente les noeuds de niveau Saison */
                  this.treeOfSerie = this.listOfSeasonNumber
                                  .map((item:any) => { return new EpisodeNode("saison", item) } )

                  /*On alimente les noeuds de niveau Episode pour chaque niveau saison*/                                            
                  this.treeOfSerie.forEach(element => {
                    element.children = [... data.episodeFollowUpDTOList
                                        .filter((e)=> e.episode.seasonNumber == element.season)
                                        .sort((a,b) => a.episode.number - b.episode.number)
                                        .map((item) => { return new EpisodeNode("episode", item)})]

                  });
                  
                  /* On met à jour l'indicateur de statut de niveau saison */
                  this.treeOfSerie.forEach((item) => {
                          item.status = this.getSeasonStatus(item);
                  })

                  /* On alimente la dataSource de l'arbre */
                  this.dataSource.data = this.treeOfSerie;
              }
            );
  }

  getSeasonStatus(item){
    if (item.children.findIndex(item => item.status == Status.avoir) == -1) {
      return Status.vu;
    } else {
      return Status.avoir;
    }
  }

  getNodeStatus(node) {
    if (node.status == Status.vu) {
      return true;
    } else {
      return false;
    }
  }

  onClickSeen(node){
    let index:number = -1;
    switch(node.type) {
      case "episode" :
        /* Mettre à jour le visuel sur le noeud*/
        if (node.status == Status.vu) {
          node.status = Status.avoir;
        } else {
          node.status = Status.vu;
        }

        /*Mettre à jour le statut de l'épisode dans la progression */
        index = this.serieProgression.episodeFollowUpDTOList
            .findIndex((item) => item.episode.idEpisode == node.idEpisode);
        this.serieProgression.episodeFollowUpDTOList[index].episodeStatusEnum = node.status;

        break;

      case "saison" :
        /* Mettre à jour le visuel sur le noeud de niveau saison*/
        if (node.status == Status.vu) {
          node.status = Status.avoir
        } else {
          node.status = Status.vu;
        }
        
        /* Mettre à jour le visuel sur les noeuds Episode et mettre à jour Serie Progression*/
        this.treeControl.getDescendants(node).forEach(
          item => { item.status = node.status

                    index = this.serieProgression.episodeFollowUpDTOList
                      .findIndex((elt) => elt.episode.idEpisode == item.idEpisode);
                    this.serieProgression.episodeFollowUpDTOList[index].episodeStatusEnum = node.status;
                  });
    }
  }
    
  onClose(): void {​
      this.dialogRef.close();
  }​

  onSave(){

    this.followupService.postSerieProgression(this.serieProgression).subscribe(
      (data:FollowUpModel) => {

        /* Mise à jour de la liste avec les nouvelles informations du followup */
        let newList;
        let updatedFollowup;

        updatedFollowup = this.listFollowUpService.getOneFollowUpList(Status.vu, ResourceType.serie)
                      .find((item) => item.idFollowUp == data.idFollowUp);
        updatedFollowup.progression = data.progression;
        updatedFollowup.numberUnseenEpisodes = data.numberUnseenEpisodes;
        updatedFollowup.lastModification = data.lastModification;

        newList = [...this.listFollowUpService.getOneFollowUpList(Status.vu, ResourceType.serie)
                    .filter((item)=> item.idFollowUp == data.idFollowUp)
                    .map((item)=> item = updatedFollowup), 
                  ...this.listFollowUpService.getOneFollowUpList(Status.vu, ResourceType.serie)
                    .filter((item)=> item.idFollowUp != data.idFollowUp)]

        this.listFollowUpService.UpdateOneFollowUpList(Status.vu, ResourceType.serie, newList);
        
      } 
      
    );
    this.dialogRef.close();
  }
}
