import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FollowupService } from './followup.service';
import { ListFollowupsService } from './list-followups.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  loggedMember$ = new BehaviorSubject({});

  constructor(private http: HttpClient,
              private route: Router,
              private listfollowupsService: ListFollowupsService ) { }

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
    /* Considère l'user loggé si présence du token dans le navigateur */
    /* => TODO : Contrôle de la validité du token (appel au back + mise à jour du loggedMember$*/
    if (localStorage.getItem('keskonavu-token') != null) {
      return true;
    } else {
      return false;
    }
  }

  logoutMember() {
    localStorage.removeItem('keskonavu-token');
    this.loggedMember$.next({});
    this.listfollowupsService.initFollowUpLists();
    this.route.navigate(["/"]);
  }

}
