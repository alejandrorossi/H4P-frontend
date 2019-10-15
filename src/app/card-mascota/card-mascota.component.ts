import { DialogData } from './../dialog-eliminar/dialog-eliminar.component';
import { MatDialog } from '@angular/material';
import { UtilsService } from './../service/utils.service';
import { StorageService } from './../service/storage.service';
import { PublicationService } from './../service/publication.service';
import { Pet } from './../model/pet.model';
import { Component, OnInit, Input } from '@angular/core';

import { ImageService } from '../service/image.service';
import { ImgResponse } from '../model/image.model';
import { DialogEliminarComponent } from '../dialog-eliminar/dialog-eliminar.component';

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

  @Input()
  completa: Boolean;

  //Imagen de previsualizacion
  preimage: any;
  constructor(
    public dialog: MatDialog,
    private imageService: ImageService,
    private utilsService: UtilsService,
    private publicationService: PublicationService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.loadPreImage();
  }

  private loadPreImage() {    
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

  public addPostulant() {
    this.publicationService.addPostulant(this.storageService.getCurrentUser()._id, this.idPublication)
      .subscribe(
        res => {
          console.log(res.status);
          if (res.code != 200) {
            console.log('Error!');
          } else {
            this.isOwner = true;
            this.utilsService.notificacion("Suscripción de adopcion enviada, el refugio se contactará contigo.", "")
          }
        },
        error => {
          console.log('Error!');
        }
      );
  }

  editar() {
    alert('editar')
  }

  eliminar() {
    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      width: '250px',
      data: new DialogData(
        this.idPublication.toString(), 
      "¿Desea eliminar realmente la publicación?"
      ),
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.aceptado){
        this.publicationService.deletePublicacion(result.id).subscribe(
          res => {
            //actualizar las publicaciones que se muestran
            this.utilsService.notificacion("Se elimino la publicación correctamente", "");
          },
          error => {
            this.utilsService.notificacion("No se pudo eliminar la publicación", "");
          }
        )
      }
    });
  }

}
