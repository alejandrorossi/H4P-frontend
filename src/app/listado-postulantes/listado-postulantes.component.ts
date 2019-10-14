import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../model/user.model';

export interface DialogData {
  postulantes: User[];
}

export interface ElementoTabla {
  nombre: string;
  apellido: string;
  usuario: User;
}

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.scss']
})

export class ListadoPostulantesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'aceptar', 'rechazar'];
  ELEMENT_DATA: ElementoTabla[];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ListadoPostulantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      console.log(data)
      // this.ELEMENT_DATA = data.postulantes;
    this.ELEMENT_DATA = []; // arreglar el populate para que traiga usuarios en applicationns
    this.dataSource = new MatTableDataSource<ElementoTabla>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  initTable() {

  }


}





