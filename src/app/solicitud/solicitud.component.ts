import { Component, OnInit, Input } from '@angular/core';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';
import { Publication } from '../model/publication.model';
import { MatDialog } from '@angular/material';
import { Application } from '../model/application.model';
import { SolicitudService } from '../service/solicitud.service';
import { UtilsService } from '../service/utils.service';
import { PublicationService } from '../service/publication.service';

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

  constructor(public dialog: MatDialog,
    public solicitudSrv: SolicitudService,
    private utilsService: UtilsService,
    private publicationService: PublicationService) {

  }

  ngOnInit() {
    this.cantPostulantes = this.publicacion.applications.length;
    this.nombreMascota = this.publicacion.pet.name;
    this.especie = this.publicacion.pet.type;
  }


  hayAceptado() {
    var ret = false;
    this.publicacion.applications.forEach(el => {
      if (el.status == "aceptado") ret = true;
    });
    return ret
  }



  verPostulantes(): void {

    this.aceptado = null;

    const dialogRef = this.dialog.open(ListadoPostulantesComponent, {
      minWidth: '80%',
      maxWidth: '99vw',
      data: {
        postulantes: this.publicacion.applications,
        aceptado: this.aceptado,
        publicationId: this.publicacion._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aceptado = result;
        this.solicitudSrv.putAceptarSolicitante(this.aceptado._id, this.publicacion._id).subscribe(
          res => {
            this.utilsService.notificacion('Usuario aceptado!', '');
            // this.refrescarSolicitud();
          },
          error => {
            console.log(error);
          });

      }
    });
  }


  // refrescarSolicitud(): void {

  //   this.publicationService.getPublicacion(String(this.publicacion._id)).subscribe(
  //     res => {
  //       console.log(res.data)
  //       this.publicacion = res.data
  //     },
  //     error => {
  //       console.log(error);
  //     });

  // }

}
