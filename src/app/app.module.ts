import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule  } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LandingComponent } from './landing/landing.component';
import { H4pComponent } from './h4p/h4p.component';
import { RegistroComponent } from './registro/registro.component';
import { CardMascotaComponent } from './card-mascota/card-mascota.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    LandingComponent,
    H4pComponent,
    RegistroComponent,
    CardMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatTabsModule,
    MatToolbarModule,
    
    
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
