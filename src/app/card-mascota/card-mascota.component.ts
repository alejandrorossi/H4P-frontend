import { UtilsService } from './../service/utils.service';
import { StorageService } from './../service/storage.service';
import { PublicationService } from './../service/publication.service';
import { Pet } from './../model/pet.model';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../service/image.service';
import { ImgResponse } from '../model/image.model';

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

  //Imagen de previsualizacion
  preimage: any;
  
  constructor(
    private imageService: ImageService,
    private utilsService: UtilsService,
    private publicationService: PublicationService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.loadPreImage();
  }

  private loadPreImage(){
    this.imageService.getImage(this.pet.images[0]._id)
      .subscribe(
        res => {
          let img = res.data as ImgResponse;
          this.preimage = `<img mat-card-image src="${img.dataURL}" alt="{{pet.name}}">`;
        },
        error => {
          console.log('Error!');
        }
      );
  }

  public addPostulant(){
    this.publicationService.addPostulant(this.storageService.getCurrentUser()._id, this.idPublication)
      .subscribe(
        res => {
          console.log(res.status);
          if(res.code != 200){
            console.log('Error!');
          }else{
            this.isOwner = true;
            this.utilsService.notificacion("Se guardó correctamente!", "Postulación")
          }
        },
        error => {
          console.log('Error!');
        }
      );
  }

}
