import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../service/utils.service';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';
import { Publication } from '../model/publication.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  postulantes: number;
  nombreMascota: String;
  especie: String; 

  @Input()
  publicacion: Publication;

  constructor(private utilSrv:UtilsService) {

  }

  ngOnInit() {
    this.postulantes = this.publicacion.applications.length;
    this.nombreMascota = this.publicacion.pet.name;
    this.especie = this.publicacion.pet.type;
  }

  verPostulantes(){
    // this.utilSrv.getDialog(ListadoPostulantesComponent,"sarasa", "50%")
    console.log(this.publicacion)
  }

}
