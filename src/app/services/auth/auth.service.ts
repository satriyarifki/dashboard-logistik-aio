import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';

var authUrl = environment.baseApi + 'auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router,private alertService:AlertService) {}

  setCookie(cValue: string, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = TOKEN_KEY + '=' + cValue + '; ' + expires + '; path=/';
  }
  deleteCookie() {
    document.cookie =
      TOKEN_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }
  getCookie() {
    const name = TOKEN_KEY + '=';
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }
  login(nik: string, password: string): Observable<any> {
    return this.http.post(
      authUrl + 'login',
      {
        nik,
        password,
      },
      httpOptions
    );
  }

  signOut(): void {
    window.localStorage.clear();
    this.deleteCookie();
    // window.location.reload();
    this.router.navigate(['/']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this.setCookie(token, 1);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else if(!user && this.getToken()) {
      this.alertService.onCallAlert('Your session out of time, please re-Login!', AlertType.Info)
      this.signOut();
    }

    return {};
  }
}
