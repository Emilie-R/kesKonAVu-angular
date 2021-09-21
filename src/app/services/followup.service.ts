import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { map } from 'rxjs/operators';

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
  //variables pour afficher écran progression
  episodeFollowUpList:Array<any>;
  listOfSeasonNumber:Array<number>;

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
          { return response.resourceFollowUpS.map(followUp => new FollowUpModel(followUp));}
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

    if (followUp.status == Status.avoir && followUp.resourceType == ResourceType.movie) {
      let newList = this.moviesWishList$.getValue();
      newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);

      this.moviesWishList$.next(newList);
    }

    if (followUp.status == Status.vu && followUp.resourceType == ResourceType.movie) {
      let newList = this.moviesSeenList$.getValue();
      newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);

      this.moviesSeenList$.next(newList);
    }

    if (followUp.status == Status.avoir && followUp.resourceType == ResourceType.serie) {
      let newList = this.seriesWishList$.getValue();
      newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);

      this.seriesWishList$.next(newList);
    }

    if (followUp.status = Status.vu && followUp.resourceType == ResourceType.movie) {
      let newList = this.seriesSeenList$.getValue();
      newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);

      this.seriesSeenList$.next(newList);
    }
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

  getFollowUpListOfEpisodesFromApi(id:number){
    this.http.get("/v1/progression/edit/" + id).subscribe(
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
              }
            )     

  }
}
