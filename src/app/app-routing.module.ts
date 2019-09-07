import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PrincipalComponent } from './principal/principal.component';
import { H4pComponent } from './h4p/h4p.component';



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
    path: 'h4p', //logueado en la aplicacion
    component: H4pComponent,
    pathMatch: 'prefix',
    children:[
      {
        path: 'principal',
        component: PrincipalComponent
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
