import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-occupancy-edit',
  templateUrl: './input-occupancy-edit.component.html',
  styleUrls: ['./input-occupancy-edit.component.css'],
})
export class InputOccupancyEditComponent {
  dateParams = this.actRoute.snapshot.queryParams['date'];
  idParams = this.actRoute.snapshot.queryParams['id'];
  //TOOLS
  damagesBool = false;
  truckingBool = false;
  deliveryBool = false;
  onTimeBool = false;

  //API
  occupancyApi: any;

  //FORM
  form!: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    spinner.show();
    this.truckingBool = true;
    apiService.getWarehouseOccupancyById(this.idParams).subscribe(
      (data) => {
        this.occupancyApi = data;
        console.log(this.occupancyApi);
        this.initialForm();
        spinner.hide();
      },
      (err) => {
        spinner.hide();
      }
    );
  }
  initialForm() {
    this.form = this.formBuilder.group({
      capacity_kjy: [this.occupancyApi.capacity_kjy],
      usage_kjy: [this.occupancyApi.usage_kjy],
      remain_kjy: [this.occupancyApi.remain_kjy],
      capacity_skb: [this.occupancyApi.capacity_skb],
      usage_skb: [this.occupancyApi.usage_skb],
      remain_skb: [this.occupancyApi.remain_skb],
      capacity_bekasi: [this.occupancyApi.capacity_bekasi],
      usage_bekasi: [this.occupancyApi.usage_bekasi],
      remain_bekasi: [this.occupancyApi.remain_bekasi],
      capacity_ps_rebo: [this.occupancyApi.capacity_ps_rebo],
      usage_ps_rebo: [this.occupancyApi.usage_ps_rebo],
      remain_ps_rebo: [this.occupancyApi.remain_ps_rebo],
      capacity_external: [this.occupancyApi.capacity_external],
      usage_external: [this.occupancyApi.usage_external],
      remain_external: [this.occupancyApi.remain_ps_rebo],

      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });

    this.form.controls['remain_kjy'].disable();
    this.form.controls['remain_skb'].disable();
    this.form.controls['remain_bekasi'].disable();
    this.form.controls['remain_ps_rebo'].disable();
    this.form.controls['remain_external'].disable();
  }
  change() {
    this.form.controls['remain_kjy'].setValue(
      this.form.controls['capacity_kjy'].value -
        this.form.controls['usage_kjy'].value
    );
    this.form.controls['remain_skb'].setValue(
      this.form.controls['capacity_skb'].value -
        this.form.controls['usage_skb'].value
    );

    this.form.controls['remain_bekasi'].setValue(
      this.form.controls['capacity_bekasi'].value -
        this.form.controls['usage_bekasi'].value
    );

    this.form.controls['remain_ps_rebo'].setValue(
      this.form.controls['capacity_ps_rebo'].value -
        this.form.controls['usage_ps_rebo'].value
    );

    this.form.controls['remain_external'].setValue(
      this.form.controls['capacity_external'].value -
        this.form.controls['usage_external'].value
    );
  }

  onSubmit() {
    this.spinner.show();
    if (this.form.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      capacity_kjy: this.form.controls['capacity_kjy'].value,
      usage_kjy: this.form.controls['usage_kjy'].value,
      remain_kjy: this.form.controls['remain_kjy'].value,
      capacity_skb: this.form.controls['capacity_skb'].value,
      usage_skb: this.form.controls['usage_skb'].value,
      remain_skb: this.form.controls['remain_skb'].value,
      capacity_bekasi: this.form.controls['capacity_bekasi'].value,
      usage_bekasi: this.form.controls['usage_bekasi'].value,
      remain_bekasi: this.form.controls['remain_bekasi'].value,
      capacity_ps_rebo: this.form.controls['capacity_ps_rebo'].value,
      usage_ps_rebo: this.form.controls['usage_ps_rebo'].value,
      remain_ps_rebo: this.form.controls['remain_ps_rebo'].value,
      capacity_external: this.form.controls['capacity_external'].value,
      usage_external: this.form.controls['usage_external'].value,
      remain_external: this.form.controls['remain_ps_rebo'].value,
    };
    console.log(this.occupancyApi.id);

    this.apiService
      .updateWarehouseOccupancy(this.occupancyApi.id, body)
      .subscribe(
        (data) => {
          alert('Update Success!');
          console.log(data);

          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  changeTabs(index: number) {
    if (index == 1) {
      ('truck');
      this.truckingBool = true;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = false;
    } else if (index == 2) {
      ('del des');
      this.truckingBool = false;
      this.deliveryBool = true;
      this.onTimeBool = false;
      this.damagesBool = false;
    } else if (index == 3) {
      ('on time');
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = true;
      this.damagesBool = false;
    } else if (index == 4) {
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = true;
    }
  }
}
