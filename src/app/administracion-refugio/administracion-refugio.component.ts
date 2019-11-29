import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../services/publication.service';
import { Publication } from '../models/publication.model';
import { SolicitudService } from '../services/solicitud.service';
import { Filtro } from '../models/filtro.model';

@Component({
  selector: 'app-administracion-refugio',
  templateUrl: './administracion-refugio.component.html',
  styleUrls: ['./administracion-refugio.component.scss']
})
export class AdministracionRefugioComponent implements OnInit {

  especies: any;
  filtra: boolean;
  formBusqueda: FormGroup;
  formBusqueda2: FormGroup;
  publications: Publication[];
  solicitudes: Publication[];
  solicitudFiltro: string;
  flagCantidadSolicitud: boolean;
  statusSolicitud: string;
  ordenSolicitud: string;
  creacionTiempo: string;
  flagFiltroTiempo: boolean;
  pubPrivadas: boolean;
  pubPublicas: boolean;
  fechaDesde
  fechaHasta

  constructor(
    private storageService: StorageService,
    private mService: MascotasService,
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private solicitudService: SolicitudService) {

    this.filtra = false;
    this.especies = this.mService.getAllEspecies();
    this.getUsuarioPublicaciones();
    this.getSolicitudesPendientes();
    this.solicitudFiltro = 'up';
    this.flagCantidadSolicitud = true;
    this.ordenSolicitud = '';
    this.statusSolicitud = 'Pendientes';
    this.creacionTiempo = "más nuevas"
    this.flagFiltroTiempo = false;
    this.pubPrivadas = true;
    this.pubPublicas = true;

  }

  ngOnInit() {
    this.publications = [];
    this.solicitudes = [];

    this.formBusqueda = this.formBuilder.group({
      textoMascotaCtrl: ['', [Validators.maxLength(100)]],
    });
    this.formBusqueda2 = this.formBuilder.group({
      especieMascotaCtrl: ['', []],
    });
  }

  buscar() {
    //moment(date).format('YYYYMMDD')
    var filtro = new Filtro();
    filtro.idUsuario = this.storageService.getCurrentUser()._id.toString();
    filtro.desde = (this.fechaDesde) ? this.fechaDesde.toISOString() : null;
    filtro.hasta = (this.fechaHasta) ? this.fechaHasta.toISOString() : null;
    filtro.especie = this.formBusqueda2.get('especieMascotaCtrl').value.name;
    filtro.texto = this.formBusqueda.get('textoMascotaCtrl').value;
    filtro.privada = this.pubPrivadas;
    filtro.publica = this.pubPublicas;

    this.publicationService.buscarPublicacionesFiltradas(filtro)
    .subscribe(res => {
      const resList: Publication[] = [];
      if (res.data) {
        res.data.forEach(pres => {
          const publ = new Publication(pres); //se maneja a nivel front la diferencia
          resList.push(publ);
        });
        this.publications = resList;
      }
    });
  }


  actualizarSolicitudes() {
    this.getSolicitudesPendientes();
  }

  onNotifyActualizarPublicaciones(notifyActualizarPublicaciones: boolean){
    if(notifyActualizarPublicaciones){ this.getUsuarioPublicaciones(); }
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

  getSolicitudesPendientes() {
    this.statusSolicitud = "Pendientes";
    this.solicitudService.getSolicitudesPendientes()
      .subscribe(res => {
        this.vaciarSiNoHay(res)
        const resList: Publication[] = [];
        if (res.data) {
          res.data.forEach(sol => {
            const solicitud = new Publication(sol); //se maneja a nivel front la diferencia
            resList.push(solicitud);
          });
          this.solicitudes = resList;
        }
      });
  }

  //sobreescribe el array de solicitudes por otro diferente
  getSolicitudesAceptadas() {
    this.statusSolicitud = "Previamente aceptadas";
    this.solicitudService.getSolicitudesAceptadas()
      .subscribe(res => {
        this.vaciarSiNoHay(res)
        const resList: Publication[] = [];
        if (res.data) {
          res.data.forEach(sol => {
            const solicitud = new Publication(sol); //se maneja a nivel front la diferencia
            resList.push(solicitud);
          });
          this.solicitudes = resList;
        }
      });
  }

  private vaciarSiNoHay(res) {
    if (!res.data)
      this.solicitudes = []
  }

  getSolicitudesTodas() {
    this.statusSolicitud = "Todas";
    this.solicitudService.getSolicitudes()
      .subscribe(res => {
        this.vaciarSiNoHay(res)
        const resList: Publication[] = [];
        if (res.data) {
          res.data.forEach(sol => {
            const solicitud = new Publication(sol); //se maneja a nivel front la diferencia
            resList.push(solicitud);
          });
          this.solicitudes = resList;
        }
      });
  }

  filtrarSolicitudesCantPostulantes() {
    this.flagCantidadSolicitud = !this.flagCantidadSolicitud;

    if (this.flagCantidadSolicitud) {
      this.solicitudFiltro = 'up'
      this.ordenSolicitud = 'con menos solicitudes'
      this.solicitudes.sort(function (a, b) {
        return (a.applications.length - b.applications.length);
      })
    } else {
      this.solicitudFiltro = 'down';
      this.ordenSolicitud = 'con más solicitudes'
      this.solicitudes.sort(function (a, b) {
        return b.applications.length - a.applications.length;
      })
    }
  }

  filtrarSolicitudesCreatedDate() {
    if (this.flagFiltroTiempo) {
      this.flagFiltroTiempo = !this.flagFiltroTiempo;
      this.creacionTiempo = 'más nuevas';
      this.solicitudes.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
    }
    else {
      this.flagFiltroTiempo = !this.flagFiltroTiempo;
      this.creacionTiempo = 'más antiguas';
      this.solicitudes.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    }
  }
}
