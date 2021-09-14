import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueilConnexionComponent } from './accueil-connexion/accueil-connexion.component';
import { AccueilInscriptionComponent } from './accueil-inscription/accueil-inscription.component';
import { MesFilmsComponent } from './mes-films/mes-films.component';
import { MesSeriesComponent } from './mes-series/mes-series.component';
import { DetailFilmComponent } from './detail-film/detail-film.component';
import { DetailSerieComponent } from './detail-serie/detail-serie.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AccueilConnexionComponent,
    AccueilInscriptionComponent,
    MesFilmsComponent,
    MesSeriesComponent,
    DetailFilmComponent,
    DetailSerieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
