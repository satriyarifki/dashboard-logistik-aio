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
import { AuthService } from 'src/app/services/auth/auth.service';

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
  @ViewChild('InputList') inputList!: ElementRef;

  //TOOLTIP BOOL
  tooltipLogin: Boolean = false;
  tooltipHome: Boolean = false;
  tooltipDropdown: Boolean = false;
  tooltipDropdownInput: Boolean = false;
  tooltipLink: Boolean = false;
  tooltipToggle: Boolean = false;
  userBool: Boolean = false;

  dropdown: Boolean = false;
  dropdownInput: Boolean = false;
  bounce: any;
  swing: any;
  loading = false;
  employee: any;

  //RESPONSIVE BOOL
  sidebarBool: Boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private eref: ElementRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.dropdown = false;
        this.userBool = false;
        // console.log('Route change Start');
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
        // console.log('Route change End');
      }
    });
    if (authService.getUser().length > 0) {
      this.employee = authService.getUser()[0];
    }
    console.log(this.employee);
  }

  overLogin() {
    // console.log('lo');

    this.tooltipLogin = true;
  }
  leaveLogin() {
    this.tooltipLogin = false;
  }
  overToggle(status: any) {
    if (status == 1) {
      this.tooltipToggle = true;
    } else {
      this.tooltipToggle = false;
    }
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
  onAuthCheck() {
    // if (this.authService.getToken() != null) {
    //   return false;
    // }
    if (this.authService.getCookie() != null) {
      return false;
    }
    return true;
  }
  signOut() {
    this.authService.signOut();
    // this.alertService.onCallAlert('Log Out Sucessful!', AlertType.Success)
    this.router.navigate(['/login']);
  }
  userDropdown() {
    this.userBool = !this.userBool;
    console.log(this.authService.getCookie());
    console.log(this.authService.getUser());
  }
  changeSidebarBool() {
    this.sidebarBool = !this.sidebarBool;
    // console.log(this.sidebarBool);
  }
  leaveDropdown() {
    this.tooltipDropdown = false;
  }
  overDropdownInput() {
    if (!this.dropdownInput) {
      this.tooltipDropdownInput = true;
    }
  }
  leaveDropdownInput() {
    this.tooltipDropdownInput = false;
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
  clickDropdownInput() {
    this.dropdownInput = !this.dropdownInput;
    if (this.dropdownInput) {
      this.tooltipDropdownInput = false;
    }
  }
  falseAll(event: any) {
    // console.log(this.menuList.nativeElement);
    // console.log(event.target);

    if (!this.menuList.nativeElement.contains(event.target) && this.dropdown) {
      this.dropdown = false;
    }
    if (
      !this.inputList.nativeElement.contains(event.target) &&
      this.dropdownInput
    ) {
      this.dropdownInput = false;
    }
  }
}
