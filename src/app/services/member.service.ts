import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  loggedMember$ = new BehaviorSubject({});

  constructor(private http: HttpClient,
              private route: Router ) { }

  loginMember(pseudo: string, password: string): Observable<any> {
    let url = "/v1/authenticate";

    let body = { pseudo: pseudo, password: password};
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post(url, body, { headers });
  }

  registerMember(pseudo:string , email:string, password:string) {
    let url = "/v1/member/create";

    let body = { pseudo: pseudo, password: password, email:email};
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(url, body, { headers });
  }

  isLog(){

  }

  logoutMember() {
    localStorage.removeItem('keskonavu-token');
    this.loggedMember$.next({});
    this.route.navigate(["/"]);
  }

}
