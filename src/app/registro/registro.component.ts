import { AuthService } from './../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  error_password: Boolean = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.max(15)]],
      surname: ['', [Validators.required, Validators.max(15)]],
      username: ['', [Validators.required, Validators.max(10)]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get getName() { return this.myForm.get('name'); }
  get getSurname() { return this.myForm.get('surname'); }
  get getUsername() { return this.myForm.get('username'); }
  get getAge() { return this.myForm.get('age'); }
  get getEmail() { return this.myForm.get('email'); }
  get getPassword() { return this.myForm.get('password'); }

  registroValido(){
    return !this.getName.invalid && !this.getSurname.invalid && !this.getUsername.invalid 
    && !this.getAge.invalid && !this.getEmail.invalid && !this.getPassword.invalid;
  }

  public signUp(){

    if (!this.registroValido()) { 
      console.log("vamos mal!");      
      return; 
    }

    this.authService.registerUser(this.myForm.value).subscribe(
      res => {
        console.log("Se guardo correctamente");
        this.myForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

}
