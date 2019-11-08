import { UsuarioService } from '../services/usuario.service';
import { DialogConfirmacionComponent, DialogData } from './../dialog-confirmacion/dialog-confirmacion.component';
import { StorageService } from '../services/storage.service';
import { UtilsService } from '../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioBaseComponent } from './../formulario-base/formulario-base.component';
import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent extends FormularioBaseComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  hide = true;

  tituloCargar: string = `Perfil de usuario`;

  constructor(
    private usuarioService: UsuarioService,
    private utilsService: UtilsService,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
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
      email: ['', [Validators.required, Validators.email]]
      // TODO: hacer bien cambio de contraseña.
      // ,
      // password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.cargarDatos();
  }

  public ifAllValid() {
    this.formularioValido() ? this.limpiarError() : this.cargarError('Campos invalidos');
  }

  get getName() { return this.myForm.get('name'); }
  get getSurname() { return this.myForm.get('surname'); }
  get getUsername() { return this.myForm.get('username'); }
  get getAge() { return this.myForm.get('age'); }
  get getEmail() { return this.myForm.get('email'); }
  // get getPassword() { return this.myForm.get('password'); }

  setName(name) {this.myForm.get('name').setValue(name); }
  setSurname(surname) {this.myForm.get('surname').setValue(surname); }
  setUsername(username) {this.myForm.get('username').setValue(username); }
  setAge(age) {this.myForm.get('age').setValue(age); }
  setEmail(email) {this.myForm.get('email').setValue(email); }

  private formularioValido(){
    return this.getName.valid && !this.getSurname.invalid && !this.getUsername.invalid 
    && !this.getAge.invalid && !this.getEmail.invalid; // && !this.getPassword.invalid;
  }

  private cargarDatos(){
    let usuario = this.storageService.getCurrentUser();

    console.log(usuario);
    

    this.setName(usuario.name);
    this.setSurname(usuario.surname);
    this.setUsername(usuario.username);
    this.setAge(usuario.age);
    this.setEmail(usuario.email);
  }

  public actualizarPerfil(){
    this.submitted = true;

    if (!this.formularioValido()) {
      this.cargarError('Campos invalidos');
      this.myForm.markAllAsTouched();
      return;
    }

    this.limpiarError();

    const dialogRef = this.utilsService.getDialog(
      DialogConfirmacionComponent, 
      new DialogData("Edición", "¿Desea guardar las modificaciones?"),
      '250px'
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.aceptado){
        this.usuarioService.editarUsuario(this.myForm.value).subscribe(
          res => {
            this.utilsService.notificacion(res.status, '');
            this.storageService.updateCurrentUser(res.data);
          },
          error => {
            this.cargarError('Ocurrio un error en el servidor');
            console.log(error);
          }
        );
      }
    });
  }
}
