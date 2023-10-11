import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2',
  templateUrl: './input-ln2.component.html',
  styleUrls: ['./input-ln2.component.css'],
})
export class InputLn2Component {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  itemPerPage = 10;
  createModal = false;
  arrivalBool = true;
  dateReport = new Date().toISOString().slice(0, 10);

  //API
  arrivalAll: any[] = [];
  reportLnAll: any[] = [];
  array: any[] = [];

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.arrivalAll.length,
  };

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    forkJoin(
      this.apiService.getReportLn2All(this.dateReport),
      this.apiService.getArrivalLn2All()
    ).subscribe(
      ([report, arrival]) => {
        this.arrivalAll = arrival;
        this.reportLnAll = report;

        // console.log(this.getCheckLevelByTanki('2023-09-19', '12:00:00', 'TB2'));
        // console.log(this.filterReportByDatetime('2023-09-19', '12:00:00'));
        // console.log(report);
        // console.log(new Date().toISOString().slice(0, 10));

        // console.log(this.fleetSukabumi.within_time);

        this.spinner.hide();
      },
      (err) => {
        console.log(err);

        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  deleteArrival(id: number) {
    this.apiService.deleteArrivalLn2(id).subscribe(
      (data) => {
        console.log(data);
        this.alertService.onCallAlert('Delete Success!', AlertType.Success);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Delete Failed!', AlertType.Error);
      }
    );
  }

  recallCheckLnService() {
    this.apiService.getReportLn2All(this.dateReport).subscribe(
      (data) => {
        this.reportLnAll = data;
        this.array = Object.entries(this.groupBy(this.reportLnAll, 'jam'));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  filterReportByDay() {
    return this.reportLnAll
      .filter((data) => data.date == this.dateReport)
      .reverse();
  }

  getCheckLevelByTanki(date: any, jam: any, tanki: any) {
    return this.reportLnAll.filter(
      (data) =>
        data.date == date && data.jam == jam && data.tanki.includes(tanki)
    )[0];
  }
  get distinctReport() {
    return this.reportLnAll.filter(
      (n, i, arr) => arr.findIndex((r) => r.jam === n.jam) === i
    );
  }
  filterReportByDatetime(date: any, time: any) {
    return this.reportLnAll.filter(
      (elem) => elem.date == date && elem.jam == time
    );
  }

  groupBy(array: any, key: any) {
    // Return the end result
    let i = 0;
    let arr: any[] = [];
    return array.reduce((result: any, currentValue: any) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      i += 1;
      // if (result == currentValue[key]) {
      //   arr[arr.length - 1].push(currentValue);
      // } else {
      //   arr.push({i : []});
      //   arr[arr.length - 1].push(currentValue);
      // }
      // result = currentValue[key];

      console.log(arr);
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );

      // console.log(result);

      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
    // console.log(arr);
    // return arr
  }

  changeCreateModal(behav: any) {
    this.createModal = behav;
  }
}
