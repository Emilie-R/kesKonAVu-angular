import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  loggedMember$ = new BehaviorSubject({});

  API_KESKONAVU = "http://localhost:8080";

  constructor(private http: HttpClient,
              private route: Router ) { }

  loginMember(pseudo: string, password: string): Observable<any> {
    let url = this.API_KESKONAVU + "/authenticate";

    let body = { pseudo: pseudo, password: password};
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post(url, body, { headers });
  }

  logoutMember() {
    localStorage.removeItem('keskonavu-token');
    this.loggedMember$.next({});
    this.route.navigate(["/"]);
  } 

  registerMember(pseudo:string , email:string, password:string) {
    let url = this.API_KESKONAVU + "/v1/member/create";

    let body = { pseudo: pseudo, password: password, email:email};
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(url, body, { headers });
  }

  isLog(){

  }
}
