import { StorageService } from './storage.service';
import { Publication } from './../model/publication.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  
  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app/publication';
  
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService) {
  }

  // Methods
  getPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(this.URL_API);
  };

  getUsuarioPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(`${this.URL_API}/user/${this.storageService.getCurrentUser()._id}`);
  };


  postPublicacion(publicacion): Observable<Response>{
    return this.httpClient.post<Response>(this.URL_API, publicacion);
  };

  putPublicacion(){
    
  };

  deletePublicacion(idPublicacion: string): Observable<Response>{
    return this.httpClient.delete<Response>(`${this.URL_API}/${idPublicacion}`);
  };

  addPostulant(idUser: String, idPublication: String ): Observable<Response>{
    return this.httpClient.post<Response>(`${this.URL_API}/${idUser}`, {publication: idPublication});
  }
}
