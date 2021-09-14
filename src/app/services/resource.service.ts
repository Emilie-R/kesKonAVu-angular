import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }
  API_URL = '/v1';

  resource$ = new BehaviorSubject({});// pour gérer le click sur une ressource

  getResourceFromApi(id:number) {
    let req_url = this.API_URL + '/followup/' + id;
    this.http.get(req_url)
    .subscribe((response:any)=>console.log('data : ',response));
    
  }
}

