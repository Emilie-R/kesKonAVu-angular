export class ResourceModel {
    idResource:number;
   title:string;
   year:string;
   pictureurl:string;
   synopsis: string;
   actors:string;
   category:string;
   director:string;
   duration:string;
   type:string;

   constructor(resourceData:any){
    this.idResource = resourceData.idResource;
    this.actors = resourceData.actors;
    this.category = resourceData.category;
    this.director = resourceData.director;
    this.duration = resourceData.duration;
    this.type = resourceData.resourceType;
    this.synopsis = resourceData.synopsis;
    this.year = resourceData.year;


   }
}
