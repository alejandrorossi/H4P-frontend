import { Publication } from '../models/publication.model';
import { StorageService } from '../services/storage.service';
import { PublicationService } from '../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../services/mascotas.service';
import { Filtro } from '../models/filtro.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  publications: Publication[] = [];
  formBusqueda2: FormGroup;
  fechaDesde;
  especies: any;

  filtra: boolean;

  constructor(
    private router: Router, private publicationService: PublicationService,
    public storageService: StorageService, private mService: MascotasService,
    private formBuilder: FormBuilder, private utilsService: UtilsService, public masc: MascotasService) {

    
    this.especies = this.mService.getAllEspecies();
  }

  ngOnInit() {
    this.formBusqueda2 = this.formBuilder.group({
      especieMascotaCtrl: ['', []],
    });
    this.getOtrasPublicaciones();
  }

  // Publicaciones que no son propias, a las cuales me puedo postular.
  getOtrasPublicaciones() {
    this.publicationService.getOtrasPublicaciones().subscribe(
      res => {
        this.publications = [];
        res.data.forEach(pub => {
          const publication = new Publication(pub);
          this.publications.push(publication)
        });
      }
    )
  }

  isOwner(publication: Publication): Boolean {
    var currentUserName: String = this.storageService.getCurrentUser().username;
    return publication.isOwner(currentUserName);
  }

  esPostulante(publication: Publication): Boolean {
    var currentUserName: String = this.storageService.getCurrentUser().username;
    return publication.hasPostulant(currentUserName);
  }

  filtrar() {
    const especie = this.formBusqueda2.get('especieMascotaCtrl').value.name;
    var filtro = new Filtro();

    filtro.desde = (this.fechaDesde) ? this.fechaDesde.toISOString() : null;

    filtro.especie = (especie) ? especie : null;

    if (this.fechaDesde || especie)
      this.publicationService.buscarPublFiltradasAdoptante(filtro)
        .subscribe(res => {
          const resList: Publication[] = [];
          if (res.data.length > 0) {
            res.data.forEach(pres => {
              const publ = new Publication(pres);
              resList.push(publ);
            });
            this.filtra = !this.filtra;
          } else {
            this.utilsService.toastr("No se han encontrado mascotas", "")
          }

          this.publications = resList;
        });
    else{
      this.utilsService.toastr('No se han ingresado filtros!', '');
      this.getOtrasPublicaciones();
    }
      
  }





}
