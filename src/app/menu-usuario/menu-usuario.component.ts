import { StorageService } from './../service/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  public signOut(){
    this.storageService.singOut();
  }

}
