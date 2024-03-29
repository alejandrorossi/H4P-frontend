import { DialogData } from './../dialog-confirmacion/dialog-confirmacion.component';
import { ImgResponse, Image } from '../models/image.model';
import { Publication } from '../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from '../services/publication.service';
import { FormularioBaseComponent } from './../formulario-base/formulario-base.component';
import { UtilsService } from '../services/utils.service';
import { StorageService } from '../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from '../services/image.service';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent extends FormularioBaseComponent implements OnInit {

  tituloCargar: string = "Nueva Mascota";
  infoCreacionPublicacion: string = 
    `Cuando se crea una mascota también se esta creando una publicación, la cual
    contendra a la mascota, más abajo en el formulario se puede marcar la publicación
    que será creada como privada o pública.`;
  aviso: string = 
    `No deseamos que los usuarios hagan preferencia por razas ni 
    facilitar la adquisición de mascotas para la venta.`;
  avisoVisibilidad: string = 
    `Activando esta opción la mascota no aparecerá visible a los adoptantes 
    hasta que sea dada de alta manualmente desde al área de administración.`;
  masInf: boolean = false;

  submitted: boolean = false;
  formCarga: FormGroup;
  especies: any
  checkedPrivada: Boolean = false;

  file: File;
  photoSelected: string | ArrayBuffer;
  imagen : Image;

  idPublicacionEditar: String; //Se carga cuando es edicion.
  esEdicion: boolean = false;
  idMascotaEditar: String; //Se carga cuando es edicion.

  constructor(
    private _route: ActivatedRoute,
    private imageService: ImageService,
    private publicacionService: PublicationService,
    private utilsService: UtilsService,
    private storageService: StorageService,
    private mascotaService: MascotasService, 
    private formBuilder: FormBuilder) {
    super();
    this.especies = this.mascotaService.getAllEspecies();
    this.idPublicacionEditar = this._route.snapshot.paramMap.get('idPublicacion');
  }

  ngOnInit() {
    this.formCarga = this.formBuilder.group({
      nombreMascotaCtrl:['', [
        Validators.required, Validators.minLength(2), 
        Validators.maxLength(15), this.utilsService.onlyText()
      ]],
      especieMascotaCtrl: ['', [Validators.required]],
      descripcionMascotaCtrl: ['', [Validators.required, Validators.maxLength(499)]],
      //TODO: validaciones para diferenciar entre meses y años.
      // para que no pongan por ejemplo: 130 meses.
      edadAproxCtrl:['', [Validators.required, Validators.max(100), Validators.min(1)]],
      tipoEdadCtrl:['A', [Validators.required]]
    });

    //Si es edicion se cargan los datos necesarios.
    if(this.idPublicacionEditar){
      this.esEdicion = true;
      this.tituloCargar = "Editar Publicación";
      this.cargarDatosPublicacion();
    }
  }
  
  get getNombreMascota() { return this.formCarga.get('nombreMascotaCtrl'); }
  get getEspecieMascota() { return this.formCarga.get('especieMascotaCtrl'); }
  get getDescripcionMascota() { return this.formCarga.get('descripcionMascotaCtrl'); }
  get getEdadAprox() { return this.formCarga.get('edadAproxCtrl'); }
  get getTipoEdad() { return this.formCarga.get('tipoEdadCtrl'); }
  get getCheckedPrivada() {return this.checkedPrivada? "privado": "publico" }

  setNombreMascota(nombre) {this.formCarga.get('nombreMascotaCtrl').setValue(nombre); }
  setEspecieMascota(especie) {this.formCarga.get('especieMascotaCtrl').setValue(especie); }
  setDescripcionMascota(descripcion) {this.formCarga.get('descripcionMascotaCtrl').setValue(descripcion); }
  setEdadAprox(edad) {this.formCarga.get('edadAproxCtrl').setValue(edad); }
  setTipoEdad(tipo) {this.formCarga.get('tipoEdadCtrl').setValue(tipo); }
  setCheckedPrivada(check) { this.checkedPrivada =  (check == "privado") }

  public masInfo(){
    this.masInf = true;
  }

  changedPrivada(){
    this.checkedPrivada = !this.checkedPrivada
  }

  public ifAllValid() {
    this.mascotaValida() ? this.limpiarError() : this.cargarError('Campos invalidos');
  }

  public cargarMascota(){
    this.submitted = true;

    if (!this.mascotaValida()) {
      this.cargarError('Campos invalidos');
      this.formCarga.markAllAsTouched();
      return; 
    }

    this.limpiarError()

    const mascota = {
      _id: this.idMascotaEditar,
      name: this.getNombreMascota.value,
      age: this.getEdadAprox.value,
      typeAge: this.getTipoEdad.value,
      type: this.getEspecieMascota.value.name,
      description: this.getDescripcionMascota.value,
      user: this.storageService.getCurrentUser()
    }

    if(this.esEdicion)
      this.modificarPublicacionMascota(mascota);
    else
      this.crearPublicacionMascota(mascota);
  }

  private modificarPublicacionMascota(mascota) {
    const dialogRef = this.utilsService.getDialog(
      DialogConfirmacionComponent, 
      new DialogData("Edición", "¿Desea guardar las modificaciones?"),
      '250px'
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.aceptado){
        this.mascotaService.editarMascota(mascota, this.file).subscribe(
          res => {
            if(!res.error){
              const publicacion = {
                _id: this.idPublicacionEditar,
                pet: res.data._id,
                status: this.getCheckedPrivada
              }         
              this.publicacionService.putPublicacion(publicacion).subscribe(
                res => {
                  this.utilsService.toastr('La edición fue exitosa','');
                  this.resetearFormulario();
                },
                error => {
                  console.log(error);
                });
            }
            else{
              this.utilsService.toastr(res.status,'');
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  private crearPublicacionMascota(mascota) {
    this.mascotaService.crearMascota(mascota, this.file).subscribe(
      res => {
        if(!res.error){
          const publicacion = {
            pet: res.data._id,
            status: this.getCheckedPrivada
          }
          this.publicacionService.postPublicacion(publicacion).subscribe(
            res => {
              this.utilsService.toastr('La mascota y publicación se crearon exitosamente','');
              this.resetearFormulario();
            },
            error => {
              console.log(error);
            });
        }
        else{
          this.utilsService.toastr(res.status,'');
        }
      },
      error => {
        console.log(error);
      });    
  }

  private resetearFormulario(){
    //Se resetea el formulario.
    this.formCarga.reset();
    //Se resetean las propiedades que se usan para
    //las imagenes, que no estan contempladas en el formGroup.
    this.file = null;
    this.imagen = null;
    this.photoSelected = null;
    //Se resetea la propiedad de formulario enviado.
    this.submitted = false;
    //Se setean los valores por default del formulario.
    this.setTipoEdad('A');
    this.setCheckedPrivada("publico");
  }

  private mascotaValida() {
    return this.formCarga.valid && this.photoSelected;//(this.imagenes.length >= 1 || this.url);
  }

  //Cargado de imagenes.
  public onSelectFile(event) { 
    if (event.target.files && event.target.files[0]) {
      
      this.file = <File> event.target.files[0];      
      
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  private cargarDatosPublicacion(){
    let publicacion: Publication;

    this.publicacionService.getPublicacion(this.idPublicacionEditar).subscribe(
      res => {
        publicacion = res.data;
        this.setNombreMascota(publicacion.pet.name);
        this.setEspecieMascota(this.mascotaService.getEspecie(publicacion.pet.type));
        this.setDescripcionMascota(publicacion.pet.description);
        this.setEdadAprox(publicacion.pet.age);
        this.setTipoEdad(publicacion.pet.typeAge);
        this.setCheckedPrivada(publicacion.status);
        
        this.idMascotaEditar = publicacion.pet._id;

        this.imagen = publicacion.pet.images[0];
        this.photoSelected = `${this.imageService.URL_UPLOADS}/${this.imagen.path}`;
      },
      error => {
        this.utilsService.toastr('Ocurrio un error para la edición','');
      }
    )
  }
}
