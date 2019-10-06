import { UtilsService } from './../service/utils.service';
import { AuthService } from './../service/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormGroupDirective, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  hide = true;
  
  errorMatcher = new CustomErrorStateMatcher();
  error: Boolean = false;
  error_message: String = '';

  constructor(
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(15), 
        this.onlyText()
      ]],
      surname: ['', [
        Validators.required, 
        Validators.maxLength(15),
        this.onlyText()
      ]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onlyText(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regExp : RegExp = /^[a-zA-Z\s]*$/i;
      const valid = regExp.test(control.value);
      return valid ? null : {'invalidName': {valid: false , value: control.value}};
    };
  }

  ifAllValid() {
    this.registroValido() ? this.limpiarError() : this.cargarError('Campos invalidos');
  }

  get getName() { return this.myForm.get('name'); }
  get getSurname() { return this.myForm.get('surname'); }
  get getUsername() { return this.myForm.get('username'); }
  get getAge() { return this.myForm.get('age'); }
  get getEmail() { return this.myForm.get('email'); }
  get getPassword() { return this.myForm.get('password'); }

  registroValido(){
    return this.getName.valid && !this.getSurname.invalid && !this.getUsername.invalid 
    && !this.getAge.invalid && !this.getEmail.invalid && !this.getPassword.invalid;
  }

  public signUp(){
    this.submitted = true;
    this.limpiarError();

    if (!this.registroValido()) {
      this.cargarError('Campos invalidos');
      this.myForm.markAllAsTouched();
      return; 
    }

    this.authService.registerUser(this.myForm.value).subscribe(
      res => {
        this.utilsService.notificacion('El registro fue exitoso', '');
        this.myForm.reset();
      },
      error => {
        this.cargarError('Ocurrio un error en el servidor');
        console.log(error);
      }
    );
  }

  private cargarError(status){
    this.error = true;
    this.error_message = status;
  }

  private limpiarError(){
    this.error = false;
    this.error_message = '';
  }

}
