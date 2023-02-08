import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  dropdown: Boolean = false;
  dropdownRes: Boolean = false;
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
