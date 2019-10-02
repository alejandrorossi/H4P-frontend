import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../service/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from '../service/publication.service';
import { Publication } from '../model/publication.model';

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

  constructor(private mService: MascotasService, private formBuilder: FormBuilder,
    private publicationService: PublicationService) {
    this.filtra = false;
    this.especies = this.mService.getAllEspecies();
    this.getPublications();
  }

  ngOnInit() {
    
    this.publications = [];
    this.formBusqueda = this.formBuilder.group({
      nombreMascotaCtrl: ['', [Validators.maxLength(100)]],
      especieMascotaCtrl: ['', []],
    });
  }

  buscar() {
    alert("implementar buscar")
  }


  // hacer la lite version para mostrar
  getPublications() {
    this.publicationService.getPublicaciones()
    .subscribe(res => {
      res.data.forEach(pub => {
        const publication = new Publication(pub);
        this.publications.push(publication)
      });
    });
  }

}
