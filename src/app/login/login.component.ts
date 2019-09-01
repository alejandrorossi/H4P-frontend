import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { ReactiveFormsModule  } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  submitted: Boolean = false;
  error_password: Boolean = false;
  // error_not_found: Boolean = false;
  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder) { 

  }

  goto(ruta){
    this.router.navigate([ruta]);
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      contraseniaCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }


  get getEmail() { return this.myForm.get('emailCtrl'); }
  get getContrasenia() { return this.myForm.get('contraseniaCtrl'); }

  signIn() {



  }



}
