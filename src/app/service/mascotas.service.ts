import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../model/response.model';

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
        name: "Pájaro",
        icon: "fas fa-crow "
      },
      {
        value: "ot",
        name: "Otros",
        icon: "fas fa-paw"
      },

    ]
  }

  getAllMascotasSinAdoptar() {
    return this.mascotas;
  }

  getAllEspecies() {
    return this.especies;
  }

  public crearMascota(mascota): Observable<Response> {
    return this.httpClient.post<Response>(`${this.URL_API}`, mascota);
  }

}
