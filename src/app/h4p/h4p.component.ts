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
  private _mobileQueryListener: () => void;

  constructor(private router: Router, private utils: UtilsService) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  salir() {
    this.router.navigate(["/"]);
  }

  cargarNuevaMascota(){
    // this.utils.notificacion("prueba", "Cerrar");
  }
}
