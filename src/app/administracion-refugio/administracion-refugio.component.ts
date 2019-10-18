import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../service/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../service/publication.service';
import { Publication } from '../model/publication.model';
import { SolicitudService } from '../service/solicitud.service';

@Component({
  selector: 'app-administracion-refugio',
  templateUrl: './administracion-refugio.component.html',
  styleUrls: ['./administracion-refugio.component.scss']
})
export class AdministracionRefugioComponent implements OnInit {

  especies: any;
  filtra: boolean;
  formBusqueda: FormGroup;
  publications: Publication[];
  solicitudes: Publication[]; // cambia unicamente a nivel front

  constructor(private mService: MascotasService,
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private solicitudService: SolicitudService) {

    this.filtra = false;
    this.especies = this.mService.getAllEspecies();
    this.getPublications();
    this.getSolicitudes();
  }

  ngOnInit() {

    this.publications = [];
    this.solicitudes = [];

    this.formBusqueda = this.formBuilder.group({
      nombreMascotaCtrl: ['', [Validators.maxLength(100)]],
      especieMascotaCtrl: ['', []],
    });
  }

  buscar() {
    alert("implementar buscar")
  }


  // cambiar a Mis publicaciones
  getPublications() {
    this.publicationService.getPublicaciones()
      .subscribe(res => {
        res.data.forEach(pub => {
          const publication = new Publication(pub);
          this.publications.push(publication)
        });
      });
  }

  //trae publicaciones que contengan solicitudes
  getSolicitudes() {
    this.solicitudService.getSolicitudes()
      .subscribe(res => {
        if (res.data)
          res.data.forEach(sol => {
            const solicitud = new Publication(sol); //se maneja a nivel front la diferencia

            this.solicitudes.push(solicitud);
          });


      });
  }

}
