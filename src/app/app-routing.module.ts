import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MesFilmsComponent } from './mes-films/mes-films.component';
import { MesSeriesComponent } from './mes-series/mes-series.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path:'mes-films-2', component: MesFilmsComponent},
  {path:'mes-films', component: MoviesComponent},
  {path:'mes-series', component: MesSeriesComponent},
  {path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
