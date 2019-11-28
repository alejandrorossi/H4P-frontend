import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-h4p',
  templateUrl: './h4p.component.html',
  styleUrls: ['./h4p.component.scss']
})
export class H4pComponent implements OnInit {

  esModoRefugio: Boolean;
  notifications: string[];
  nuevasNotificaciones: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private utilsService: UtilsService,
    private storageService: StorageService) {
    this.esModoRefugio = this.usuarioService.esModoRefugio();
    this.updateNotifications();
  }

  ngOnInit() {
  }

  irAPrincipal() {
    this.utilsService.irA('h4p/principal');
  }

  irCargarMascota() {
    this.utilsService.irA('/h4p/cargar-mascota');
  }

  irAdministracion() {
    this.utilsService.irA('/h4p/administracion');
  }

  updateNotifications() {
    const user = this.storageService.getCurrentUser();

    this.usuarioService.getNotificaciones(user).subscribe(
      res => {
        if (res.data.length < 5) {
          this.notifications = res.data;
        } else {
          this.notifications = res.data.slice(Math.max(res.data.length - 5)).reverse();
        }
      }
    );

  }


}
