import { Publication } from '../models/publication.model';
import { StorageService } from '../services/storage.service';
import { PublicationService } from '../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../services/mascotas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  publications: Publication[] = [];

  constructor(
    private router: Router, 
    private publicationService: PublicationService,
    public storageService: StorageService,
    public masc: MascotasService) {
    this.getOtrasPublicaciones();
  }
    
  ngOnInit() {
  }

  // Publicaciones que no son propias, a las cuales me puedo postular.
  getOtrasPublicaciones(){
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

  isOwnerOrPostulant(publication: Publication): Boolean{
    var currentUserName: String = this.storageService.getCurrentUser().username;
    return publication.isOwner(currentUserName) || publication.hasPostulant(currentUserName);
  }

  onNotifyActualizarPrincipal(notifyActualizarEstadoCuenta: boolean){
    if(notifyActualizarEstadoCuenta){ this.getOtrasPublicaciones(); }
  }
}
