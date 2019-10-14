import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrincipalComponent } from './principal/principal.component';
import { H4pComponent } from './h4p/h4p.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AdministracionRefugioComponent } from './administracion-refugio/administracion-refugio.component';
import { CargarComponent } from './cargar/cargar.component';
import { InfoComponent } from './info/info.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing', 
    component: LandingComponent
  },
  {
    path: 'nosotros', 
    component: NosotrosComponent
  },
  {
    path: 'info', 
    component: InfoComponent //información de applicacion, desarrollo y legales
  },
  {
    path: 'h4p', //logueado en la aplicacion
    component: H4pComponent,
    pathMatch: 'prefix',
    children:[
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      },
      {
        path: 'principal',
        component: PrincipalComponent
      },
      // {
      //   path: 'principal',
      //   component: PrincipalComponent
      // },
      {
        path: 'administracion',
        component: AdministracionRefugioComponent
      },      
      {
        path: 'cargar-mascota',
        component: CargarComponent
      },
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    // RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
