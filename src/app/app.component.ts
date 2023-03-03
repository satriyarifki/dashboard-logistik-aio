import { Component } from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { slideInRouteVar } from './animations';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [],
})
export class AppComponent {
  title = 'logistik-dashboard';
  timenow: any;
  constructor(
    private contexts: ChildrenOutletContexts,
    public loader: LoaderService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // loader.setLoading(true);
        // console.log(loader.getLoading());

        // console.log('Route change Start');
      }
      if (event instanceof NavigationEnd) {
      }
    });
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
