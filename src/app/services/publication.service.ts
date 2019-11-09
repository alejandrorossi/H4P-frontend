import { StorageService } from './storage.service';
import { Publication } from '../models/publication.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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



}