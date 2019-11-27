import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app/image';

  // URL get uploads
  readonly URL_UPLOADS = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Methods
  getImage(idImage: String): Observable<Response>{
    return this.http.get<Response>(`${this.URL_API}/${idImage}`);
  };
}
