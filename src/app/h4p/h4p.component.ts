import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../service/utils.service';


@Component({
  selector: 'app-h4p',
  templateUrl: './h4p.component.html',
  styleUrls: ['./h4p.component.scss']
})
export class H4pComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  // private _mobileQueryListener: () => void;

  constructor(private utilsService: UtilsService) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  irAPrincipal(){
    this.utilsService.irA('h4p/principal');
  }

  irCargarMascota(){
    this.utilsService.irA('/h4p/cargar-mascota');
  }

  irAdministracion(){
    this.utilsService.irA('/h4p/administracion');
  }

}
