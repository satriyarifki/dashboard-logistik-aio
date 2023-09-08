import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-kjy-edit',
  templateUrl: './input-kjy-edit.component.html',
  styleUrls: ['./input-kjy-edit.component.css'],
})
export class InputKjyEditComponent {
  dateParams = this.actRoute.snapshot.queryParams['date'];
  idParams = this.actRoute.snapshot.queryParams['id'];
  //TOOLS
  damagesBool = false;
  truckingBool = false;
  deliveryBool = false;
  onTimeBool = false;
  perfectBool = false;
  handlingBool = false;

  //FORM
  formTrucking!: FormGroup;
  formDelivery!: FormGroup;
  formOnTime!: FormGroup;
  formDamages!: FormGroup;
  formPerfect!: FormGroup;
  formHandling!: FormGroup;

  // API
  dataApi: any;

  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    spinner.show();
    forkJoin(apiService.getFleetKejayanById(this.idParams)).subscribe(
      ([kejayan]) => {
        this.dataApi = kejayan;
        // console.log(this.dataApi);
        this.initialForm();
      },
      (err) => {
        spinner.hide();
      },
      () => {
        spinner.hide();
      }
    );

    

    this.truckingBool = true;
  }

  initialForm() {
    this.formTrucking = this.formBuilder.group({
      container: [this.dataApi.container],
      wingBox: [this.dataApi.wing_box],
      tronton: [this.dataApi.tronton],
      fuso: [this.dataApi.fuso],
      colt: [this.dataApi.cold_diesel],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
    this.formDelivery = this.formBuilder.group({
      distributor: [this.dataApi.ditributor],
      odi: [this.dataApi.odi],
      export: [this.dataApi.export],
      intersite: [this.dataApi.intransitt_wh],
      ldc: [this.dataApi.ldc],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
    this.formOnTime = this.formBuilder.group({
      within: [this.dataApi['within_time_limit_<_=_11_pm']],
      outTime: [this.dataApi['out_of_the_limit_>_=_11_pm']],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
    this.formDamages = this.formBuilder.group({
      qty: [this.dataApi.qty_damage_product],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
    this.formPerfect = this.formBuilder.group({
      qty: [this.dataApi.qty_shipment],
      percentage: [this.dataApi.percentage],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
    this.formHandling = this.formBuilder.group({
      qty: [this.dataApi.qty_handling_load],
      // resourceId: [this.reserv?.resourceId | 0, Validators.required],
    });
  }
  get f() {
    return this.formTrucking.controls;
  }

  changeTabs(index: any) {
    if (index == 1) {
      ('truck');
      this.truckingBool = true;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = false;
      this.perfectBool = false;
      this.handlingBool = false;
    } else if (index == 2) {
      ('del des');
      this.truckingBool = false;
      this.deliveryBool = true;
      this.onTimeBool = false;
      this.damagesBool = false;
      this.perfectBool = false;
      this.handlingBool = false;
    } else if (index == 3) {
      ('on time');
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = true;
      this.damagesBool = false;
      this.perfectBool = false;
      this.handlingBool = false;
    } else if (index == 4) {
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = true;
      this.perfectBool = false;
      this.handlingBool = false;
    } else if (index == 5) {
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = false;
      this.perfectBool = true;
      this.handlingBool = false;
    } else if (index == 6) {
      this.truckingBool = false;
      this.deliveryBool = false;
      this.onTimeBool = false;
      this.damagesBool = false;
      this.perfectBool = false;
      this.handlingBool = true;
    }
  }
  onSubmitTrucking() {
    this.spinner.show()
    if (this.formTrucking.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      container: this.formTrucking.controls['container'].value,
      wing_box: this.formTrucking.controls['wingBox'].value,
      tronton: this.formTrucking.controls['tronton'].value,
      fuso: this.formTrucking.controls['fuso'].value,
      cold_diesel: this.formTrucking.controls['colt'].value,
    };

    this.apiService.updateKejayanTrucking(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Trucking');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
  
  onSubmitDelivery() {
    this.spinner.show()
    if (this.formDelivery.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      distributor: this.formDelivery.controls['distributor'].value,
      odi: this.formDelivery.controls['odi'].value,
      export: this.formDelivery.controls['export'].value,
      intransitt_wh: this.formDelivery.controls['intersite'].value,
      ldc: this.formDelivery.controls['ldc'].value,
    };

    this.apiService.updateKejayanDelivery(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Kejayan Delivery');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }

  onSubmitOnTime() {
    this.spinner.show()
    if (this.formOnTime.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      within: this.formOnTime.controls['within'].value,
      outLimit: this.formOnTime.controls['outTime'].value,
    };

    this.apiService.updateKejayanOnTime(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Kejayan On Time Arrival');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
  onSubmitDamage() {
    this.spinner.show()
    if (this.formDamages.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      qty: this.formDamages.controls['qty'].value,
      
    };

    this.apiService.updateKejayanDamage(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Kejayan Damage Product');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
  onSubmitPerfect() {
    this.spinner.show()
    if (this.formPerfect.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      qty: this.formPerfect.controls['qty'].value,
      percentage: this.formPerfect.controls['percentage'].value,
    };

    this.apiService.updateKejayanPerfect(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Kejayan Perfect Order Rate');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
  onSubmitHandling() {
    this.spinner.show()
    if (this.formHandling.invalid) {
      alert('Form Must Filled');
      return;
    }

    const body = {
      qty: this.formHandling.controls['qty'].value,
      
    };

    this.apiService.updateKejayanHandling(this.dataApi.id, body).subscribe(
      (data) => {
        alert('Success Update Kejayan Handling');
        console.log('Success');
        this.spinner.hide()
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
}
