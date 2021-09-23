import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowUpModel, ResourceType, Status } from '../models/followup.model';
import { map } from 'rxjs/operators';
import { ResourceModel } from '../models/resource.model';
import { ListFollowupsService } from './list-followups.service';

@Injectable({
  providedIn: 'root'
})
export class FollowupService {
  

  followUpisCreating$ = new BehaviorSubject(false);

  // pour modifier la note du followUp
  followUpRated:FollowUpModel;
  followUpBefore:FollowUpModel;

  constructor(private http : HttpClient,
              private listfollowups : ListFollowupsService) { 

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

        // Mise à jour de la liste concernée
        followUpNewList = [newFollowUp, 
                      ...this.listfollowups.getOneFollowUpList(status, resourceType)]
        this.listfollowups.UpdateOneFollowUpList(status,resourceType,followUpNewList);
      
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
    let newList = this.listfollowups.getOneFollowUpList(followUp.status, followUp.resourceType);
    newList = newList.filter((item:FollowUpModel) => item.idFollowUp != followUp.idFollowUp);
    this.listfollowups.UpdateOneFollowUpList(followUp.status, followUp.resourceType, newList);
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
      let newFollowUp = followUp;
      newFollowUp.resource = resource;

      newList = this.listfollowups.getOneFollowUpList(followUp.status, followUp.resourceType)
          .map((item:FollowUpModel) => item.idFollowUp == followUp.idFollowUp ? newFollowUp : item);

      /* Mettre à jour la liste de followUp concernée*/
      this.listfollowups.UpdateOneFollowUpList(followUp.status,followUp.resourceType,newList);
    }

  getFollowUpListOfEpisodesFromApi(id:number):Observable<any> {
    return this.http.get("/v1/progression/edit/" + id);
  }
  
}
