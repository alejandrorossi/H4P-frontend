import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import { SolicitudService } from '../services/solicitud.service';
import { UtilsService } from '../services/utils.service';

export interface DialogData {
  postulantes: Application[];
  aceptado: Application;
  publicationId: string;
}

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.scss']
})

export class ListadoPostulantesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['status', 'name', 'username', 'aceptar', 'rechazar'];
  ELEMENT_DATA: Application[];
  dataSource: any;
  rechazados: Application[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public solicitudSrv: SolicitudService, 
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<ListadoPostulantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.ELEMENT_DATA = data.postulantes;
    this.dataSource = new MatTableDataSource<Application>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.rechazados = []
  }

  ngOnDestroy() {
    this.rechazados = null;
  }

  aceptar(application: Application) {
    this.data.aceptado = application;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rechazar(user: Application) {

    this.rechazados.push(user)
    this.solicitudSrv.putRechazarSolicitante(user._id, this.data.publicationId).subscribe(
      res => {
        this.utilsService.toastr('Usuario Rechazado!', '');
        if(user.status=="aceptado"){
          this.utilsService.toastr("Se ha cambiado al usuario de aceptado a rechazado", "");
          this.dialogRef.close()
        }
          
      },
      error => {
        console.log(error);
      });

  }

  esRechazado(user: Application) {
    var ret = false;
    this.rechazados.forEach(us => {
      if (us._id == user._id)
        ret = true
    });
    return ret || (user.status == 'rechazado')
  }

  hayAceptado() {
    var ret = false;
    this.data.postulantes.forEach(el => {
      if (el.status == "aceptado") ret = true;

    });
    return ret;
  }

  esUsuarioRechazado(){
    return this.data.aceptado.status =='rechazado';
  }
  



}





