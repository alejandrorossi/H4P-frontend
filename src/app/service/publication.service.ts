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
  
  constructor(private httpClient: HttpClient) { }

  // Methods
  getPublicaciones():  Observable<Response>{
    return this.httpClient.get<Response>(this.URL_API); //return data in array
  };

  postPublicacion(){
    
  };

  putPublicacion(){
    
  };

  deletePublicacion(){
    
  };
}
