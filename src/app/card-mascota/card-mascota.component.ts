import { Pet } from './../model/pet.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-mascota',
  templateUrl: './card-mascota.component.html',
  styleUrls: ['./card-mascota.component.scss']
})
export class CardMascotaComponent implements OnInit {

  @Input()
  pet : Pet;

  @Input()
  isOwner: Boolean;
  
  constructor() {
  }

  ngOnInit() {
  }

}
