import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
Router;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  tooltipHome: Boolean = false;
  tooltipDropdown: Boolean = false;
  tooltipLink: Boolean = false;
  dropdown: Boolean = false;

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
  }
}
