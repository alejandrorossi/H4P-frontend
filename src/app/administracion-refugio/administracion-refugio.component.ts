import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../service/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-administracion-refugio',
  templateUrl: './administracion-refugio.component.html',
  styleUrls: ['./administracion-refugio.component.scss']
})
export class AdministracionRefugioComponent implements OnInit {

  especies: any;
  filtra: boolean;
  formBusqueda: FormGroup;

  constructor(private mService: MascotasService, private formBuilder: FormBuilder) {
    this.filtra = false;
    this.especies = this.mService.getAllEspecies();
  }

  ngOnInit() {
    this.formBusqueda = this.formBuilder.group({
      nombreMascotaCtrl: ['', [Validators.maxLength(100)]],
      especieMascotaCtrl: ['', []],
    });
  }

  buscar() {
    alert("implementar buscar")
  }

}
