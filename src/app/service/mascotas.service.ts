import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  mascotas: any
  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app/pet';

  constructor(private http: HttpClient) {
    this.mascotas = [
      {
        nombre: "firulais",
        especie: "Perro",
        descripcion: "un perro como cualquier otro",
        imagen: "/assets/img/perro.jpg"
      },
      {
        nombre: "Grumpy",
        especie: "Gato",
        descripcion: "Excelente humor, perfecto para los niños",
        imagen: "/assets/img/gato.PNG"
      }
    ]
  }


  getAllMascotasSinAdoptar() {
    return this.mascotas;
  }



}
