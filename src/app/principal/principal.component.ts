import { StorageService } from './../service/storage.service';
import { PublicationService } from '../service/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from '../model/publication.model';

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
    public storageService: StorageService) {
    this.getPublications();
  }

  ngOnInit() {

  }

  salir() {
    this.router.navigate(["/"]);
  }

  isOwner(publication: Publication): Boolean{
    return this.storageService.getCurrentSession().data.username == publication.user.username;
  }

  getPublications() {
    this.publicationService.getPublicaciones()
    .subscribe(res => {
        this.publications = res.data as Publication[];
      });
  }




}
