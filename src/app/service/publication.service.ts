import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  
  constructor(private httpClient: HttpClient) { }

  // Methods
  getPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(environment.URL_API+'publication');
  };

  postPublicacion(publicacion): Observable<Response>{
    return this.httpClient.post<Response>(environment.URL_API+'publication', publicacion);
  };

  putPublicacion(){
    
  };

  deletePublicacion(idPublicacion: string): Observable<Response>{
    return this.httpClient.delete<Response>(`${environment.URL_API}publication/${idPublicacion}`);
  };

  addPostulant(idUser: String, idPublication: String ): Observable<Response>{
    return this.httpClient.post<Response>(`${environment.URL_API}publication/${idUser}`, {publication: idPublication});
  }

  getPublicacion(idPublicacion: string): Observable<Response>{
    return this.httpClient.get<Response>(`${environment.URL_API}publication/${idPublicacion}`);
  }



}
