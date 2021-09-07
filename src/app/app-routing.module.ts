import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MesFilmsComponent } from './mes-films/mes-films.component';
import { MesSeriesComponent } from './mes-series/mes-series.component';

const routes: Routes = [
  {path:'accueil', component: AccueilComponent},
  {path:'mes-films', component: MesFilmsComponent},
  {path:'mes-series', component: MesSeriesComponent},
  {path:'', component:AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
