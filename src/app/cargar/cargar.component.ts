import { FormularioBaseComponent } from './../formulario-base/formulario-base.component';
import { UtilsService } from './../service/utils.service';
import { StorageService } from './../service/storage.service';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../service/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent extends FormularioBaseComponent implements OnInit {

  infoCreacionPublicacion: String = 
    `Cuando se crea una mascota también se esta creando una publicación, la cual
    contendra a la mascota, más abajo en el formulario se puede marcar la publicación
    que será creada como privada o pública.`
  aviso: String
  avisoVisibilidad: String;
  masInf: boolean;

  submitted: Boolean = false;
  
  formCarga: FormGroup;
  especies: any
  url: any;

  constructor(
    private utilsService: UtilsService,
    private storageService: StorageService,
    private mService: MascotasService, 
    private formBuilder: FormBuilder) {
    super();
    this.aviso = "No deseamos que los usuarios hagan preferencia por razas ni facilitar la adquisición de mascotas para la venta.";
    this.especies = this.mService.getAllEspecies();
    this.masInf = false;
    this.avisoVisibilidad = "Activando esta opción la mascota no aparecerá visible a los adoptantes hasta que sea dada de alta manualmente desde al área de administración.";
  }

  ngOnInit() {
    this.formCarga = this.formBuilder.group({
      nombreMascotaCtrl:['', [
        Validators.required, Validators.minLength(2), 
        Validators.maxLength(15), this.utilsService.onlyText()
      ]],
      apellidoMascotaCtrl:['', [
        Validators.required, Validators.minLength(2), 
        Validators.maxLength(15), this.utilsService.onlyText()
      ]],
      especieMascotaCtrl: ['', [Validators.required]],
      descripcionMascotaCtrl: ['', [Validators.required, Validators.maxLength(499)]],
      //TODO: validaciones para diferenciar entre meses y años.
      // para que pongan por ejemplo: 130 meses.
      edadAproxCtrl:['', [Validators.required, Validators.max(100), Validators.min(1)]],
      tipoEdadCtrl:['', [Validators.required]]
    });
  }
  
  get getNombreMascota() { return this.formCarga.get('nombreMascotaCtrl'); }
  get getApellidoMascota() { return this.formCarga.get('apellidoMascotaCtrl'); }
  get getEspecieMascota() { return this.formCarga.get('especieMascotaCtrl'); }
  get getDescripcionMascota() { return this.formCarga.get('descripcionMascotaCtrl'); }
  get getEdadAprox() { return this.formCarga.get('edadAproxCtrl'); }
  get getTipoEdad() { return this.formCarga.get('tipoEdadCtrl'); }

  masInfo(){
    this.masInf = true;
  }

  ifAllValid() {
    this.mascotaValida() ? this.limpiarError() : this.cargarError('Campos invalidos');
  }

  cargarMascota(){
    this.submitted = true;

    console.log('entro');
    

    if (!this.mascotaValida()) {
      this.cargarError('Campos invalidos');
      this.formCarga.markAllAsTouched();
      return; 
    }

    const userId = this.storageService.getCurrentUser()._id;

    const mascota = {
      name: this.getNombreMascota.value,
      surname: this.getApellidoMascota.value,
      age: this.getEdadAprox.value,
      typeAge: this.getTipoEdad.value,
      type: this.getEspecieMascota.value.name,
      description: this.getDescripcionMascota.value,
      user: userId
    }

    this.mService.crearMascota(mascota)
      .subscribe(
        res => {
          console.log(res);
          
          this.utilsService.notificacion('La mascota se guardo exitosamente','');
        },
        error => {
          console.log(error);
          
        }
      )

    const publicacion = {}



  }

  mascotaValida() {
    return this.formCarga.valid;
  }

  // //imagenes
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed

          this.url = reader.result;

      }
    }
  }

}
