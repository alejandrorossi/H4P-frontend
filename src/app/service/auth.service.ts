import { Injectable } from '@angular/core';
// Import for contact Angular with Rest API.
import { HttpClient } from '@angular/common/http';
// Imports necesary interfaces
import { User } from '../model/user.model';
import { Response } from './../model/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app';

  // Instancied contact with Rest API.
  constructor(private httpClient: HttpClient) { }

  // METHODS
  // Register a user
  public registerUser(user: User): Observable<Response> {
    return this.httpClient.post<Response>(`${this.URL_API}/user`, user);
  }

  // Sing in a user
  public signIn(user: User): Observable<Response> {
    return this.httpClient.post<Response>(`${this.URL_API}/login`, user);
  }
}
