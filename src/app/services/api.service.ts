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
  updateSukabumiTrucking(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/trucking/' + id, body);
  }
  updateSukabumiDelivery(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/delivery/' + id, body);
  }
  updateSukabumiOnTime(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/ontime/' + id, body);
  }
  updateSukabumiDamage(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/damage/' + id, body);
  }
  updateSukabumiPerfect(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/perfect/' + id, body);
  }
  updateSukabumiHandling(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fleet-skb/handling/' + id, body);
  }

  //DELETE
  deleteArrivalLn2(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'del/arrival/' + id);
  }
  deleteCheckLn2(date: any, jam: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'del/check-ln2/' + date + '/' + jam);
  }

  // WAREHOUSE
  getWarehouseOccupancy(): Observable<any> {
    return this.http.get(this.baseUrl + 'warehouse-occu');
  }
  getWarehouseOccupancyById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'warehouse-occu/' + id);
  }
  getWarehouseOccupancyAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'warehouse-occu-all');
  }
  updateWarehouseOccupancy(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'warehouse-occu-update/' + id, body);
  }

  //CHECK LN2
  getLn2ArrivalAll(): Observable<any> {
    return this.http.get(this.baseUrl + 'check-ln2');
  }
  getArrivalLn2All(): Observable<any> {
    return this.http.get(this.baseUrl + 'arrival-ln2');
  }
  getArrivalLn2DateSupplier(date :any,supplierId:any): Observable<any> {
    return this.http.get(this.baseUrl + 'arrival-ln2/' + date+'/' +supplierId);
  }
  getArrivalLn2Group(): Observable<any> {
    return this.http.get(this.baseUrl + 'arrival-ln2-group');
  }
  getReportLn2All(date: any): Observable<any> {
    return this.http.get(this.baseUrl + 'report-ln2/' + date);
  }
  getReportLn2Range(date: any): Observable<any> {
    return this.http.get(
      this.baseUrl + 'report-ln2-range/' + date.start + '/' + date.end
    );
  }
  getArrivalLn2ById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'arrival-ln2/' + id);
  }
  getPengisianLn2ByArrivalId(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'pengisian-ln2/' + id);
  }
  getKaryawan(): Observable<any> {
    return this.http.get(this.baseUrl + 'ln2-karyawan');
  }
  postKaryawanCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'ln2-karyawan/create', body);
  }
  postKaryawanEdit(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'ln2-karyawan/update', body);
  }
  deleteKaryawanCreate(nik: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'ln2-karyawan/delete/' + nik);
  }
  getSupplier(): Observable<any> {
    return this.http.get(this.baseUrl + 'ln2-supplier');
  }
  getTanki(): Observable<any> {
    return this.http.get(this.baseUrl + 'ln2-tanki');
  }
  postArrivalCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'arrival-create', body);
  }
  postArrivalEdit(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'arrival-edit/' + id, body);
  }
  postArrivalAirCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'arrival-create/air', body);
  }
  postArrivalFillEdit(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'fill-ln2/edit/' + id, body);
  }
  postCheckLevelCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'level-ln2', body);
  }
  postCheckLevelEdit(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'level-ln2/update', body);
  }
  getCheckLevelNewest(): Observable<any> {
    return this.http.get(this.baseUrl + 'check-level/newest');
  }

  //RMPM Occupancy
  getRmpmOccupancy(): Observable<any> {
    return this.http.get(this.baseUrl + 'rmpm');
  }
  getRmpmOccupancyByDateTime(params: any): Observable<any> {
    return this.http.get(
      this.baseUrl + 'rmpm/' + params.date + '/' + params.time
    );
  }
  getRmpmOccupancyView(): Observable<any> {
    return this.http.get(this.baseUrl + 'rmpm-view');
  }
  getRmpmOccupancyViewLast(): Observable<any> {
    return this.http.get(this.baseUrl + 'rmpm-view/last');
  }
  getRmpmOccupancyViewGroup(): Observable<any> {
    return this.http.get(this.baseUrl + 'rmpm-view/group');
  }
  getRmpmStorage(): Observable<any> {
    return this.http.get(this.baseUrl + 'rmpm/storage');
  }
  postRmpmCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'rmpm-create', body);
  }
  postRmpmStorageCreate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'rmpm-create/storage', body);
  }
  postRmpmStorageUpdate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'rmpm-update/storage', body);
  }
  postRmpmUpdate(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'rmpm-update', body);
  }
  deleteRmpm(params: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'rmpm-del/' + params.date + '/' + params.time
    );
  }
  deleteRmpmStorage(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'rmpm-del-storage/' + id);
  }

  //BUDGET FACTORY
  getBudgetShipping(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping');
  }
  getBudgetShippingMonthlist(from:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping-monthlist/'+from);
  }
  getBudgetShippingKjy(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping-kjy');
  }
  getBudgetShippingKjyYearMonth(yearmonth:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping-kjy/'+yearmonth);
  }
  getBudgetShippingSkb(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping-skb');
  }
  getBudgetShippingSkbYearMonth(yearmonth:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/shipping-skb/'+yearmonth);
  }
  getBudgetFactory(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory');
  }
  getBudgetFactoryYearList(params:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory-yearlist/' + params);
  }
  getBudgetFactoryKjy(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory-kjy');
  }
  getBudgetFactoryKjyByyear(year:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory-kjy/' + year);
  }
  getBudgetFactorySkb(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory-skb');
  }
  getBudgetFactorySkbByYear(year:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/factory-skb/' + year);
  }
  getBudgetHandling(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/handling');
  }
  getBudgetHandlingByYear(year:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/handling/' + year);
  }
  getBudgetOverhead(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/overhead');
  }
  getBudgetOverheadByYear(year:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/overhead/' + year);
  }
  getBudgetOverHandYearList(params:any): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/overhand-yearlist/' + params);
  }
  getBudgetSummary(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/summary');
  }
  getBudgetFohDistribution(): Observable<any> {
    return this.http.get(this.baseUrl + 'budget/foh');
  }

  postBudgetFactory(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'budget/factory',body);
  }
  postBudgetOverHand(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'budget/overhand',body);
  }

  updateBudgetOverHand(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'budget/overhead',body);
  }
  updateBudgetFactory(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'budget/factory',body);
  }
  updateBudgetShipping(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'budget/shipping',body);
  }
  updateBudgetSummary(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'budget/summary',body);
  }
  updateBudgetFohDistribution(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'budget/foh',body);
  }

  deleteBudgetFactory(params: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'budget/factory/' + params.year + '/' + params.from
    );
  }
  deleteBudgetOverHand(params: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'budget/overhand/' + params.year + '/' + params.type
    );
  }
}
