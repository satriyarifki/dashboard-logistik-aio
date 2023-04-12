import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

var baseApi = environment.baseApi;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = baseApi + 'api/';

  constructor(private http: HttpClient) {}
  getTempPocari(): Observable<any> {
    return this.http.get(this.baseUrl + 'temp-pocari');
  }
  getTempSoyjoy(): Observable<any> {
    return this.http.get(this.baseUrl + 'temp-soyjoy');
  }
  getFleetKejayan(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-kejayan');
  }
  getFleetSukabumi(): Observable<any> {
    return this.http.get(this.baseUrl + 'fleet-sukabumi');
  }
}
