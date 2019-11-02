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
    this.getUsuarioPublicaciones();
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


  actualizarSolicitudes() {

    this.getSolicitudes();
  }

  getUsuarioPublicaciones() {
    this.publicationService.getUsuarioPublicaciones().subscribe(
      res => {
        this.publications = [];
        res.data.forEach(pub => {
          const publication = new Publication(pub);
          this.publications.push(publication)
        });
      }
    )
  }

 
  getSolicitudes() {

    this.solicitudService.getSolicitudes()
      .subscribe(res => {
        const resList: Publication[] = [];
        if (res.data) {
          console.log("hay datos")
          
          res.data.forEach(sol => {
            const solicitud = new Publication(sol); //se maneja a nivel front la diferencia
            console.log(solicitud)
            resList.push(solicitud);
          });

          this.solicitudes = resList;
        }

      });
  }


}
