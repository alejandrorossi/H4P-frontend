import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // URL of th Rest API server
  readonly URL_API = `${environment.URL_API}/`;

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpClient: HttpClient) { }

  //Metodos utiles
  toastr(mensaje, accion) {
    this.snackBar.open(mensaje, accion, {
      duration: 3500,
    });
  }

  getDialog(component, data, width) {
    return this.dialog.open(component, {
      width: width,
      data: data,
      disableClose: false
    });
  }

  irA(path) {
    this.router.navigate([path]);
  }


  enviarNotificacion(mensaje: string, usuario: User): Observable<Response> {

    return this.httpClient.put<Response>(
      `${environment.URL_API}/user/notification`,
      {
        user: usuario,
        message: mensaje,
      },
    );

  }


  /*
   * Metodo que funciona como Validator en formularios. 
   */
  onlyText(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regExp: RegExp = /^[a-zA-Z\s]*$/i;
      const valid = regExp.test(control.value);
      return valid ? null : { 'invalidText': { valid: false, value: control.value } };
    };
  }
}
