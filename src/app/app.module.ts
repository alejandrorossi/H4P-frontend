import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

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
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LandingComponent } from './landing/landing.component';
import { H4pComponent } from './h4p/h4p.component';
import { RegistroComponent } from './registro/registro.component';
import { CardMascotaComponent } from './card-mascota/card-mascota.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { CargarComponent } from './cargar/cargar.component';
import { AdministracionRefugioComponent } from './administracion-refugio/administracion-refugio.component';
import { MatSelectModule } from '@angular/material';
import { SanitizeHtmlPipe } from './pipe/sanitizehtlm.pipe';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ListadoPostulantesComponent } from './listado-postulantes/listado-postulantes.component';
import { FormularioBaseComponent } from './formulario-base/formulario-base.component';
import { InfoComponent } from './info/info.component';
import { DialogConfirmacionComponent } from './dialog-confirmacion/dialog-confirmacion.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

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
    MenuUsuarioComponent,
    CargarComponent,
    AdministracionRefugioComponent,
    SanitizeHtmlPipe,
    SolicitudComponent,
    ListadoPostulantesComponent,
    FormularioBaseComponent,
    InfoComponent,
    DialogConfirmacionComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    RouterModule.forChild([]),
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule
  ],
  entryComponents: [
    ListadoPostulantesComponent,
    DialogConfirmacionComponent
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
