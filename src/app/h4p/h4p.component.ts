import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-h4p',
  templateUrl: './h4p.component.html',
  styleUrls: ['./h4p.component.scss']
})
export class H4pComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }



  salir() {
    this.router.navigate(["/"]);
  }  
}
