import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LandingComponent } from './landing/landing.component';
import { H4pComponent } from './h4p/h4p.component';
import { RegistroComponent } from './registro/registro.component';
import { CardMascotaComponent } from './card-mascota/card-mascota.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { VerPublicacionComponent } from './ver-publicacion/ver-publicacion.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { CargarComponent } from './cargar/cargar.component';
import { AdministracionRefugioComponent } from './administracion-refugio/administracion-refugio.component';
import { MatSelectModule } from '@angular/material';
import { SanitizeHtmlPipe } from './pipe/sanitizehtlm.pipe';
import { SolicitudComponent } from './solicitud/solicitud.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    LandingComponent,
    H4pComponent,
    RegistroComponent,
    CardMascotaComponent,
    NosotrosComponent,
    VerPublicacionComponent,
    MenuUsuarioComponent,
    CargarComponent,
    AdministracionRefugioComponent,

    SanitizeHtmlPipe,

    SolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    RouterModule.forChild([]),
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule

  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
