import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.scss']
})
export class DialogEliminarComponent implements OnInit {

  original: DialogData;

  constructor(
    public dialogRef: MatDialogRef<DialogEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.original = new DialogData(this.data.id, this.data.texto);
  }

  aceptar(){
    this.data.aceptado = true;
    return this.data;
  }

  cancelar(){
    this.data = this.original;
    this.dialogRef.close();
  }

}

export class DialogData {

  constructor(id: string, texto: string){
    this.id = id;
    this.texto = texto;
    this.aceptado = false;
  }

  id: string;
  texto: string;
  aceptado: boolean;
}
