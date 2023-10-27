import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, from } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-input-ln2-check-view',
  templateUrl: './input-ln2-check-view.component.html',
  styleUrls: ['./input-ln2-check-view.component.css']
})
export class InputLn2CheckViewComponent {
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
      date: [{value:this.params.data[0].date,disabled:true}, Validators.required],
      jam: [{value:this.params.data[0].jam,disabled:true}, Validators.required],
      checkerId: [{value:this.params.data[0].checkerId,disabled:true}, Validators.required],
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
          id: [{value:element.id,disabled:true}, Validators.required],
          supplierId: [{value:element.supplierId,disabled:true}, Validators.required],
          tankiId: [{value:element.tankiId,disabled:true}, Validators.required],
          level: [{value:element.level,disabled:true}, Validators.required],
          satuan: [{value:'',disabled:true}, Validators.required],
          press: [{value:element.pressure,disabled:true}, Validators.required],
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
