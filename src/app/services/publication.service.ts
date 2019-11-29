import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filtro } from '../models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  
  // URL of th Rest API server
  readonly URL_API = `${environment.URL_API}/publication`;
  
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService) {
  }

  // Methods
  getPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(environment.URL_API+'publication');
  };

  getUsuarioPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(`${this.URL_API}/user/${this.storageService.getCurrentUser()._id}`);
  };

  getOtrasPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(`${this.URL_API}/other/${this.storageService.getCurrentUser()._id}`);
  };

  postPublicacion(publicacion): Observable<Response>{
    return this.httpClient.post<Response>(`${this.URL_API}`, publicacion);
  };

  putPublicacion(publicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${this.URL_API}/${publicacion._id}`, publicacion);
  };

  deletePublicacion(idPublicacion: String): Observable<Response>{
    return this.httpClient.delete<Response>(`${this.URL_API}/${idPublicacion}`);
  };

  addPostulant(idUser: String, idPublication: String ): Observable<Response>{
    return this.httpClient.post<Response>(`${this.URL_API}/${idUser}`, {publication: idPublication});
  }

  getPublicacion(idPublicacion: String): Observable<Response>{
    return this.httpClient.get<Response>(`${this.URL_API}/${idPublicacion}`);
  }

  buscarPublicacionesFiltradas(filtro: Filtro): Observable<Response> {
    return this.httpClient.post<Response>(`${this.URL_API}/buscarFiltradas`, {params: filtro} );
  };

  buscarPublFiltradasAdoptante(filtro: Filtro): Observable<Response> {
    return this.httpClient.post<Response>(`${this.URL_API}/buscarFiltradasAdoptante`, {params: filtro} );
  };

}
