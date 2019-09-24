import { StorageService } from './../service/storage.service';
import { PublicationService } from './../service/publication.service';
import { Pet } from './../model/pet.model';
import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-card-mascota',
  templateUrl: './card-mascota.component.html',
  styleUrls: ['./card-mascota.component.scss']
})
export class CardMascotaComponent implements OnInit {

  @Input()
  pet: Pet;

  @Input()
  isOwner: Boolean;

  @Input()
  idPublication: String;

  constructor(
    private publicationService: PublicationService,
    private storageService: StorageService,
    private utilsService: UtilsService) { }

  ngOnInit() {
  }

  addPostulant() {
    this.publicationService.addPostulant(this.storageService.getCurrentUser()._id, this.idPublication)
      .subscribe(
        res => {

          if (res.code == 200) {
            this.isOwner = true;
            this.utilsService.notificacion("Suscripción de adopcion enviada, el refugio se contactará contigo.","")
          } else {
            console.log('Error!');

          }
        },
        error => {
          console.log('Error!');
        }
      );
  }

}
