import { StorageService } from './storage.service';

import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient) { }

  getSolicitudes():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}/solicitud/${this.storageService.getCurrentUser()._id}`); 
  };

  getSolicitudesPendientes():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}/solicitudesPendientes/${this.storageService.getCurrentUser()._id}`); 
  };

  getSolicitudesAceptadas():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}/solicitudesAceptadas/${this.storageService.getCurrentUser()._id}`); 
  };

  putAceptarSolicitante(idPostulacion, idPublicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${environment.URL_API}/aceptarSolicitud/${idPostulacion}`, {idPublicacion});
  };

  putRechazarSolicitante(idPostulacion, idPublicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${environment.URL_API}/rechazarSolicitud/${idPostulacion}`, {idPublicacion});
  };

}
