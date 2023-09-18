import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2-arrival-create',
  templateUrl: './input-ln2-arrival-create.component.html',
  styleUrls: ['./input-ln2-arrival-create.component.css'],
  providers: [DatePipe],
})
export class InputLn2ArrivalCreateComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  //Form
  form!: FormGroup;

  //Boolean
  supplierValue = 1;

  //API
  supplierApi: any[] = [];
  tankiApi: any[] = [];
  karyawanApi: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.arrayItem.push('item');

    forkJoin(
      apiService.getSupplier(),
      apiService.getTanki(),
      apiService.getKaryawan()
    ).subscribe(([supplier, tanki, karyawan]) => {
      this.supplierApi = supplier;
      this.tankiApi = tanki;
      this.karyawanApi = karyawan;
      this.initialForm();
      console.log(this.supplierApi);
      // console.log(this.tankiApi);
      // console.log(this.karyawanApi);
    });
  }

  get f() {
    return this.form.controls;
  }
  get fAir() {
    let airP = <FormArray>this.f['airProduct'];
    return airP.controls;
  }
  get fSam() {
    let airP = <FormArray>this.f['samator'];
    return airP.controls;
  }

  initialForm() {
    this.form = this.formBuilder.group({
      date: [this.dateNow, Validators.required],
      checkerId: [0, Validators.required],
      supplierId: [2, Validators.required],
      noMobil: ['', Validators.required],
      jenisMobil: ['', Validators.required],
      airProduct: this.formBuilder.array([
        this.formBuilder.group({
          arrivalId: ['', Validators.required],
          tankiId: [this.tankiApi[0].id, Validators.required],
          level: [0, Validators.required],
          press: [0, Validators.required],
          jam: ['', Validators.required],
          satuan: [this.supplierApi[0]?.uom, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: ['', Validators.required],
          level: [0, Validators.required],
          press: [0, Validators.required],
          jam: ['', Validators.required],
          satuan: [this.supplierApi[0]?.uom, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: ['', Validators.required],
          noSuratJalan: ['', Validators.required],
          noPo: ['', Validators.required],
          qty: [0, Validators.required],
          satuan: [this.supplierApi[0]?.uom, Validators.required],
        }),
      ]),
      samator: this.formBuilder.array([
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            level: [0, Validators.required],
            press: [0, Validators.required],
            jam: ['', Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            noSuratJalan: ['', Validators.required],
            noPo: ['', Validators.required],
            qty: [0, Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            noSuratJalan: ['', Validators.required],
            noPo: ['', Validators.required],
            qty: [0, Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: ['', Validators.required],
            noSuratJalan: ['', Validators.required],
            noPo: ['', Validators.required],
            qty: [0, Validators.required],
            satuan: [this.supplierApi[1]?.uom, Validators.required],
          }),
        ]),
      ]),
    });
  }

  onSubmit() {
    // console.log(this.f['levelSebelum']);
    if (this.form.invalid) {
      // console.log('fail');
      // console.log(this.f);
      alert('Fill blank input!')
      return;
    }

    let bodyArrival = {
      date: this.f['date'].value,
      checkerId: this.f['checkerId'].value,
      supplierId: this.f['supplierId'].value,
      no_mobil: this.f['noMobil'].value,
      jenis_mobil: this.f['jenisMobil'].value,
    };
    console.log(this.fSam[0]);

    let bodyAirArrival = {
      arrivalId: 0,
      tankiId: this.tankiApi[0].id,
      level_sebelum: this.fAir[0].value.level,
      press_sebelum: this.fAir[0].value.press,
      jam_sebelum: this.fAir[0].value.jam,
      level_sesudah: this.fAir[1].value.level,
      press_sesudah: this.fAir[1].value.press,
      jam_sesudah: this.fAir[1].value.jam,
      no_surat_jalan: this.fAir[2].value.noSuratJalan,
      no_po: this.fAir[2].value.noPo,
      qty: this.fAir[2].value.qty,
      satuan: this.fAir[2].value.satuan,
    };
    let bodySamatorArrival = [
      {
        arrivalId: 0,
        tankiId: this.tankiApi[1].id,
        level_sebelum: this.fSam[0].value[0].level,
        press_sebelum: this.fSam[0].value[0].press,
        jam_sebelum: this.fSam[0].value[0].jam,
        level_sesudah: this.fSam[1].value[0].level,
        press_sesudah: this.fSam[1].value[0].press,
        jam_sesudah: this.fSam[1].value[0].jam,
        no_surat_jalan: this.fSam[2].value[0].noSuratJalan,
        no_po: this.fSam[2].value[0].noPo,
        qty: this.fSam[2].value[0].qty,
        satuan: this.fSam[2].value[0].satuan,
      },
      {
        arrivalId: 0,
        tankiId: this.tankiApi[2].id,
        level_sebelum: this.fSam[0].value[1].level,
        press_sebelum: this.fSam[0].value[1].press,
        jam_sebelum: this.fSam[0].value[1].jam,
        level_sesudah: this.fSam[1].value[1].level,
        press_sesudah: this.fSam[1].value[1].press,
        jam_sesudah: this.fSam[1].value[1].jam,
        no_surat_jalan: this.fSam[2].value[1].noSuratJalan,
        no_po: this.fSam[2].value[1].noPo,
        qty: this.fSam[2].value[1].qty,
        satuan: this.fSam[2].value[1].satuan,
      },
      {
        arrivalId: 0,
        tankiId: this.tankiApi[3].id,
        level_sebelum: this.fSam[0].value[2].level,
        press_sebelum: this.fSam[0].value[2].press,
        jam_sebelum: this.fSam[0].value[2].jam,
        level_sesudah: this.fSam[1].value[2].level,
        press_sesudah: this.fSam[1].value[2].press,
        jam_sesudah: this.fSam[1].value[2].jam,
        no_surat_jalan: this.fSam[2].value[2].noSuratJalan,
        no_po: this.fSam[2].value[2].noPo,
        qty: this.fSam[2].value[2].qty,
        satuan: this.fSam[2].value[2].satuan,
      },
    ];
    console.log(bodySamatorArrival);

    if (this.f['supplierId'].value == 1) {
      this.apiService.postArrivalCreate(bodyArrival).subscribe(
        (data) => {
          console.log(data);
          bodyAirArrival.arrivalId = data[0];
          this.apiService.postArrivalAirCreate(bodyAirArrival).subscribe(
            (elem) => {
              console.log(elem);
            },
            (er) => {
              console.log(er);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.f['supplierId'].value == 2) {
      this.apiService.postArrivalCreate(bodyArrival).subscribe(
        (data) => {
          console.log(data);
          bodySamatorArrival.forEach((element,index) => {
            bodySamatorArrival[index].arrivalId = data[0];
            this.apiService.postArrivalAirCreate(element).subscribe(
              (elem) => {
                console.log(elem);
              },
              (er) => {
                console.log(er);
              }
            );
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  plusItemLoop() {
    // this.itemLoop++;
    this.arrayItem.push('item');
    console.log(this.arrayItem);
  }

  deleteItemLoop(index: number) {
    // this.itemLoop--;
    console.log(index);
    const t = this.arrayItem.splice(index, index);

    console.log(this.arrayItem);
  }
  popItemLoop() {
    // this.itemLoop--;

    const t = this.arrayItem.pop();

    console.log(this.arrayItem);
  }
}
