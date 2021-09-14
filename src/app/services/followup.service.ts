import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

}
