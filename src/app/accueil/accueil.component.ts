import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {

  accueilInscription !: boolean;
  accueilConnexion !: boolean;

  constructor() { }

  ngOnInit(): void {
    this.onConnexion();
  }

  onConnexion() {
    this.accueilInscription = false;
    this.accueilConnexion = true;
  }

  onInscription(){
    this.accueilInscription = true;
    this.accueilConnexion = false;
  }

}
