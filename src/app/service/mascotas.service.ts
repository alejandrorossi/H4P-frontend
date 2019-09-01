import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  mascotas: any
  
  constructor() {
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
