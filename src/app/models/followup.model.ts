import { ResourceModel } from "./resource.model";

export class FollowUpModel {
   
   idFollowUp:number;
   status:Status;
   lastModification:Date;
   note:number;
   progression:number;
   numberUnseenEpisodes:number;
   resourceType:ResourceType;
   title:string;
   idImdb:string;
   pictureUrl:string;
   resource:ResourceModel;

   constructor(followupData:any){
    this.idFollowUp = followupData.idFollowUp;
    this.status = followupData.status;
    this.lastModification = new Date(followupData.lastModificationDate);
    this.note = followupData.note;
    this.progression = followupData.progression;
    this.numberUnseenEpisodes = followupData.numberOfUnseenEpisodes;
    
    this.idImdb = followupData.resourceDTO.idImdb;
    this.title = followupData.resourceDTO.title;
    this.resourceType = followupData.resourceDTO.resourceType;
    this.pictureUrl = followupData.resourceDTO.pictureUrl;
    this.resource = new ResourceModel(followupData.resourceDTO);

   }
}

export enum Status {
   avoir = 'AVOIR',
   vu = 'VU'
}

export enum ResourceType {
   movie = 'MOVIE',
   serie = 'SERIE'
}