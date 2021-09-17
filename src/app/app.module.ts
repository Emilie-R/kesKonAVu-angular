import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesFilmsComponent } from './mes-films/mes-films.component';
import { MesSeriesComponent } from './mes-series/mes-series.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { MemberComponent } from './member/member.component';
import { MemberContentNavComponent } from './member-content-nav/member-content-nav.component';
import { CardComponent } from './card/card.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SeriesComponent } from './series/series.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { FollowupNoteComponent } from './followup-note/followup-note.component';


@NgModule({
  declarations: [
    AppComponent,
    MesFilmsComponent,
    MesSeriesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    MemberComponent,
    MemberContentNavComponent,
    CardComponent,
    SeriesComponent,
    ResourceDialogComponent,
    FollowupNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatInputModule, MatCardModule, MatListModule, MatSnackBarModule,
    MatMenuModule, MatProgressBarModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
