import { StorageService } from './../service/storage.service';
import { PublicationService } from '../service/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from '../model/publication.model';
import { MascotasService } from '../service/mascotas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  publications: Publication[];

  constructor(
    private router: Router, 
    private publicationService: PublicationService,
    public storageService: StorageService,
    public masc: MascotasService) {
    // this.getPublications();
    this.getall()
  }

  ngOnInit() {

  }


  isOwner(publication: Publication): Boolean{
    return this.storageService.getCurrentSession().data.username == publication.user.username;
    // return false
  }

  getPublications() {
    this.publicationService.getPublicaciones()
    .subscribe(res => {
        this.publications = res.data as Publication[];
      });
  }

  //para probar de mientras
  getall(){
    this.publications = this.masc.getAllMascotasSinAdoptar()
  }



}
