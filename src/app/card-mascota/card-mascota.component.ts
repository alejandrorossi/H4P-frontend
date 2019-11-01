import { DialogConfirmacionComponent } from './../dialog-confirmacion/dialog-confirmacion.component';
import { DialogData } from '../dialog-confirmacion/dialog-confirmacion.component';
import { UtilsService } from './../service/utils.service';
import { StorageService } from './../service/storage.service';
import { PublicationService } from './../service/publication.service';
import { Pet } from './../model/pet.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../service/image.service';
import { ImgResponse } from '../model/image.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-mascota',
  templateUrl: './card-mascota.component.html',
  styleUrls: ['./card-mascota.component.scss']
})
export class CardMascotaComponent implements OnInit {

  @Input() pet: Pet;
  @Input() isOwner: Boolean;
  @Input() idPublication: String;
  @Input() completa: Boolean;

  @Output() notifyActualizarPrincipal: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Imagen de previsualizacion
  preimage: any;
  
  constructor(
    private _router: Router,
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
    this._router.navigate([`/h4p/cargar-mascota/${this.idPublication}`]);
  }

  eliminar() {
    const dialogRef = this.utilsService.getDialog(
      DialogConfirmacionComponent,
      new DialogData("Eliminar", "¿Desea eliminar realmente la publicación?"),
      '250px'
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.aceptado){
        this.publicationService.deletePublicacion(this.idPublication.toString()).subscribe(
          res => {
            this.utilsService.notificacion("Se elimino la publicación correctamente", "");
            this.notifyActualizarPrincipal.emit(true);
          },
          error => {
            this.utilsService.notificacion("No se pudo eliminar la publicación", "");
          }
        )
      }
    });
  }
}
