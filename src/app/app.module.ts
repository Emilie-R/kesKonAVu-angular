import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilConnexionComponent } from './accueil-connexion/accueil-connexion.component';
import { AccueilInscriptionComponent } from './accueil-inscription/accueil-inscription.component';
import { RouterModule, Routes } from '@angular/router';
import { MesFilmsComponent } from './mes-films/mes-films.component';
import { MesSeriesComponent } from './mes-series/mes-series.component';

const appRoutes: Routes = [
  {path:'accueil', component: AccueilComponent},
  {path:'mes-films', component: MesFilmsComponent},
  {path:'mes-series', component: MesSeriesComponent},
  {path:'', component: AccueilComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AccueilConnexionComponent,
    AccueilInscriptionComponent,
    MesFilmsComponent,
    MesSeriesComponent
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
