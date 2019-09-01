import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  verIngresar:Boolean;
  verRegistrar:Boolean;

  constructor(private router: Router) { 
    this.clean();
  }

  ngOnInit() {
  }


  logIn(){
    this.verIngresar = true;
    this.verRegistrar = !this.verIngresar;
  }

  register(){
    this.verIngresar = false;
    this.verRegistrar =  !this.verIngresar ;
  }

  clean(){
    this.verIngresar = false;
    this.verRegistrar = false;
  }

  goto(ruta){
    this.router.navigate([ruta]);
  }

}
