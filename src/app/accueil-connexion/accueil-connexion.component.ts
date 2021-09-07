import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-connexion',
  templateUrl: './accueil-connexion.component.html',
  styleUrls: ['./accueil-connexion.component.scss']
})
export class AccueilConnexionComponent implements OnInit {

  constructor(private router:Router) {

   }

  ngOnInit(): void {
  }

  onConnexion() {
    this.router.navigate(['mes-films']);
  }

}
