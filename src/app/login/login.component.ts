import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { Session } from '../model/session.model';
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
    this.submitted = true;

    if (this.myForm.invalid) { return; }

    this.authService.signIn(this.myForm.value)
      .subscribe(
        res => {
          console.log(res.status);

          // TODO: Error manager
          if (res.code == 400) {
            this.error_password = true;
          }
          
          if(res.code == 404){
            console.log('Error!');
          }else{
            this.storageService.setCurrentSession(res as Session);
            this.router.navigate(['h4p']);
          }
        },
        error => {
          console.log('Error!');
        }
      );
  }
}
