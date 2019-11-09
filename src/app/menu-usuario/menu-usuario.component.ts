import { UsuarioService } from './../services/usuario.service';
import { UtilsService } from '../services/utils.service';
import { StorageService } from '../services/storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  @Input() snav: any;

  uActual: User;

  modoRefugio: Boolean;
  
  constructor(
    private usuarioService: UsuarioService,
    private utilsService: UtilsService,
    private storageService: StorageService) {
    this.uActual = this.storageService.getCurrentUser();
    this.modoRefugio = this.usuarioService.esModoRefugio();
   }

  ngOnInit() {
  }

  verPerfil(){
    this.snav.toggle();
    this.utilsService.irA("/h4p/perfil-usuario");
  }

  public signOut() {
    this.storageService.singOut();
  }

}
