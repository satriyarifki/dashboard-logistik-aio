import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
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
  host: { '(document:click)': 'falseAll($event)' },
})
export class SidebarComponent {
  @ViewChild('MenuList') menuList!: ElementRef;
  tooltipHome: Boolean = false;
  tooltipDropdown: Boolean = false;
  tooltipLink: Boolean = false;
  dropdown: Boolean = false;
  bounce: any;
  swing: any;
  loading = false;

  constructor(public router: Router, private eref: ElementRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.dropdown = false;
        // console.log('Route change Start');
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
        // console.log('Route change End');
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
  falseAll(event: any) {
    // console.log(this.menuList.nativeElement);
    // console.log(event.target);

    if (!this.menuList.nativeElement.contains(event.target) && this.dropdown) {
      this.dropdown = false;
    }
  }
}
