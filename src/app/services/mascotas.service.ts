import { Pet } from './../models/pet.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  mascotas: any
  especies: any
  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app/pet';

  constructor(private httpClient: HttpClient) {


    this.especies = [
      {
        value: "pe",
        name: "Perro",
        icon: "fas fa-dog"
      },
      {
        value: "ga",
        name: "Gato",
        icon: "fas fa-cat"
      },
      {
        value: "pa",
        name: "Pajaro",
        icon: "fas fa-crow "
      },
      {
        value: "ot",
        name: "Otros",
        icon: "fas fa-paw"
      },

    ]
  }

  getEspecie(nombre){
    let ret;
    this.especies.forEach(especie => {
      if(especie.name == nombre)
        ret = especie;
    });
    return ret;
  }

  getAllMascotasSinAdoptar() {
    return this.mascotas;
  }

  getAllEspecies() {
    return this.especies;
  }

  public crearMascota(mascota: Pet, file: File): Observable<Response> {
    const fd = new FormData();
    fd.append('mascota', JSON.stringify(mascota));
    fd.append('image', file);

    return this.httpClient.post<Response>(`${this.URL_API}`, fd);
  }

  public editarMascota(mascota, file: File): Observable<Response> {
    const fd = new FormData();
    fd.append('mascota', JSON.stringify(mascota));
    if(file)
      fd.append('image', file);

    return this.httpClient.put<Response>(`${this.URL_API}/${mascota._id}`, fd);
  }

}
