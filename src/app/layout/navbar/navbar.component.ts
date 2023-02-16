import { Component } from '@angular/core';
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
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('ZoomInOutAnimation', [
      transition(':enter', useAnimation(zoomIn, { params: { timing: 0.25 } })),
      transition(':leave', useAnimation(zoomOut, { params: { timing: 0.25 } })),
    ]),
  ],
})
export class NavbarComponent {
  dropdown: Boolean = false;
  dropdownRes: Boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.dropdownRes = false;
        this.dropdown = false;
        console.log('Route change detected');
      }
    });
  }
  changeDropdown() {
    this.dropdown = !this.dropdown;
  }
  changeDropdownRes() {
    this.dropdownRes = !this.dropdownRes;
    if (this.dropdownRes == false && this.dropdown) {
      this.dropdown = !this.dropdown;
    }
  }
  mouseOver() {
    this.dropdownRes = true;
  }
  mouseLeave() {
    this.dropdownRes = false;
  }
}
