import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective| null) {
    return control && control.invalid && control.touched;
  }
}

@Component({
  selector: 'app-formulario-base',
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.scss']
})
export class FormularioBaseComponent {

  errorMatcher = new CustomErrorStateMatcher();
  error: Boolean = false;
  error_message: String = '';

  public cargarError(status){
    this.error = true;
    this.error_message = status;
  }

  public limpiarError(){
    this.error = false;
    this.error_message = '';
  }

}
