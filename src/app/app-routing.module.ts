import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {path:'mes-films', canActivate:[AuthGuard] ,component: MoviesComponent},
  {path:'mes-series', canActivate:[AuthGuard] ,component: SeriesComponent},
  {path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
