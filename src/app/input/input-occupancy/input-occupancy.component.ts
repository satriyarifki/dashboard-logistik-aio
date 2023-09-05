import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-occupancy',
  templateUrl: './input-occupancy.component.html',
  styleUrls: ['./input-occupancy.component.css'],
})
export class InputOccupancyComponent {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  itemPerPage = 10;

  //API
  whOccup: any[] = [];
  fleetSukabumi: any[] = [];

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.whOccup.length,
  };
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.Service();
  }
  Service() {
    this.spinner.show();
    forkJoin(
      this.apiService.getWarehouseOccupancyAll(),
    ).subscribe(
      ([wh]) => {
        this.whOccup = wh;
        console.log(wh);
        
        // console.log(this.fleetKejayan);
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
}
