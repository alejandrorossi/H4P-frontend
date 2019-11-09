import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private httpClient: HttpClient) { }

  getSolicitudes():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}solicitud`); 
  };

  getSolicitudesPendientes():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}solicitudesPendientes`); 
  };

  getSolicitudesAceptadas():  Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}solicitudesAceptadas`); 
  };

  putAceptarSolicitante(idPostulacion, idPublicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${environment.URL_API}aceptarSolicitud/${idPostulacion}`, {idPublicacion});
  };

  putRechazarSolicitante(idPostulacion, idPublicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${environment.URL_API}rechazarSolicitud/${idPostulacion}`, {idPublicacion});
  };


}