import { UtilsService } from './../service/utils.service';
import { StorageService } from './../service/storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  @Input() snav: any;

  uActual: User;
  
  constructor(
    private utilsService: UtilsService,
    private storageService: StorageService) {
    this.uActual = this.storageService.getCurrentUser();
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
