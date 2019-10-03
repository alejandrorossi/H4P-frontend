import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { User } from '../model/user.model';

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.scss']
})
export class ListadoPostulantesComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = [ 'nombre', 'apellido','aceptar','rechazar'];
  dataSource = new MatTableDataSource<ElementoTabla>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

var sarasa = new User;

export class TableExpandableRowsExample {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = [ 'nombre', 'apellido','aceptar','rechazar'];

}

export interface ElementoTabla {
  nombre: string;
  apellido: string;
  usuario: User;
}


const ELEMENT_DATA: ElementoTabla[] = [
  { nombre: 'Hydrogen',  apellido: 'number', usuario: sarasa},
  { nombre: 'Helium',  apellido: 'asdsdasd', usuario: sarasa},
  { nombre: 'Lithium',  apellido: 'asdas', usuario: sarasa},
  { nombre: 'Beryllium',  apellido: 'asdsaddasdasdasads', usuario: sarasa},

];
