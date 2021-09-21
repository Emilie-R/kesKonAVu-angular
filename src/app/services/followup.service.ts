import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { map } from 'rxjs/operators';
import { ResourceModel } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  
  moviesWishList$ = new BehaviorSubject([]);
  moviesSeenList$ = new BehaviorSubject([]);
  seriesWishList$ = new BehaviorSubject([]);
  seriesSeenList$ = new BehaviorSubject([]);
  followUpisCreating$ = new BehaviorSubject(false);
  followUpisLoading$ = new BehaviorSubject(false);
  // pour modifier la note du followUp
  followUpRated:FollowUpModel;
  followUpBefore:FollowUpModel;

  constructor(private http : HttpClient) { 

  }


  getMoviesWishListFromApi(){
    this.followUpisLoading$.next(true);

    // Permet de récupérer la liste des followUp depuis l'API JAVA, et d'instancier les 4 listes de followup du member
    if (   this.moviesWishList$.getValue().length == 0
        && this.moviesSeenList$.getValue().length == 0 
        && this.seriesWishList$.getValue().length == 0
        && this.seriesSeenList$.getValue().length == 0 ){
      this.http.get("/v1/member/followups")
        .pipe(
          map((response:any) =>
          { console.log(response);
            return response.resourceFollowUpS.map(followUp => new FollowUpModel(followUp));}
          ))
        .subscribe(
          (data:Array<FollowUpModel>) =>
            {
              this.moviesWishList$.next(data.filter(followup => (followup.status == Status.avoir && followup.resourceType == ResourceType.movie))
                                            .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()));
              this.moviesSeenList$.next(data.filter(followup => (followup.status == Status.vu && followup.resourceType == ResourceType.movie))
                                            .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()));
              this.seriesWishList$.next(data.filter(followup => (followup.status == Status.avoir && followup.resourceType == ResourceType.serie))
                                            .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()));
              this.seriesSeenList$.next(data.filter(followup => (followup.status == Status.vu && followup.resourceType == ResourceType.serie))
                                            .sort((a,b) => b.lastModification.valueOf() - a.lastModification.valueOf()));
              this.followUpisLoading$.next(false);
            },
            // Gestion des erreurs de l'API
            (error) => {
              console.log(error);
              this.followUpisLoading$.next(false);}
          )
    }
    return this.moviesWishList$;
  }


  createNewFollowUp(resource:any, resourceType:ResourceType, status:Status){
    this.followUpisCreating$.next(true);

    // Construction du body pour appel à l'API de création du followup  
    let followUpToCreate = {
        status : status,
        Resource : {
          resourceType : resourceType,
          imdbId: resource.imdbID
        }
      }
    
    console.log(followUpToCreate);

    this.http.post("/v1/followup/create", followUpToCreate).subscribe(
      (data) => {
        
        //Construction du followup pour alimentation de l'écran Movies
        let newFollowUp = new FollowUpModel(data);
        // Récupération de l'état du subject avant création
        let followUpNewList:any; 

        if (status == Status.avoir && resourceType == ResourceType.movie){
          followUpNewList = [newFollowUp, ...this.moviesWishList$.getValue()];
          this.moviesWishList$.next(followUpNewList);
        }
        if (status == Status.vu && resourceType == ResourceType.movie){
          followUpNewList = [newFollowUp, ...this.moviesSeenList$.getValue()];
          this.moviesSeenList$.next(followUpNewList);
        }
        if (status == Status.avoir && resourceType == ResourceType.serie){
          followUpNewList = [newFollowUp, ...this.seriesWishList$.getValue()];
          this.seriesWishList$.next(followUpNewList);
        }
        if (status == Status.vu && resourceType == ResourceType.serie){
          followUpNewList = [newFollowUp, ...this.seriesSeenList$.getValue()];
          this.seriesSeenList$.next(followUpNewList);
        }
        this.followUpisCreating$.next(false);
       },
       (error) => {
         //Gestion des erreurs à faire si followup existe déjà
        this.followUpisCreating$.next(false);
       }
    )
  }

  deleteFollowUp(followUp) {
    this.http.delete("/v1/followup/" + followUp.idFollowUp).subscribe();

    /*Cibler et mettre à jour la liste de followUp*/
    let newList = this.getOneFollowUpList(followUp.status, followUp.resourceType);
    newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);
    this.UpdateOneFollowUpList(followUp.status, followUp.resourceType, newList);
  }

  initFollowUpLists() {
    this.moviesWishList$.next([]);
    this.moviesSeenList$.next([]);
    this.seriesWishList$.next([]);
    this.seriesSeenList$.next([]);
  }

  // Mise à jour FollowUp : note ou status
  updateFollowup(id:number, note: number, status: string): Observable<any> {
    let url = "/v1/followup/update";

    let body = { idFollowUp: id, note: note, status: status};
    // let headers = new HttpHeaders().set('Content-type', 'application/json');

    // return this.http.put(url, body, { headers });
    return this.http.put(url, body);
  }

  updateResourceFollowUpinFollowUpsList(followUp:FollowUpModel, resource:ResourceModel){    
      /*Recherche de la liste de followUp à actualiser */
      let newList = null;
      
      newList = this.getOneFollowUpList(followUp.status, followUp.resourceType);

      let newFollowUp = followUp;
      newFollowUp.resource = resource;

      let FollowUpPosition = newList.findIndex((s:FollowUpModel) => s.idFollowUp == followUp.idFollowUp);
      newList[FollowUpPosition] = newFollowUp;

      /* Mettre à jour la liste de followUp concernée*/
      this.UpdateOneFollowUpList(followUp.status,followUp.resourceType,newList);
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

  getFollowUpListOfEpisodesFromApi(id:number):Observable<any> {
    return this.http.get("/v1/progression/edit/" + id);
  }
  
}
