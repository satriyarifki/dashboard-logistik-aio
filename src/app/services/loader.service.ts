import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;
  loadUpdate: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getCurrentDate(time: any) {
    setInterval(() => {
      time = new Date();
    }, 1000);
  }

  setLoading(loading: boolean) {
    // console.log('set');
    this.loading = loading;
    this.loadUpdate.emit(this.loading);
  }

  getLoading(): boolean {
    return this.loading;
  }
}
