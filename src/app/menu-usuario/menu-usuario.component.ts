import { StorageService } from '../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  uActual: User;
  constructor(private storageService: StorageService) {
    this.uActual = this.storageService.getCurrentUser();
   }

  ngOnInit() {
  }

  public signOut() {
    this.storageService.singOut();
  }

}
