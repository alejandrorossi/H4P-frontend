import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion-refugio',
  templateUrl: './administracion-refugio.component.html',
  styleUrls: ['./administracion-refugio.component.scss']
})
export class AdministracionRefugioComponent implements OnInit {

  filtroActual: string
  constructor() { 
    this.filtroActual="Últimos cargados"
  }

  ngOnInit() {
  }

}
