import { Response } from './../model/response.model';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { User } from './../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Variables
  // URL of th Rest API server
  readonly URL_API = 'http://localhost:8080/app/user';

  // Instancied contact with Rest API.
  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient) { }

  // METHODS API
  // Editar usuario
  public editarUsuario(user: User): Observable<Response> {
    return this.httpClient
      .put<Response>(`${this.URL_API}/${this.storageService.getCurrentUser()._id}`, user);
  }
}
