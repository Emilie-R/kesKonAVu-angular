import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {

  isInscription!: Boolean;
  isConnexion!:Boolean;

  constructor() { }

  ngOnInit(): void {
    this.onMenuConnexion();
  }

  onMenuConnexion() {
    this.isInscription = false;
    this.isConnexion = true;
  }

  onMenuInscription(){
    this.isInscription = true;
    this.isConnexion = false;
  }

}
