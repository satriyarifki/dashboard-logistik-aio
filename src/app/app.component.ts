import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInRouteVar } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [],
})
export class AppComponent {
  title = 'logistik-dashboard';
  timenow: any;
  constructor(private contexts: ChildrenOutletContexts) {
    this.getCurrentDate;
  }

  getCurrentDate() {
    setInterval(() => {
      this.timenow = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }

  prepareRoute(outlet: RouterOutlet) {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
