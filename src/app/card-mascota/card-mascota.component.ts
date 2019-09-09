import { StorageService } from './../service/storage.service';
import { PublicationService } from './../service/publication.service';
import { Pet } from './../model/pet.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-mascota',
  templateUrl: './card-mascota.component.html',
  styleUrls: ['./card-mascota.component.scss']
})
export class CardMascotaComponent implements OnInit {

  @Input()
  pet : Pet;

  @Input()
  isOwner: Boolean;

  @Input()
  idPublication: String;
  
  constructor(
    private publicationService: PublicationService,
    private storageService: StorageService) { }

  ngOnInit() {
  }

  addPostulant(){
    this.publicationService.addPostulant(this.storageService.getCurrentUser()._id, this.idPublication)
      .subscribe(
        res => {
          console.log(res.status);
          if(res.code != 200){
            console.log('Error!');
          }else{
            this.isOwner = true;
          }
        },
        error => {
          console.log('Error!');
        }
      );
  }

}
