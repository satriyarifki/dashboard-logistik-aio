import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dummy = 'http://localhost:3000/';
  private coviduk =
    'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates';
  timenow: any;

  constructor(private http: HttpClient) {}
  getCurrentDate(timenow: any) {
    setInterval(() => {
      timenow = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }
  getTimeNow() {
    return this.timenow;
  }
  getDummy(): Observable<any> {
    return this.http.get(this.dummy + 'api/product');
  }
  getMock(): Observable<any> {
    return this.http.get(this.dummy + 'api/mock');
  }
  getMockSum(): Observable<any> {
    return this.http.get(this.dummy + 'api/mock/eq');
  }
}
