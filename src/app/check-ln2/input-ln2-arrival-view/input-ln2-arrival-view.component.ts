import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-input-ln2-arrival-view',
  templateUrl: './input-ln2-arrival-view.component.html',
  styleUrls: ['./input-ln2-arrival-view.component.css']
})
export class InputLn2ArrivalViewComponent {
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
      console.log(this.arrivalApi);

      this.initialForm();
      // console.log(this.supplierApi);
      // console.log(this.tankiApi);
      // console.log(this.karyawanApi);
    });
  }

  get f() {
    return this.form.controls;
  }
  get fValue() {
    return this.form.value;
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
      date: [{value:this.dateArrival,disabled:true}, Validators.required],
      checkerId: [{value:this.arrivalApi.checkerId,disabled:true}, Validators.required],
      supplierId: [
        this.arrivalApi.supplier.includes('Samator') ? 2 : 1,
        Validators.required,
      ],
      noMobil: [{value:this.arrivalApi.no_mobil,disabled:true}, Validators.required],
      jenisMobil: [{value:this.arrivalApi.jenis_mobil,disabled:true}, Validators.required],
      airProduct: this.formBuilder.array([
        this.formBuilder.group({
          arrivalId: [{value:this.airProductApi[0]?.arrivalId,disabled:true}, Validators.required],
          tankiId: [{value:this.tankiApi[0].id,disabled:true}, Validators.required],
          level: [{value:this.airProductApi[0]?.level_sebelum,disabled:true}, Validators.required],
          press: [{value:this.airProductApi[0]?.press_sebelum,disabled:true}, Validators.required],
          jam: [{value:this.airProductApi[0]?.jam_sebelum,disabled:true}, Validators.required],
          satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: [{value:this.airProductApi[0]?.arrivalId,disabled:true}, Validators.required],
          level: [{value:this.airProductApi[0]?.level_sesudah,disabled:true}, Validators.required],
          press: [{value:this.airProductApi[0]?.press_sesudah,disabled:true}, Validators.required],
          jam: [{value:this.airProductApi[0]?.jam_sesudah,disabled:true}, Validators.required],
          satuan: [{value:this.supplierApi[0].uom,disabled:true}, Validators.required],
        }),
        this.formBuilder.group({
          arrivalId: [{value:this.airProductApi[0]?.arrivalId,disabled:true}, Validators.required],
          noSuratJalan: [
            this.airProductApi[0]?.no_surat_jalan,
            Validators.required,
          ],
          noPo: [{value:this.airProductApi[0]?.no_po,disabled:true}, Validators.required],
          qty: [{value:this.airProductApi[0]?.qty,disabled:true}, Validators.required],
          satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
        }),
      ]),
      samator: this.formBuilder.array([
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[0]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[0]?.level_sebelum,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[0]?.press_sebelum,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[0]?.jam_sebelum,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[1]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[1]?.level_sebelum,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[1]?.press_sebelum,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[1]?.jam_sebelum,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[2]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[2]?.level_sebelum,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[2]?.press_sebelum,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[2]?.jam_sebelum,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[0]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[0]?.level_sesudah,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[0]?.press_sesudah,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[0]?.jam_sesudah,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0].uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[1]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[1]?.level_sesudah,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[1]?.press_sesudah,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[1]?.jam_sesudah,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0].uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[2]?.arrivalId,disabled:true}, Validators.required],
            level: [{value:this.samatorApi[2]?.level_sesudah,disabled:true}, Validators.required],
            press: [{value:this.samatorApi[2]?.press_sesudah,disabled:true}, Validators.required],
            jam: [{value:this.samatorApi[2]?.jam_sesudah,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0].uom,disabled:true}, Validators.required],
          }),
        ]),
        this.formBuilder.array([
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[0]?.arrivalId,disabled:true}, Validators.required],
            noSuratJalan: [
              this.samatorApi[0]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [{value:this.samatorApi[0]?.no_po,disabled:true}, Validators.required],
            qty: [{value:this.samatorApi[0]?.qty,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[1]?.arrivalId,disabled:true}, Validators.required],
            noSuratJalan: [
              this.samatorApi[1]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [{value:this.samatorApi[1]?.no_po,disabled:true}, Validators.required],
            qty: [{value:this.samatorApi[1]?.qty,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
          this.formBuilder.group({
            arrivalId: [{value:this.samatorApi[2]?.arrivalId,disabled:true}, Validators.required],
            noSuratJalan: [
              this.samatorApi[2]?.no_surat_jalan,
              Validators.required,
            ],
            noPo: [{value:this.samatorApi[2]?.no_po,disabled:true}, Validators.required],
            qty: [{value:this.samatorApi[2]?.qty,disabled:true}, Validators.required],
            satuan: [{value:this.supplierApi[0]?.uom,disabled:true}, Validators.required],
          }),
        ]),
      ]),
    });
    // console.log(this.form.value.samator);
    // console.log(this.fValue.samator[0]);
  }

}
