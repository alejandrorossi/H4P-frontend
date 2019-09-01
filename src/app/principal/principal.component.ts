import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../service/mascotas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  mascotas: any[]

  constructor(private router: Router, private mascotasService: MascotasService) {
    this.getTemplatesPublicos();
  }

  ngOnInit() {

  }

  salir() {
    this.router.navigate(["/"]);
  }

  getTemplatesPublicos() {
    this.mascotas = this.mascotasService.getAllMascotasSinAdoptar();
    // this.mascotasService.getAllMascotasSinAdoptar().subscribe(res => {
    //     console.log(res)
    //     this.mascotas = res.result;
    //   });
  }




}
