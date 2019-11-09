import { StorageService } from './storage.service';
import { Publication } from './../model/publication.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filtro } from '../model/filtro.model';


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
    return this.httpClient.post<Response>(environment.URL_API+'publication', publicacion);
  };

  putPublicacion(publicacion): Observable<Response>{
    return this.httpClient.put<Response>(`${this.URL_API}/${publicacion._id}`, publicacion);
  };

  deletePublicacion(idPublicacion: String): Observable<Response>{
    return this.httpClient.delete<Response>(`${environment.URL_API}publication/${idPublicacion}`);
  };

  addPostulant(idUser: String, idPublication: String ): Observable<Response>{
    return this.httpClient.post<Response>(`${environment.URL_API}publication/${idUser}`, {publication: idPublication});
  }

  getPublicacion(idPublicacion: String): Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}publication/${idPublicacion}`);
  }

  buscarPublicacionesFiltradas(filtro: Filtro): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.URL_API}buscarFiltradas`, {params: filtro} );
  };

}
