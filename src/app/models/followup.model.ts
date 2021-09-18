import { ResourceModel } from "./resource.model";

export class FollowUpModel {
   
   idFollowUp:number;
   status:string;
   lastModification:Date;
   note:number;
   progression:number;
   numberUnseenEpisodes:number;
   resourceType:string;
   title:string;
   idImdb:string;
   resource:ResourceModel;

   constructor(followupData:any){
    this.idFollowUp = followupData.idFollowUp;
    this.status = followupData.status;
    this.lastModification = followupData.lastModificationDate;
    this.note = followupData.note;
    this.progression = followupData.progression;
    this.numberUnseenEpisodes = followupData.numberOfUnseenEpisodes;
    
    this.idImdb = followupData.resourceDTO.idImdb;
    this.title = followupData.resourceDTO.title;
    this.resourceType = followupData.resourceDTO.resourceType;
    this.resource = followupData.resourceDTO.map((dto:any) => new ResourceModel(dto));

   }
}