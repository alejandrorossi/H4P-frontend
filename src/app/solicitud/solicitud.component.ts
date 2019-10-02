import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service/utils.service';
import { ListadoPostulantesComponent } from '../listado-postulantes/listado-postulantes.component';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  postulantes: any[];

  constructor(private uSrv:UtilsService) {
    this.postulantes = [1,2,3,5];
  }

  ngOnInit() {

  }

  verPostulantes(){
    // alert("implementar ver postulantes")

    this.uSrv.getDialog(ListadoPostulantesComponent,"sarasa", "50%")
  }

}
