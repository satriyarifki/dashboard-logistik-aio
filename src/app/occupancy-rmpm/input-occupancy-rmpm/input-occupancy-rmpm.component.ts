import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  searchInputStorage: any;
  itemPerPage = 10;
  itemPerPageStorage = 7;
  storageEditBool = false;
  storageId:number = 0;

  //API
  rmpmViewApi: any[] = [];
  rmpmViewGroupApi: any[] = [];
  rmpmStorageApi: any[] = [];

  //Form
  formEdit = new FormGroup({
    id: new FormControl(0,[Validators.required]),
    name: new FormControl('',[Validators.required]),
    min_temp: new FormControl(null),
    max_temp: new FormControl(0,[Validators.required]),
    capacity: new FormControl(0,[Validators.required])
  })

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
    private spinner: NgxSpinnerService
  ) {
    
  }
  ngOnInit(){
    this.spinner.show();
    forkJoin(
      this.apiService.getRmpmOccupancyView(),
      this.apiService.getRmpmOccupancyViewGroup(),
      this.apiService.getRmpmStorage(),
    ).subscribe(
      (res) => {
        this.rmpmViewApi = res[0];
        this.rmpmViewGroupApi = res[1];
        this.rmpmStorageApi = res[2]
        console.log(res[2]);
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

  onSave(){
    this.apiService.postRmpmStorageUpdate(this.fEdit).subscribe(data=>{
      console.log(data);
      this.alertService.onCallAlert('Edit Success!',AlertType.Success)
      this.ngOnInit()
      this.storageEditBool = false
    })
  }

  get fEdit(){
    return this.formEdit.value
  }
  setFormEdit(name:'id'|'name'|'min_temp'|'max_temp'|'capacity',value:any){
    this.formEdit.controls[name].setValue(value)
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
  changeItemPerPageSelectStorage(value: any) {
    this.configStorage.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  storageById(id:number){
    return this.rmpmStorageApi.filter(data=>data.id == id)[0]
  }

  changeStorageModal(id:number,item:any){
    console.log(id);
    
    if (id != 0) {
      this.setFormEdit('id',item.id)
      this.setFormEdit('name',item.name)
      this.setFormEdit('min_temp',item.min_temp)
      this.setFormEdit('max_temp',item.max_temp)
      this.setFormEdit('capacity',item.capacity)
      this.storageId = id;
      this.storageEditBool = true
      console.log(this.fEdit['capacity']);
      
      // console.log(item);
      
    } else {
      this.storageId = 0;
      this.storageEditBool = false
      this.fEdit['id'] = 0
      this.fEdit['name'] = ''
      this.fEdit['min_temp'] = null
      this.fEdit['max_temp'] = 0
      this.fEdit['capacity'] = 0
    }
  }
}
