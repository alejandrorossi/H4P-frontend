import { PublicationService } from './../service/publication.service';
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
  checkedPrivada: Boolean = false;
  url: any;
  imagenes: any[] = Array<any>();

  constructor(
    private publicacionService: PublicationService,
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
      tipoEdadCtrl:['A', [Validators.required]]
    });
  }
  
  get getNombreMascota() { return this.formCarga.get('nombreMascotaCtrl'); }
  get getApellidoMascota() { return this.formCarga.get('apellidoMascotaCtrl'); }
  get getEspecieMascota() { return this.formCarga.get('especieMascotaCtrl'); }
  get getDescripcionMascota() { return this.formCarga.get('descripcionMascotaCtrl'); }
  get getEdadAprox() { return this.formCarga.get('edadAproxCtrl'); }
  get getTipoEdad() { return this.formCarga.get('tipoEdadCtrl'); }
  get getCheckedPrivada() {return this.checkedPrivada? "privado": "publico" }

  setTipoEdad(tipo) {this.formCarga.get('tipoEdadCtrl').setValue(tipo); }

  masInfo(){
    this.masInf = true;
  }

  ifAllValid() {
    this.mascotaValida() ? this.limpiarError() : this.cargarError('Campos invalidos');
  }

  cargarMascota(){
    this.submitted = true;

    if (!this.mascotaValida()) {
      this.cargarError('Campos invalidos');
      this.formCarga.markAllAsTouched();
      return; 
    }

    this.limpiarError()

    const mascota = {
      name: this.getNombreMascota.value,
      surname: this.getApellidoMascota.value,
      age: this.getEdadAprox.value,
      typeAge: this.getTipoEdad.value,
      type: this.getEspecieMascota.value.name,
      description: this.getDescripcionMascota.value,
      user: this.storageService.getCurrentUser(),
      images: this.imagenes
    }

    this.mService.crearMascota(mascota).subscribe(
      res => {
        if(!res.error){
          const publicacion = {
            pet: res.data._id,
            status: this.getCheckedPrivada
          }
          this.publicacionService.postPublicacion(publicacion).subscribe(
            res => {
              this.utilsService.notificacion('La mascota y publicación se crearon exitosamente','');
              this.resetearFormulario();
            },
            error => {
              console.log(error);
            });
        }
        else{
          this.utilsService.notificacion(res.status,'');
        }
      },
      error => {
        console.log(error);
      });
  }

  resetearFormulario(){
    //Se resetea el formulario.
    this.formCarga.reset();
    //Se resetean las propiedades que se usan para
    //las imagenes, que no estan contempladas en el formGroup.
    this.url = '';
    this.imagenes = Array<any>();
    //Se resetea la propiedad de formulario enviado.
    this.submitted = false;
    //Se setean los valores por default del formulario.
    this.setTipoEdad('A');
  }

  mascotaValida() {
    return this.formCarga.valid && this.imagenes.length >= 1;
  }

  //Cargado de imagenes.
  onSelectFile(event) { 
    if (event.target.files) {
      const reader = new FileReader();
      //Por cada elemento cargado creamos un obj imagen
      //y lo guardamos en el array de imagenes. Esto se penso
      //para cargar mas de una imagen, a priori solo cargaremos una.
      for(let element of event.target.files){        
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          let imagen = {
            title: element.name.split(".")[0],
            extension:  element.name.split(".")[1],
            data: reader.result,
            creator: this.storageService.getCurrentUser()
          };
          
          this.url = reader.result;

          this.imagenes.push(imagen);          
        }
      }
    }
  }

}
