import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-inscription',
  templateUrl: './accueil-inscription.component.html',
  styleUrls: ['./accueil-inscription.component.scss']
})
export class AccueilInscriptionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onInscription() { 
    
    this.router.navigate(['mes-films']);
  }

}
