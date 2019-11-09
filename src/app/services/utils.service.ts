import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }


  notificacion(mensaje, accion) {
    this.snackBar.open(mensaje, accion, {
      duration: 3500,
    });
  }

  getDialog(component, data, width){
    return this.dialog.open(component, {
      width: width,
      data: data,
      disableClose: false
    });
  }

  //Metodos utiles
  /*
   * Metodo que funciona como Validator en formularios. 
   */
  onlyText(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regExp : RegExp = /^[a-zA-Z\s]*$/i;
      const valid = regExp.test(control.value);
      return valid ? null : {'invalidText': {valid: false , value: control.value}};
    };
  }
}
