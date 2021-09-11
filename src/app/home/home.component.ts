import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  toLogin!:boolean;

  constructor(private memberService : MemberService,
              private router : Router) { }

  ngOnInit(): void {
    /* A la construction de la page - Vérifier si il existe déja un jwt pour l'application
      Si oui, il faudra naviguer vers la page des followUps 
      si non, on présente le formulaire de connexion à l'application */
      this.onLoginMenu();
  }

  onLoginMenu(){
    this.toLogin = true;
  }

  onRegisterMenu() {
    this.toLogin = false;
  }
}
