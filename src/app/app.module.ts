import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilConnexionComponent } from './accueil-connexion/accueil-connexion.component';
import { AccueilAdhesionComponent } from './accueil-adhesion/accueil-adhesion.component';
import { RouterModule, Routes } from '@angular/router';
import { SuiviComponent } from './suivi/suivi.component';
import { SuiviMesFilmsComponent } from './suivi-mes-films/suivi-mes-films.component';

const appRoutes: Routes = [
  {path: 'accueil/connexion', component: AccueilConnexionComponent},
  {path: 'accueil/inscription', component: AccueilAdhesionComponent },
  {path: '', component: AccueilConnexionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AccueilConnexionComponent,
    AccueilAdhesionComponent,
    SuiviComponent,
    SuiviMesFilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
