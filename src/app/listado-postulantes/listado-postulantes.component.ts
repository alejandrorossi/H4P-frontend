import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../model/user.model';
import { Application } from '../model/application.model';
import { SolicitudService } from '../service/solicitud.service';
import { UtilsService } from '../service/utils.service';

export interface DialogData {
  postulantes: User[];
  aceptado: Application;
  publicationId: string;
}

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.scss']
})

export class ListadoPostulantesComponent implements OnInit {

  displayedColumns: string[] = ['status', 'name', 'username', 'aceptar', 'rechazar'];
  ELEMENT_DATA: User[];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public solicitudSrv: SolicitudService, private utilsService: UtilsService,
    public dialogRef: MatDialogRef<ListadoPostulantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.ELEMENT_DATA = data.postulantes;
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  aceptar(application: Application) {
    this.data.aceptado = application;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rechazar(user:User) {
    this.solicitudSrv.putRechazarSolicitante(user._id, this.data.publicationId).subscribe(
      res => {
        this.utilsService.notificacion('Usuario Rechazado!', '');
        // this.refrescarSolicitud();
      },
      error => {
        console.log(error);
      });

  }

}





