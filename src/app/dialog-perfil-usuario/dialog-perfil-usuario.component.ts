import { User } from './../models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-perfil-usuario',
  templateUrl: './dialog-perfil-usuario.component.html',
  styleUrls: ['./dialog-perfil-usuario.component.scss']
})
export class DialogPerfilUsuarioComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogPerfilUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
  }

}
