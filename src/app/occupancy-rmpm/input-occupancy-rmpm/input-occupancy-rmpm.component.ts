import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';

@Component({
  selector: 'app-input-occupancy-rmpm',
  templateUrl: './input-occupancy-rmpm.component.html',
  styleUrls: ['./input-occupancy-rmpm.component.css'],
})
export class InputOccupancyRmpmComponent {
  //TOOLS
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  searchInputStorage: any;
  itemPerPage = 10;
  itemPerPageStorage = 7;
  storageCreateBool = false;
  storageEditBool = false;
  storageId: number = 0;

  //API
  rmpmViewApi: any[] = [];
  rmpmViewGroupApi: any[] = [];
  rmpmStorageApi: any[] = [];
  userData: any;

  //Form
  formEdit = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    min_temp: new FormControl(null),
    max_temp: new FormControl(0, [Validators.required]),
    capacity: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

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
  configStorage = {
    id: 'customStorage',
    itemsPerPage: this.itemPerPageStorage,
    currentPage: 1,
    totalItems: this.rmpmStorageApi.length,
  };
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private deleteService: DeleteApiService,
    private router: Router
  ) {
    this.userData = authService.getUser()[0];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {
    this.spinner.show();
    forkJoin(
      this.apiService.getRmpmOccupancyView(),
      this.apiService.getRmpmOccupancyViewGroup(),
      this.apiService.getRmpmStorage()
    ).subscribe(
      (res) => {
        this.rmpmViewApi = res[0];
        this.rmpmViewGroupApi = res[1];
        this.rmpmStorageApi = res[2];
        // console.log(res[2]);

        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.alertService.onCallAlert('Data Cannot Loaded!', AlertType.Error);
      }
    );
  }
  deleteRmpmStorage(data: any) {
    // console.log(par);
    const fun = 'this.apiService.deleteRmpmStorage(' + data.id + ')';
    this.deleteService.onCallDelete({ dataName: data.name, func: fun });
  }
  deleteRmpm(data: any) {
    const fun =
      'this.apiService.deleteRmpm(' +
      JSON.stringify({ date: data.date, time: data.time }) +
      ')';
    this.deleteService.onCallDelete({
      dataName: data.date + ', ' + data.time,
      func: fun,
    });
  }

  // deleteRmpm(params:any) {
  //   this.apiService.deleteRmpm(params).subscribe(
  //     (data) => {
  //       // console.log(data);
  //       this.alertService.onCallAlert('Delete Row Success!', AlertType.Success);
  //       this.ngOnInit()
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.alertService.onCallAlert('Delete Row Failed!', AlertType.Error);
  //     }
  //   );
  // }
  // deleteRmpmStorage(params:any) {
  //   this.apiService.deleteRmpmStorage(params).subscribe(
  //     (data) => {
  //       // console.log(data);
  //       this.alertService.onCallAlert('Delete Row Success!', AlertType.Success);
  //       this.ngOnInit()
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.alertService.onCallAlert('Delete Row Failed!', AlertType.Error);
  //     }
  //   );
  // }

  onSave() {
    this.apiService.postRmpmStorageUpdate(this.fEdit).subscribe(
      (data) => {
        // console.log(data);
        this.alertService.onCallAlert(
          'Edit Storage Success!',
          AlertType.Success
        );
        this.ngOnInit();
        this.storageEditBool = false;
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Edit Storage Failed!', AlertType.Error);
      }
    );
  }
  onCreate() {
    this.apiService.postRmpmStorageCreate(this.fEdit).subscribe(
      (data) => {
        // console.log(data);
        this.alertService.onCallAlert('Create Success!', AlertType.Success);
        this.ngOnInit();
        this.storageCreateBool = false;
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert(
          'Create Storage Failed!',
          AlertType.Error
        );
      }
    );
  }

  get fEdit() {
    return this.formEdit.value;
  }
  setFormEdit(
    name: 'id' | 'name' | 'min_temp' | 'max_temp' | 'capacity' | 'type',
    value: any
  ) {
    this.formEdit.controls[name].setValue(value);
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  changeItemPerPageSelectStorage(value: any) {
    this.configStorage.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  storageById(id: number) {
    return this.rmpmStorageApi.filter((data) => data.id == id)[0];
  }

  changeStorageEditModal(id: number, item: any) {
    console.log(id);

    if (id != 0) {
      this.setFormEdit('id', item.id);
      this.setFormEdit('name', item.name);
      this.setFormEdit('min_temp', item.min_temp);
      this.setFormEdit('max_temp', item.max_temp);
      this.setFormEdit('capacity', item.capacity);
      this.setFormEdit('type', item.type);
      this.storageId = id;
      this.storageEditBool = true;
      console.log(this.fEdit['capacity']);

      // console.log(item);
    } else {
      this.storageId = 0;
      this.storageEditBool = false;
      this.setFormEdit('id', 0);
      this.setFormEdit('name', '');
      this.setFormEdit('min_temp', null);
      this.setFormEdit('max_temp', 0);
      this.setFormEdit('capacity', 0);
    }
  }
  changeStorageCreateModal(id: number) {
    if (id != 0) {
      this.storageCreateBool = true;
    } else {
      this.storageCreateBool = false;
      this.setFormEdit('id', 0);
      this.setFormEdit('name', '');
      this.setFormEdit('min_temp', null);
      this.setFormEdit('max_temp', 0);
      this.setFormEdit('capacity', 0);
    }
  }
}
