import { Component } from '@angular/core';
import { MatProgressBar} from '@angular/material/progress-bar';
import { Spinkit } from 'ng-http-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeroForPets';

  showLoader: boolean;

  public spinkit = Spinkit; 
  public matProgressbar = MatProgressBar;

  constructor() {

   }

  ngOnInit() {
  }




  

}
