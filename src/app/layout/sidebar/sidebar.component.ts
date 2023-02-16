import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import {
  bounce,
  swing,
  slideInLeft,
  slideInDown,
  zoomIn,
  zoomOut,
} from 'ng-animate';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('ZoomInOutAnimation', [
      transition(':enter', useAnimation(zoomIn, { params: { timing: 0.25 } })),
      transition(':leave', useAnimation(zoomOut, { params: { timing: 0.25 } })),
    ]),
  ],
})
export class SidebarComponent {
  tooltipHome: Boolean = false;
  tooltipDropdown: Boolean = false;
  tooltipLink: Boolean = false;
  dropdown: Boolean = false;
  bounce: any;
  swing: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.dropdown = false;
        console.log('Route change detected');
      }
    });
  }

  overHome() {
    this.tooltipHome = true;
  }
  leaveHome() {
    this.tooltipHome = false;
  }
  overDropdown() {
    if (!this.dropdown) {
      this.tooltipDropdown = true;
    }
  }
  leaveDropdown() {
    this.tooltipDropdown = false;
  }
  overLink() {
    this.tooltipLink = true;
  }
  leaveLink() {
    this.tooltipLink = false;
  }
  clickDropdown() {
    this.dropdown = !this.dropdown;
    if (this.dropdown) {
      this.tooltipDropdown = false;
    }
  }
}
