import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { Response } from './../model/response.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  hide = true;
  
  error: Boolean = false;
  error_message: String = '';

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    public storageService: StorageService,
    private authService: AuthService) {  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get getUsername() { return this.myForm.get('username'); }
  get getPassword() { return this.myForm.get('password'); }

  signIn() {
    this.limpiarError();
    this.submitted = true;

    if (this.myForm.invalid) { return; }

    this.authService.signIn(this.myForm.value)
      .subscribe(
        res => {
          // TODO: Error manager
          if(res.error){
            this.cargarError(res.status);
          }else{
            this.storageService.setCurrentSession(res as Response);
            this.router.navigate(['h4p']);
          }
        },
        error => {
          console.log('Error en el servidor:'+ error);
          this.cargarError('Error en el servidor');
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
