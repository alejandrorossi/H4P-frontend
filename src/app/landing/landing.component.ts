import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  verIngresar:Boolean;

  constructor(private router: Router) { 

    this.verIngresar = false;
  }

  ngOnInit() {
  }


  verIng(){
    this.verIngresar = true;
  }

 

  goto(ruta){
    this.router.navigate([ruta]);
  }

}
