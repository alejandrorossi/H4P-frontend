import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../service/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent implements OnInit {

  aviso: String
  especies: any
  url: any;
  masInf: boolean;
  formCarga: FormGroup;
  submitted: Boolean = false;
  avisoVisibilidad: String;

  constructor(private mService: MascotasService, private formBuilder: FormBuilder) {
    this.aviso = "No deseamos que los usuarios hagan preferencia por razas ni facilitar la adquisición de mascotas para la venta.";
    this.especies = this.mService.getAllEspecies();
    this.masInf = false;
    this.avisoVisibilidad = "Activando esta opción la mascota no aparecerá visible a los adoptantes hasta que sea dada de alta manualmente desde al área de administración.";
  }

  ngOnInit() {
    this.formCarga = this.formBuilder.group({
      nombreMascotaCtrl:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      especieMascotaCtrl: ['', [Validators.required]],
      descripcionMascotaCtrl: ['', [Validators.required, Validators.maxLength(499)]],
      edadAproxCtrl:['', [Validators.maxLength(2)]] 
    });
  }


  masInfo(){
    this.masInf = true;
  }

  cargarMascota(){
    this.submitted = true;

    if (this.formCarga.invalid) { return; }

    //envio de datos al servicio creado

  }


  get getNombreMascota() { return this.formCarga.get('nombreMascotaCtrl'); }
  get getEspecieMascota() { return this.formCarga.get('especieMascotaCtrl'); }
  get getDescripcionMascota() { return this.formCarga.get('descripcionMascotaCtrl'); }




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
