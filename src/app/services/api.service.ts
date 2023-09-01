import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

var baseApi = environment.baseApi;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = baseApi + 'api/';

  constructor(private http: HttpClient) {}
  // TEMPERATURE
  getTempPocari(): Observable<any> {
    return this.http.get(this.baseUrl + 'temp-pocari');
  }
  getTempSoyjoy(): Observable<any> {
    return this.http.get(this.baseUrl + 'temp-soyjoy');
  }

  // FLEET DISTRIBUTION
  getFleetKejayanAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-kjy-all');
  }
  getFleetKejayan(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-kjy');
  }
  getFleetKejayanById(date: any): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-kjy/' + date);
  }
  getFleetSukabumiAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-skb-all');
  }
  getFleetSukabumi(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-skb');
  }
  getFleetSukabumiById(date: any): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-skb/' + date);
  }
  getMonthKejayan(): Observable<any> {
    return this.http.get(this.baseUrl + 'month-kjy');
  }
  getMonthSukabumi(): Observable<any> {
    return this.http.get(this.baseUrl + 'month-skb');
  }

  updateKejayanTrucking(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/trucking/' + id, body);
  }
  updateKejayanDelivery(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/delivery/' + id, body);
  }
  updateKejayanOnTime(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/ontime/' + id, body);
  }
  updateKejayanDamage(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/damage/' + id, body);
  }
  updateKejayanPerfect(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/perfect/' + id, body);
  }
  updateKejayanHandling(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-kjy/handling/' + id, body);
  }

  // WAREHOUSE
  getWarehouseOccupancy(): Observable<any> {
    return this.http.get(this.baseUrl + 'warehouse-occu');
  }
}
