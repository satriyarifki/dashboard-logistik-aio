import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-input-ln2',
  templateUrl: './input-ln2.component.html',
  styleUrls: ['./input-ln2.component.css'],
})
export class InputLn2Component {
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  searchInputKaryawan: any;
  itemPerPage = 10;
  itemPerPageKaryawan = 7;
  createModal = false;
  arrivalBool = true;
  karyawanCreateBool = false;
  karyawanEditBool = false;
  dateReport = new Date().toISOString().slice(0, 10);

  //API
  arrivalAll: any[] = [];
  reportLnAll: any[] = [];
  karyawanAll: any[] = [];
  array: any[] = [];
  userData:any

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
  configKaryawan = {
    id: 'customKaryawan',
    itemsPerPage: this.itemPerPageKaryawan,
    currentPage: 1,
    totalItems: this.karyawanAll.length,
  };

  formKar = new FormGroup({
    nik: new FormControl('',[Validators.required]),
    nama: new FormControl('',[Validators.required]),
    bagian: new FormControl('',[Validators.required]),
    company: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required])
  })

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // console.log(this.authService.getUser()[0].role);
    this.userData = this.authService.getUser()[0]
    // console.log(this.userData);
    
    
    forkJoin(
      this.apiService.getReportLn2All(this.dateReport),
      this.apiService.getArrivalLn2Group(),
      this.apiService.getKaryawan()
    ).subscribe(
      ([report, arrival,karyawan]) => {
        this.arrivalAll = arrival;
        this.reportLnAll = report;
        this.karyawanAll = karyawan
        console.log(this.arrivalAll);
        
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
  deleteCheckLevel(date:any,jam:any) {
    this.apiService.deleteCheckLn2(date,jam).subscribe(
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
  changeItemPerPageSelectKaryawan(value: any) {
    this.configKaryawan.itemsPerPage = value;
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

      // console.log(arr);
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

  get fKar(){
    return this.formKar.value
  }
  setFormKar(name:'nik'|'nama'|'bagian'|'company'|'status',value:any){
    this.formKar.controls[name].setValue(value)
    if (name == 'nik' && value != '') {
      console.log('dis');
      
      this.formKar.controls[name].disable()
    } else if (name == 'nik' && value == '') {
      console.log('end');
      this.formKar.controls[name].enable()
    }
    
  }

  changeKaryawanCreateModal(id:number){
    if (id != 0) {
      this.karyawanCreateBool = true
    } else {
      this.karyawanCreateBool = false
      this.setFormKar('nik','')
      this.setFormKar('nama','')
      this.setFormKar('bagian','')
      this.setFormKar('company','')
      this.setFormKar('status','')
    }
  }
  changeKaryawanEditModal(id:number,item:any){
    if (id != 0) {
      this.setFormKar('nik',item.nik)
      this.setFormKar('nama',item.nama)
      this.setFormKar('bagian',item.bagian)
      this.setFormKar('company',item.company)
      this.setFormKar('status',item.status)
      this.karyawanEditBool = true
    } else {
      this.karyawanEditBool = false
      this.setFormKar('nik','')
      this.setFormKar('nama','')
      this.setFormKar('bagian','')
      this.setFormKar('company','')
      this.setFormKar('status','')
    }
  }

  onCreateKar(){
    this.apiService.postKaryawanCreate(this.fKar).subscribe(data=>{
      // console.log(data);
      this.alertService.onCallAlert('Create Karyawan Success!',AlertType.Success)
      this.ngOnInit()
      this.changeKaryawanCreateModal(0)
    }, err => {
      console.log(err);
      this.alertService.onCallAlert('Create Karyawan Failed!',AlertType.Error)
    })
  }
  onEditKar(){
    this.formKar.controls['nik'].enable()
    
    this.apiService.postKaryawanEdit(this.fKar).subscribe(data=>{
      // console.log(data);
      this.alertService.onCallAlert('Edit Karyawan Success!',AlertType.Success)
      this.ngOnInit()
      this.changeKaryawanEditModal(0,null)
    }, err => {
      console.log(err);
      this.alertService.onCallAlert('Edit Karyawan Failed!',AlertType.Error)
    })
  }

  deleteKar(params:any) {
    this.apiService.deleteKaryawanCreate(params).subscribe(
      (data) => {
        // console.log(data);
        this.alertService.onCallAlert('Delete Karyawan Success!', AlertType.Success);
        this.ngOnInit()
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Delete Karyawan Failed!', AlertType.Error);
      }
    );
  }
}
