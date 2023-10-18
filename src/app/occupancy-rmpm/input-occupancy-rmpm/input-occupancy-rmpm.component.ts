import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
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
    totalItems: this.rmpmViewGroupApi.length,
  };
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
    
  }
  ngOnInit(){
    this.spinner.show();
    forkJoin(
      this.apiService.getRmpmOccupancyView(),
      this.apiService.getRmpmOccupancyViewGroup()
    ).subscribe(
      (res) => {
        this.rmpmViewApi = res[0];
        this.rmpmViewGroupApi = res[1];
        // console.log(res[1]);
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.alertService.onCallAlert('Data Cannot Loaded!',AlertType.Error)
      }
    );
  }

  deleteRmpm(params:any) {
    this.apiService.deleteRmpm(params).subscribe(
      (data) => {
        // console.log(data);
        this.alertService.onCallAlert('Delete Row Success!', AlertType.Success);
        this.ngOnInit()
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Delete Row Failed!', AlertType.Error);
      }
    );
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
}
