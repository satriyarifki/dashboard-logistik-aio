import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-occupancy-rmpm',
  templateUrl: './input-occupancy-rmpm.component.html',
  styleUrls: ['./input-occupancy-rmpm.component.css'],
})
export class InputOccupancyRmpmComponent {
  //TOOLS
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  itemPerPage = 10;

  //API
  rmpmViewApi: any[] = [];
  rmpmViewGroupApi: any[] = [];

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.rmpmViewApi.length,
  };
  constructor(private apiService: ApiService) {
    forkJoin(apiService.getRmpmOccupancyView(),apiService.getRmpmOccupancyViewGroup()).subscribe((res) => {
      this.rmpmViewApi = res[0];
      this.rmpmViewGroupApi = res[1];
      console.log(res[1]);
    });
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
}
