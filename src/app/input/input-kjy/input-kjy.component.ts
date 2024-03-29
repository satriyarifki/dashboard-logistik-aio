import { Component, ViewChild } from '@angular/core';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { zoomInOutVar, zoomInVar } from 'src/app/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-kjy',
  templateUrl: './input-kjy.component.html',
  styleUrls: ['./input-kjy.component.css'],
  animations: [zoomInOutVar],
})
export class InputKjyComponent {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  itemPerPage = 10;
  createModal = false

  //API
  fleetKejayan: any[] = [];
  fleetSukabumi: any[] = [];

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.fleetKejayan.length,
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
      this.apiService.getFleetKejayanAll(),
      this.apiService.getFleetSukabumiAll()
    ).subscribe(
      ([kejayan, sukabumi]) => {
        this.fleetKejayan = kejayan;
        this.fleetSukabumi = sukabumi;
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

  

  changeCreateModal(behav: any){
    
    this.createModal = behav
  }
}
