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
  MatDividerModule,
  MatCheckboxModule,
  MatDialogModule
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
import { BlockComponent } from './main/game/cabinet/block/block.component';
import { JumbotronComponent } from './main/game/cabinet/jumbotron/jumbotron.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    GameComponent,
    CabinetComponent,
    BlockComponent,
    JumbotronComponent,
    ErrorComponent
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
    MatCheckboxModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
