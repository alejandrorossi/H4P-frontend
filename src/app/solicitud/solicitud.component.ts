import { Component, OnInit, Input } from '@angular/core';

import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';
import { Publication } from '../model/publication.model';
import { MatDialog } from '@angular/material';
import { Application } from '../model/application.model';
import { SolicitudService } from '../service/solicitud.service';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  cantPostulantes: number;
  nombreMascota: String;
  especie: String;

  aceptado: Application;

  @Input()
  publicacion: Publication;

  constructor(public dialog: MatDialog, public solicitudSrv: SolicitudService, private utilsService: UtilsService) {

  }

  ngOnInit() {
    this.cantPostulantes = this.publicacion.applications.length;
    this.nombreMascota = this.publicacion.pet.name;
    this.especie = this.publicacion.pet.type;
  }


  verPostulantes(): void {

    const dialogRef = this.dialog.open(ListadoPostulantesComponent, {
      minWidth: '80%',
      maxWidth: '99vw',
      data: {
        postulantes: this.publicacion.applications,
        aceptado: this.aceptado
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.aceptado = result;

      this.solicitudSrv.putAceptarSolicitante(this.aceptado.user._id, this.publicacion._id).subscribe(
        res => {
          this.utilsService.notificacion('Aceptación enviada!', '');
          
        },
        error => {
          console.log(error);
        });

    });
  }


}
