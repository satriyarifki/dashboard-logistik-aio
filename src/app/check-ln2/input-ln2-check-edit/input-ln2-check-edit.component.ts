import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from '../../services/alert/alert.model';
import { AlertService } from '../../services/alert/alert.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-input-ln2-check-edit',
  templateUrl: './input-ln2-check-edit.component.html',
  styleUrls: ['./input-ln2-check-edit.component.css'],
})
export class InputLn2CheckEditComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  satuan: any = '';

  params = history.state;

  //Form
  form!: FormGroup;
  items!: FormArray;

  //API
  supplierApi: any[] = [];
  tankiApi: any[] = [];
  karyawanApi: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    // console.log(this.params);
    // console.log(String(this.params.data.jam));

    this.initialForm();
    this.plusItemLoop();
    forkJoin(
      apiService.getSupplier(),
      apiService.getTanki(),
      apiService.getKaryawan()
    ).subscribe(([supplier, tanki, karyawan]) => {
      this.supplierApi = supplier;
      this.tankiApi = tanki;
      this.karyawanApi = karyawan;
      // console.log(this.supplierApi);
      // console.log(this.tankiApi);
      // console.log(this.karyawanApi);

      // console.log(this.form);
    });
  }
  get f() {
    return this.form.value;
  }
  get getItems() {
    // console.log((this.form.controls['items'] as FormArray).controls);

    return this.form.controls['items'] as FormArray;
  }
  initialForm() {
    this.form = this.formBuilder.group({
      date: [this.params.data[0].date, Validators.required],
      jam: [this.params.data[0].jam, Validators.required],
      checkerId: [this.params.data[0].checkerId, Validators.required],
      items: this.formBuilder.array([]),
    });
  }

  filterTanki(supplierId: number) {
    if (supplierId == 1) {
      return this.tankiApi.filter((data) => data.id == 1);
    } else {
      return this.tankiApi.filter((data) => data.id != 1);
    }
  }

  onSubmit() {
    let items: [] = this.f.items;
    // console.log(this.f);
    this.apiService.postCheckLevelEdit(this.f).subscribe(
      (data) => {
        // console.log(data);
        this.alertService.onCallAlert('Submit Edit Success!', AlertType.Success);
        this.router.navigate(['/input-ln2']);
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Submit Edit Failed!', AlertType.Error);
      }
    );

    // console.log(body);
  }



  plusItemLoop() {
    // this.itemLoop++;

    this.items = this.form.get('items') as FormArray;
    this.params.data.forEach((element: any) => {
      this.items.push(
        this.formBuilder.group({
          id: [element.id, Validators.required],
          supplierId: [element.supplierId, Validators.required],
          tankiId: [element.tankiId, Validators.required],
          level: [element.level, Validators.required],
          satuan: ['', Validators.required],
          press: [element.pressure, Validators.required],
        })
      );
    });

    // console.log(this.items);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    // console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  filterSatuan(id: any) {
    if (id == 1) {
      return 'InchH₂O';
    } else if (id == 2) {
      return 'mmH₂O';
    } else {
      return '';
    }
  }
  popItemLoop() {
    // this.itemLoop--;
    this.items = this.form.get('items') as FormArray;
    if (this.items.value.length != 1) {
      this.items.removeAt(this.items.value.length - 1);
    } else {
      alert('Minimum Item is 1');
    }

    // console.log(this.items);
  }
}
