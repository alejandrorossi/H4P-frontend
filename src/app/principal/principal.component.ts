import { Publication } from '../models/publication.model';
import { StorageService } from '../services/storage.service';
import { PublicationService } from '../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../services/mascotas.service';
import { Filtro } from '../models/filtro.model';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(
    private router: Router,
    private publicationService: PublicationService,
    public storageService: StorageService,
    private mService: MascotasService,
    private formBuilder: FormBuilder,
    public masc: MascotasService) {
    this.getOtrasPublicaciones();

    this.especies = this.mService.getAllEspecies();
  }

  ngOnInit() {
    this.formBusqueda2 = this.formBuilder.group({
      especieMascotaCtrl: ['', []],
    });
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
    var filtro = new Filtro();

    if(this.fechaDesde)
      filtro.desde = this.fechaDesde.toISOString();

    filtro.especie = this.formBusqueda2.get('especieMascotaCtrl').value.name;


    this.publicationService.buscarPublFiltradasAdoptante(filtro)
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


}
