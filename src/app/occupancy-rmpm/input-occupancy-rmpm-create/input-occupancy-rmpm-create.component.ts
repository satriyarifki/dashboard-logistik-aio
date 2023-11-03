import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-occupancy-rmpm-create',
  templateUrl: './input-occupancy-rmpm-create.component.html',
  styleUrls: ['./input-occupancy-rmpm-create.component.css'],
})
export class InputOccupancyRmpmCreateComponent {
  form!: FormGroup;
  items!: FormArray;

  //API
  rmpmStorageApi: any[] = [];

  //TOOLS
  dateNow = new Date().toISOString().slice(0, 10);
  dataAlready = false

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router:Router,
    private spinner:NgxSpinnerService
  ) {
    spinner.show()
    this.initialForm();
    forkJoin(apiService.getRmpmStorage()).subscribe((res) => {
      this.rmpmStorageApi = res[0];
      this.fillFormItems();
      // console.log(res[0;
      console.log(this.f);
      spinner.hide()
    },(err)=>{
      console.log(err);
      spinner.hide()
      alertService.onCallAlert('Data Cannot Loaded!',AlertType.Error)
    });
  }

  initialForm() {
    this.form = this.formBuilder.group({
      date: [this.dateNow, Validators.required],
      time: ['', Validators.required],
      items: this.formBuilder.array([]),
    });
  }
  get f() {
    return this.form.value;
  }
  get getItems() {
    // console.log((this.form.controls['items'] as FormArray).controls);

    return this.form.controls['items'] as FormArray;
  }
  fillFormItems() {
    this.items = this.form.get('items') as FormArray;
    this.rmpmStorageApi.forEach((element) => {
      this.items.push(
        this.formBuilder.group({
          storageId: [element.id],
          used: [0, Validators.required],
        })
      );
    });
  }

  async onSubmit() {
    // console.log(this.f);
    
    if (this.form.invalid) {
      // console.log(this.form);
      
      this.alertService.onCallAlert('Date or Jam cannot blank!',AlertType.Warning)
      return;
    }
    
    let dataAlready = false
    this.apiService.getRmpmOccupancyByDateTime({date:this.f.date,time:this.f.time+':00'}).subscribe(data=>{
      if(data.length == 0){
        this.apiService.postRmpmCreate(this.f).subscribe(
          (data) => {
            this.alertService.onCallAlert('Create Successfuly!', AlertType.Success);
            this.router.navigate(['input-rmpm-occupancy'])
          },
          (err) => {
            console.log(err);
            this.alertService.onCallAlert('Create Failed, Check Your Connection!',AlertType.Error)
          }
        );
      } else {
        this.alertService.onCallAlert('Datetime booked,Choose another date or time!',AlertType.Warning)
      }
    }, err => {
      this.alertService.onCallAlert('Create Failed, Check Your Connection!',AlertType.Error)
    })
    // console.log(dataAlready);
    
    // if (dataAlready) {
    //   this.alertService.onCallAlert('Choose another date and time!',AlertType.Warning)
    //   dataAlready = false
    //   return
    // }

   
  }

  checkOccupancy(){
    this.apiService.getRmpmOccupancyByDateTime({date:this.f.date,time:this.f.time+':00'}).subscribe(data=>{
      if(data.length != 0){
        // console.log(data);
        this.dataAlready = true
      }
    })
    
  }

  filterStorageByType(params:String){
    return this.rmpmStorageApi.filter(data=>data.type == params)
  }
}
