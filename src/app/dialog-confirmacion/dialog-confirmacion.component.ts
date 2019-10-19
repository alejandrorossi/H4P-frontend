import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmacion',
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.scss']
})
export class DialogConfirmacionComponent implements OnInit {

  original: DialogData;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.original = new DialogData(this.data.texto);
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

  constructor(texto: string){
    this.texto = texto;
    this.aceptado = false;
  }

  texto: string;
  aceptado: boolean;
}
