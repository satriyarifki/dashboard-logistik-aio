import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-occupancy-rmpm',
  templateUrl: './occupancy-rmpm.component.html',
  styleUrls: ['./occupancy-rmpm.component.css'],
})
export class OccupancyRmpmComponent {
  //TOOLS
  time: any;
  datetimeUpdate: any;

  //API
  occuLastApi: any[] = [];

  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  constructor(private apiService: ApiService,private spinner:NgxSpinnerService) {
    spinner.show()
    this.getCurrentDate();
    forkJoin(apiService.getRmpmOccupancyViewLast()).subscribe((data) => {
      this.occuLastApi = data[0];
      let d = new Date(this.occuLastApi[0]?.date)
      d.setHours(this.occuLastApi[0]?.time.slice(0,2))
      this.datetimeUpdate = d
      console.log(this.occuLastApi[0]);
      console.log(d);
      
      console.log(this.occuLastApi[0]?.time.slice(0,2));
      
      spinner.hide()
    },err => {
      console.log(err);
      spinner.hide()
    });
  }

  get soyjoyOccu() {
    return this.occuLastApi.filter(
      (data) =>
        data.type == 'Soyjoy' ||
        data.storageId == 14 ||
        data.storageId == 12 ||
        data.storageId == 13
    );
  }
  get pocariOccu() {
    return this.occuLastApi.filter(
      (data) =>
        data.type == 'Pocari' ||
        data.storageId == 15
    );
  }

  numberToPercent(used:number, cap:number){
    return (Number((used/cap))*100)
  }
}
