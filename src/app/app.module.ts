import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  MatToolbarModule,
  MatButtonModule,
  MatExpansionModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatListModule,
  MatDividerModule
    } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { GameComponent} from './main/game/game.component';
import { CabinetComponent } from './main/game/cabinet/cabinet.component';
import { AuthInterceptor } from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    GameComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
