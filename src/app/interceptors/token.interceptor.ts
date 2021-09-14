import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Si url de la request est environement.keskonavuapi
    // Alors on ajoute le token dans le header de la requête
    if ( ( request.url.startsWith("/v1") ||  request.url.startsWith(environment.apikeskonavu))
    &&  !request.url.includes('authenticate') && !request.url.includes('member/create') ) {
        
        // Formation du header à transmettre dans les requête/ token
        let myHeader = request.headers
        .append('Authorization', 'Bearer ' + localStorage.getItem('keskonavu-token'))
        .append("Content-Type", "application/json");

        request = request.clone({
        headers: myHeader
        });
    }
  
    return next.handle(request);
  }
}
