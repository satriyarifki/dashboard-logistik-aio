import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from '../services/alert/alert.model';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-input-ln2-arrival-edit',
  templateUrl: './input-ln2-arrival-edit.component.html',
  styleUrls: ['./input-ln2-arrival-edit.component.css'],
  providers: [DatePipe],
})
export class InputLn2ArrivalEditComponent {
  itemLoop: number = 1;
  arrayItem: any[] = [];
  dateArrival = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  idParams = this.actRoute.snapshot.queryParams['id'];

  //Form
  form!: FormGroup;

  //Boolean
  supplierValue = 1;

  //API
  supplierApi: any[] = [];
  tankiApi: any[] = [];
  karyawanApi: any[] = [];
  pengisianApi: any[] = [];
  samatorApi: any[] = [];
  airProductApi: any[] = [];
  arrivalApi: any;

  constructor(
    private datePipe: DatePipe,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {
    this.arrayItem.push('item');

    forkJoin(
      apiService.getSupplier(),
      apiService.getTanki(),
      apiService.getKaryawan(),
      apiService.getPengisianLn2ByArrivalId(this.idParams),
      apiService.getArrivalLn2ById(this.idParams)
    ).subscribe(([supplier, tanki, karyawan, pengisian, arrival]) => {
      this.supplierApi = supplier;
      this.tankiApi = tanki;
      this.karyawanApi = karyawan;
      this.pengisianApi = pengisian;
      this.arrivalApi = arrival;
      if (pengisian.length > 1) {
        this.samatorApi = pengisian;
      } else {
        this.airProductApi = pengisian;
      }
      this.dateArrival = this.datePipe.transform(
        this.arrivalApi.date,
        'yyyy-MM-dd'
      );
      // console.log(this.arrivalApi);

      this.initialForm();
      // console.log(this.supplierApi);
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
    let airProductData: any[] = [];
    let samatorData: any[] = [];
    // console.log(this.pengisianApi.length);

    this.form = this.formBuilder.group({
      date: [this.dateArrival, Validators.required],
      checkerId: [this.arrivalApi.checkerId, Validators.required],
      supplierId: [
        this.arrivalApi.supplier.includes('Samator') ? 2 : 1,
        Validators.required,
      ],
      noMobil: [this.arrivalApi.no_mobil, Validators.required],
      jenisMobil: [this.arrivalApi.jenis_mobil, Validators.required],
      airProduct: this.formBuilder.array([
        this.formBuilder.group({
          arrivalId: [this.airProductApi[0]?.arrivalId, Validators.required],
          tankiId: [this.tankiApi[0].id, Validators.required],
          level: [this.airProductApi[0]?.level_sebelum, Validators.required],
          press: [this.airProductApi[0]?.press_sebelum, Validators.required],
          jam: [this.airProductApi[0]?.jam_sebelum, Validators.required],
          satuan: [this.supplierApi[0]?.uom, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: [this.airProductApi[0]?.arrivalId, Validators.required],
          level: [this.airProductApi[0]?.level_sesudah, Validators.required],
          press: [this.airProductApi[0]?.press_sesudah, Validators.required],
          jam: [this.airProductApi[0]?.jam_sesudah, Validators.required],
          satuan: [this.supplierApi[0].uom, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: [this.airProductApi[0]?.arrivalId, Validators.required],
          noSuratJalan: [
            this.airProductApi[0]?.no_surat_jalan,
            Validators.required,
          ],
          noPo: [this.airProductApi[0]?.no_po, Validators.required],
          qty: [this.airProductApi[0]?.qty, Validators.required],
          satuan: [this.supplierApi[0]?.uom, Validators.required],
        }),
      ]),
      samator: this.formBuilder.array([
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [this.samatorApi[0]?.arrivalId, Validators.required],
            level: [this.samatorApi[0]?.level_sebelum, Validators.required],
            press: [this.samatorApi[0]?.press_sebelum, Validators.required],
            jam: [this.samatorApi[0]?.jam_sebelum, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[1]?.arrivalId, Validators.required],
            level: [this.samatorApi[1]?.level_sebelum, Validators.required],
            press: [this.samatorApi[1]?.press_sebelum, Validators.required],
            jam: [this.samatorApi[1]?.jam_sebelum, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[2]?.arrivalId, Validators.required],
            level: [this.samatorApi[2]?.level_sebelum, Validators.required],
            press: [this.samatorApi[2]?.press_sebelum, Validators.required],
            jam: [this.samatorApi[2]?.jam_sebelum, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [this.samatorApi[0]?.arrivalId, Validators.required],
            level: [this.samatorApi[0]?.level_sesudah, Validators.required],
            press: [this.samatorApi[0]?.press_sesudah, Validators.required],
            jam: [this.samatorApi[0]?.jam_sesudah, Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[1]?.arrivalId, Validators.required],
            level: [this.samatorApi[1]?.level_sesudah, Validators.required],
            press: [this.samatorApi[1]?.press_sesudah, Validators.required],
            jam: [this.samatorApi[1]?.jam_sesudah, Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[2]?.arrivalId, Validators.required],
            level: [this.samatorApi[2]?.level_sesudah, Validators.required],
            press: [this.samatorApi[2]?.press_sesudah, Validators.required],
            jam: [this.samatorApi[2]?.jam_sesudah, Validators.required],
            satuan: [this.supplierApi[0].uom, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [this.samatorApi[0]?.arrivalId, Validators.required],
            noSuratJalan: [
              this.samatorApi[0]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [this.samatorApi[0]?.no_po, Validators.required],
            qty: [this.samatorApi[0]?.qty, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[1]?.arrivalId, Validators.required],
            noSuratJalan: [
              this.samatorApi[1]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [this.samatorApi[1]?.no_po, Validators.required],
            qty: [this.samatorApi[1]?.qty, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [this.samatorApi[2]?.arrivalId, Validators.required],
            noSuratJalan: [
              this.samatorApi[2]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [this.samatorApi[2]?.no_po, Validators.required],
            qty: [this.samatorApi[2]?.qty, Validators.required],
            satuan: [this.supplierApi[0]?.uom, Validators.required],
          }),
        ]),
      ]),
    });
    // console.log(this.form.value.samator);
  }

  onSubmit() {
    // console.log(this.f['levelSebelum']);
    // if (this.form.invalid) {
    //   // console.log('fail');
    //   // console.log(this.f);
    //   return;
    // }

    let bodyArrival = {
      date: this.f['date'].value,
      checkerId: this.f['checkerId'].value,
      supplierId: this.f['supplierId'].value,
      no_mobil: this.f['noMobil'].value,
      jenis_mobil: this.f['jenisMobil'].value,
    };
    console.log(this.fSam[0]);

    let bodyAirArrival = {
      arrivalId: this.airProductApi[0]?.arrivalId,
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
        arrivalId: this.samatorApi[0]?.arrivalId,
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
        arrivalId: this.samatorApi[1]?.arrivalId,
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
        arrivalId: this.samatorApi[2]?.arrivalId,
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
    console.log(this.samatorApi);

    if (this.f['supplierId'].value == 1) {
      this.apiService
        .postArrivalEdit(this.arrivalApi.id, bodyArrival)
        .subscribe(
          (data) => {
            console.log(data);
            bodyAirArrival.arrivalId = data[0];
            this.apiService
              .postArrivalFillEdit(this.airProductApi[0].id, bodyAirArrival)
              .subscribe(
                (elem) => {
                  console.log(elem);
                  this.alertService.onCallAlert(
                    'Submit Edit Success!',
                    AlertType.Success
                  );
                  this.router.navigate(['input-ln2']);
                },
                (er) => {
                  this.alertService.onCallAlert(
                    'Submit Edit Failed!',
                    AlertType.Error
                  );
                  console.log(er);
                }
              );
          },
          (err) => {
            console.log(err);
            this.alertService.onCallAlert(
              'Submit Edit Failed!',
              AlertType.Error
            );
          }
        );
    } else if (this.f['supplierId'].value == 2) {
      this.apiService
        .postArrivalEdit(this.arrivalApi.id, bodyArrival)
        .subscribe(
          (data) => {
            console.log(data);
            bodySamatorArrival.forEach((element, index) => {
              bodySamatorArrival[index].arrivalId = data[0];
              this.apiService
                .postArrivalFillEdit(this.samatorApi[index].id, element)
                .subscribe(
                  (elem) => {
                    console.log(elem);
                    this.alertService.onCallAlert(
                      'Submit Edit Success!',
                      AlertType.Success
                    );
                    this.router.navigate(['input-ln2']);
                  },
                  (er) => {
                    console.log(er);
                    this.alertService.onCallAlert(
                      'Submit Edit Failed!',
                      AlertType.Error
                    );
                  }
                );
            });
          },
          (err) => {
            console.log(err);
            this.alertService.onCallAlert(
              'Submit Edit Failed!',
              AlertType.Error
            );
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
