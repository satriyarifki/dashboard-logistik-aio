import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-occupancy-rmpm-edit',
  templateUrl: './input-occupancy-rmpm-edit.component.html',
  styleUrls: ['./input-occupancy-rmpm-edit.component.css'],
})
export class InputOccupancyRmpmEditComponent {
  form!: FormGroup;
  items!: FormArray;

  params = this.actRoute.snapshot.queryParams;

  //API
  rmpmStorageApi: any[] = [];
  rmpmByDatetimeApi: any[] = [];

  //TOOLS
  dateNow = new Date().toISOString().slice(0, 10);

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    spinner.show();
    this.initialForm();
    // console.log(this.params);

    forkJoin(
      apiService.getRmpmStorage(),
      apiService.getRmpmOccupancyByDateTime(this.params)
    ).subscribe(
      (res) => {
        this.rmpmStorageApi = res[0];
        this.rmpmByDatetimeApi = res[1];
        this.fillFormItems();
        // console.log(res[1]);
        // eval("this.change(" + res[1][0].id + ")")
        spinner.hide();
      },
      (err) => {
        console.log(err);
        spinner.hide();
        alertService.onCallAlert('Data Cannot Loaded!',AlertType.Error)
      }
    );
  }

  initialForm() {
    this.form = this.formBuilder.group({
      date: [{value:this.params['date'],disabled:true}, Validators.required],
      time: [{value:this.params['time'],disabled:true}, Validators.required],
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
  change(c:any){
    console.log(c);
    
    console.log(this.f);
    
  }
  fillFormItems() {
    this.items = this.form.get('items') as FormArray;
    this.rmpmStorageApi.forEach((element, i) => {
      this.items.push(
        this.formBuilder.group({
          storageId: [element.id],
          used: [this.rmpmByDatetimeApi[i]?.used | 0, Validators.required],
        })
      );
    });
  }

  onSubmit() {
    console.log(this.f);
    
    if (this.form.invalid) {
      this.alertService.onCallAlert('Fill Blank Input!', AlertType.Warning);
      return;
    }

    this.apiService.postRmpmUpdate(this.f).subscribe(
      (data) => {
        this.alertService.onCallAlert('Edit Successfuly!', AlertType.Success);
        this.router.navigate(['input-rmpm-occupancy']);
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert(
          'Edit Failed, Check Your Connection!',
          AlertType.Error
        );
      }
    );
  }

  filterStorageByType(params: String) {
    return this.rmpmStorageApi.filter((data) => data.type == params);
  }
}
