import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';

@Injectable({
  providedIn: 'root'
})
export class ListFollowupsService {

  moviesWishList$ = new BehaviorSubject([]);
  moviesSeenList$ = new BehaviorSubject([]);
  seriesWishList$ = new BehaviorSubject([]);
  seriesSeenList$ = new BehaviorSubject([]);
  listsAreLoading$ = new BehaviorSubject(false);

  constructor(private http : HttpClient) { }

  initFollowUpLists() {
    this.moviesWishList$.next([]);
    this.moviesSeenList$.next([]);
    this.seriesWishList$.next([]);
    this.seriesSeenList$.next([]);
  }

  getResourcesListsFromApi(resourceType){
    let type = "movie";

    if (resourceType == ResourceType.serie) {
      type = "serie";
    }

    // Permet de récupérer la liste des followUp par type de resource depuis l'API JAVA, et d'instancier les 2 listes de followup du member
    if (    this.getOneFollowUpList(Status.avoir, resourceType).length == 0
        &&  this.getOneFollowUpList(Status.vu, resourceType).length == 0 ){
      
      this.listsAreLoading$.next(true);

      this.http.get("/v1/member/followups?type=" + type)
        .pipe(
          map((response:any) =>
          { console.log(response);
            return response.resourceFollowUpS.map(followUp => new FollowUpModel(followUp));}
          ))
        .subscribe(
          (data:Array<FollowUpModel>) =>
            {
              console.log("liste followup", data);
              this.UpdateOneFollowUpList(Status.avoir, resourceType,
                      data
                      .filter(followup => (followup.status == Status.avoir && followup.resourceType == resourceType))
                      .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()) );

              this.UpdateOneFollowUpList(Status.vu, resourceType, 
                      data
                      .filter(followup => (followup.status == Status.vu && followup.resourceType == resourceType))
                      .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()) );
              
              this.listsAreLoading$.next(false);
            },
            // Gestion des erreurs de l'API
            (error) => {
              console.log(error, resourceType);
              this.listsAreLoading$.next(false);}
          )
    }
    if (type == "serie")
    { return  this.seriesWishList$; }
    return this.moviesWishList$;
  }

  getOneFollowUpList(status:Status, resourceType:ResourceType):any {
    let newList:any = null;

    switch(status + resourceType) {
      case (Status.avoir + ResourceType.movie) :
        newList = this.moviesWishList$.getValue();
        break;
      case (Status.vu + ResourceType.movie) :
        newList = this.moviesSeenList$.getValue();
        break;
      case (Status.avoir + ResourceType.serie) :
        newList = this.seriesWishList$.getValue();
        break;
      case (Status.vu + ResourceType.serie) :
        newList = this.seriesSeenList$.getValue();
        break;
    }
    return newList;
  }

  UpdateOneFollowUpList(status:Status, resourceType:ResourceType, newList:any) {
    switch(status + resourceType) {
      case (Status.avoir + ResourceType.movie) :
        this.moviesWishList$.next(newList);
        break;
      case (Status.vu + ResourceType.movie) :
        newList = this.moviesSeenList$.next(newList);
        break;
      case (Status.avoir + ResourceType.serie) :
        newList = this.seriesWishList$.next(newList);
        break;
      case (Status.vu + ResourceType.serie) :
        newList = this.seriesSeenList$.next(newList);
        break;
    }
  }

  sortListByCriteria(resourceType, status, criteria){
    let sortedList:Array<FollowUpModel>;
    let followupListNull:Array<FollowUpModel>;
    let followupListNotNull:Array<FollowUpModel>;

    switch(criteria){
      case "noteDesc" :
        /* On classe les notes null à la fin de liste */
        followupListNull = this.getOneFollowUpList(status,resourceType).filter(a => a.note == null);
        followupListNotNull = this.getOneFollowUpList(status,resourceType).filter(a => a.note != null);
        sortedList = [...followupListNotNull.sort((a, b) => b.note - a.note), ...followupListNull];
        break;
      case "noteAsc" :
        /* On classe les notes null à la fin de liste */
        followupListNull = this.getOneFollowUpList(status,resourceType).filter(a => a.note == null);
        followupListNotNull = this.getOneFollowUpList(status,resourceType).filter(a => a.note != null);
        sortedList = [...followupListNotNull.sort((a, b) => a.note - b.note), ...followupListNull];
        break;
      default :
        sortedList = this.getOneFollowUpList(status,resourceType).sort((a, b) => b.lastModification - a.lastModification);
    }
    return sortedList;
  }

  filterListByCriteria(resourceType, status, criteria){
    let filteredList:Array<FollowUpModel>;

    switch(criteria){
      case "Top" :
        filteredList = this.getOneFollowUpList(status,resourceType).filter(a => a.note === 3);
        break;
      case "Bien" :
        filteredList = this.getOneFollowUpList(status,resourceType).filter(a => a.note === 1);
        break;
      case "Bof" :
        filteredList = this.getOneFollowUpList(status,resourceType).filter(a => a.note === 0);
        break;
      case "None" :
        filteredList = this.getOneFollowUpList(status,resourceType).filter( a => a.note == null );
        break;
      default :
        filteredList = this.getOneFollowUpList(status,resourceType);
    }
    return filteredList;
  }

}
