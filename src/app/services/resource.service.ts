import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourceType } from '../models/followup.model';
import { ResourceModel } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http : HttpClient) { }

  getResourcesFromOMDBByTitle(resourceType: ResourceType, searchValue:string){
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

  getResourceDetailsByIdResource(resourceType: ResourceType, resource:ResourceModel) {
    let url = "";
    if (resourceType == ResourceType.movie) {
        url = "/v1/movie/id/" + resource.idResource;
    } else {
        url = "/v1/serie/id/" + resource.idResource;
    }

    /*Générer la requête pour récupérer les données complémentaires*/
    return this.http.get(url)
    .pipe(map((response:any) => new ResourceModel(response)));
  }

}
