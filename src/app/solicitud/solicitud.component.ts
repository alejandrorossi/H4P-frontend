import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../service/utils.service';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';
import { Publication } from '../model/publication.model';
import { MatDialog } from '@angular/material';
import { User } from '../model/user.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  cantPostulantes: number;
  nombreMascota: String;
  especie: String;

  aceptado: User;

  @Input()
  publicacion: Publication;

  constructor(public dialog: MatDialog) {


  }

  ngOnInit() {
    this.cantPostulantes = this.publicacion.applications.length;
    this.nombreMascota = this.publicacion.pet.name;
    this.especie = this.publicacion.pet.type;

  }


  verPostulantes(): void {

    const dialogRef = this.dialog.open(ListadoPostulantesComponent, {
      width: '90%',
      data: { postulantes: this.publicacion.applications }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('aceptado');
      this.aceptado = result;
    });
  }


}
