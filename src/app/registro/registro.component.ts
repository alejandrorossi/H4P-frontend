import { FormularioBaseComponent } from './../formulario-base/formulario-base.component';
import { UtilsService } from '../services/utils.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends FormularioBaseComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  hide = true;

  constructor(
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(15), 
        this.utilsService.onlyText()
      ]],
      surname: ['', [
        Validators.required, 
        Validators.maxLength(15),
        this.utilsService.onlyText()
      ]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
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
}
