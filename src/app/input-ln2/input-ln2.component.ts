import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2',
  templateUrl: './input-ln2.component.html',
  styleUrls: ['./input-ln2.component.css']
})
export class InputLn2Component {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  itemPerPage = 10;
  createModal = false
  arrivalBool = true
  dateReport = '2023-01-22'

  //API
  arrivalAll: any[] = [];
  reportLnAll: any[] = [];

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

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService){
    forkJoin(
      this.apiService.getLn2ArrivalAll(),
      apiService.getReportLn2All(),
      this.apiService.getArrivalLn2All(),
    ).subscribe(
      ([ln2,report, arrival]) => {
        this.arrivalAll = arrival;
        this.reportLnAll = report;
        console.log(this.arrivalAll);
        // console.log(this.fleetSukabumi.within_time);

        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  filterReportByDay(){
    return this.reportLnAll.filter(data => data.date == this.dateReport).reverse()
  }
  

  changeCreateModal(behav: any){
    
    this.createModal = behav
  }
}
