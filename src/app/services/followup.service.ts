import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowUpModel } from '../models/followup.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  
  moviesWishList$ = new BehaviorSubject([]);
  moviesSeenList$ = new BehaviorSubject([]);
  seriesWishList$ = new BehaviorSubject([]);
  seriesFollowUps$ = new BehaviorSubject([]);
  // pour modifier la note du followUp
  followUpRated:FollowUpModel;
  followUpBefore:FollowUpModel;

  constructor(private http : HttpClient) { 

  }



  getMoviesWishListFromApi(){
    
    if (this.moviesWishList$.getValue().length == 0){
      this.http.get("/v1/member/followups")
        .pipe(
          map((response:any) =>
          { return response.resourceFollowUpS.map(followUp => new FollowUpModel(followUp));}
          ))
        .subscribe(
          (data:Array<FollowUpModel>) =>
            {
              this.moviesWishList$.next(data); 
            },
            // Gestion des erreurs de l'API
            (error) => console.log(error)
          )
    }
    return this.moviesWishList$;
  }

 getFollowUpRated() : FollowUpModel{
   return this.followUpRated;
  }
  // Mise à jour FollowUp : note ou status
  updateFollowup(id:number, note: number, status: string): Observable<any> {
    let url = "/v1/followup/update";

    let body = { idFollowUp: id, note: note, status: status};
    // let headers = new HttpHeaders().set('Content-type', 'application/json');

    // return this.http.put(url, body, { headers });
    return this.http.put(url, body);
  }

}
