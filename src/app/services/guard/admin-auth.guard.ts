import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private alertService:AlertService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token = this.authService.getCookie();
      var user = this.authService.getUser()
      if (token != null && (user[0].role == 1 || user[0].role == -1)) {
        return true;
      } else {
        this.alertService.onCallAlert('Access denied for this user!',AlertType.Warning)
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
