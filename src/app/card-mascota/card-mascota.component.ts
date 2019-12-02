import { DialogPerfilUsuarioComponent } from './../dialog-perfil-usuario/dialog-perfil-usuario.component';
import { DialogConfirmacionComponent } from './../dialog-confirmacion/dialog-confirmacion.component';
import { DialogData } from '../dialog-confirmacion/dialog-confirmacion.component';
import { UtilsService } from '../services/utils.service';
import { StorageService } from '../services/storage.service';
import { PublicationService } from '../services/publication.service';
import { Pet } from '../models/pet.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ImgResponse } from '../models/image.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-mascota',
  templateUrl: './card-mascota.component.html',
  styleUrls: ['./card-mascota.component.scss']
})
export class CardMascotaComponent implements OnInit {

  @Input() pet: Pet;
  @Input() isOwner: Boolean;
  @Input() esPostulante: Boolean;
  @Input() idPublication: String;
  @Input() completa: Boolean;
  @Input() usadaEnAdmin: Boolean;

  @Output() notifyActualizarPublicaciones: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Imagen de previsualizacion
  preimage: string;
  
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
    this.preimage = `${this.imageService.URL_UPLOADS}/${this.pet.images[0].path}`;
  }


  // esAdministracion(){
  //   let ret = 'publicacion mat-elevation-z4 mt-3 mb-2 contenido-ajuste';

  //   if (this.usadaEnAdmin)
  //     ret = ret + ' contenido-ajuste';

  //   return ret;
  // }

  public addPostulant() {
    const user = this.storageService.getCurrentUser();
    this.publicationService.addPostulant(user._id, this.idPublication)
      .subscribe(
        res => {
          if (res.code != 200) {
            console.log('Error!');
          } else {
            this.esPostulante = true;
            this.utilsService.notificar('Has recibido una nueva suscripción', this.pet.user);
            this.utilsService.notificar("Te suscribiste a una nueva publicación.", user);
            this.utilsService.toastr("Suscripción de adopcion enviada, el refugio se contactará contigo.", "")
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
      '250px' //TODO: usar porcentaje que es relativo, no tamanios fijos
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.aceptado){
        this.publicationService.deletePublicacion(this.idPublication.toString()).subscribe(
          res => {
            this.utilsService.toastr("Se elimino la publicación correctamente", "");
            this.notifyActualizarPublicaciones.emit(true);
          },
          error => {
            this.utilsService.toastr("No se pudo eliminar la publicación", "");
          }
        )
      }
    });
  };

  verPerfilUsuario(){
    const dialogRef = this.utilsService.getDialog(
      DialogPerfilUsuarioComponent,
      this.pet.user,
      '400px' //TODO: usar porcentaje que es relativo, no tamanios fijos
    );
  }
}
