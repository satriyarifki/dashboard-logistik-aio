import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.initialForm();
    forkJoin(apiService.getRmpmStorage()).subscribe((res) => {
      this.rmpmStorageApi = res[0];
      console.log(res[0]);
      this.fillFormItems();
      console.log(this.f);
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

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.onCallAlert('Fill Blank Input!',AlertType.Warning)
      return;
    }

    this.apiService.postRmpmCreate(this.f).subscribe(
      (data) => {
        this.alertService.onCallAlert('Create Successfuly!', AlertType.Success);
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Create Failed, Check Your Connection!',AlertType.Error)
      }
    );
  }

  filterStorageByType(params:String){
    return this.rmpmStorageApi.filter(data=>data.type == params)
  }
}
