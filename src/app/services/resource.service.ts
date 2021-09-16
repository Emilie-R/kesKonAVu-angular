import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResourceType } from '../models/followup.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http : HttpClient) { }


  getResourceByTitle(resourceType: ResourceType, searchValue:string){
    /* Construire l'URL d'interrogation de l'API OMDB */
    console.log(searchValue);
    let url = environment.apiomdb + "&s=" + searchValue;

    if (resourceType == ResourceType.movie){
       url += "&type=movie";
    } 
    if (resourceType == ResourceType.serie){
      url += "&type=series";
   } 
   console.log(url);
    /*  Génerer la requête d'interrogation */
      return this.http.get(url); 
  }

}
