import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2-check-create',
  templateUrl: './input-ln2-check-create.component.html',
  styleUrls: ['./input-ln2-check-create.component.css'],
  providers: [DatePipe],
})
export class InputLn2CheckCreateComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  satuan: any = '';

  //Form
  form!: FormGroup;
  items!: FormArray;

  //API
  supplierApi: any[] = [];
  tankiApi: any[] = [];
  karyawanApi: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
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

      console.log(this.form);
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
      date: [this.dateNow, Validators.required],
      jam: ['', Validators.required],
      checkerId: [0, Validators.required],
      items: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    // if (this.form.invalid) {
    //     // console.log('fail');
    //     alert('Fill blank input!')
    //     return;
    //   }
    let items: [] = this.f.items;
    // let body = {
    //   date: this.f['date'],
    //   checkerId: this.f['checkerId'],
    //   jam: this.f.jam,
    //   supplierId: '',
    //   tankiId: '',
    //   level: '',
    //   satuan: '',
    //   press: '',

    // };
    // console.log(body);
    items.forEach((element: any) => {
      let body = {
        date: this.f['date'],
        checkerId: this.f['checkerId'],
        jam: this.f.jam,
        supplierId: Number(element.supplierId),
        tankiId: Number(element.tankiId),
        level: element.level,
        press: element.press,
      };
      this.apiService.postCheckLevelCreate(body).subscribe(
        (data) => {
          console.log(data);
          console.log('success');
        },
        (err) => {
          console.log(err);
          console.log('error');
        }
      );

      console.log(body);
    });

    // console.log(body);
  }

  addItems(): FormGroup {
    return this.formBuilder.group({
      supplierId: [0, Validators.required],
      tankiId: [0, Validators.required],
      level: [0, Validators.required],
      satuan: ['', Validators.required],
      press: [0, Validators.required],
    });
  }

  plusItemLoop() {
    // this.itemLoop++;
    this.items = this.form.get('items') as FormArray;
    if (this.items.value.length < 4) {
      this.items.push(this.addItems());
    } else {
      alert('Maximum Item is 4');
    }

    console.log(this.items);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  changeSupplier(id: any) {
    if (id == 1) {
      this.satuan = 'InchH₂O';
    } else {
      this.satuan = 'mmH₂O';
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

    console.log(this.items);
  }
}
