import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MatExpansionModule } from '@angular/material/expansion';

import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { MemberComponent } from './member/member.component';
import { MemberContentNavComponent } from './member-content-nav/member-content-nav.component';
import { CardComponent } from './card/card.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SeriesComponent } from './series/series.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { DetailComponent } from './detail/detail.component';
import { RateComponent } from './rate/rate.component';
import { AuthGuard } from './guards/auth.guard';
import { ProgressionComponent } from './progression/progression.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    MemberComponent,
    MemberContentNavComponent,
    CardComponent,
    SeriesComponent,
    ResourceDialogComponent,
    DetailComponent,
    RateComponent,
    ProgressionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatInputModule, MatCardModule, MatListModule, MatSnackBarModule,
    MatMenuModule, MatProgressBarModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true},
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
