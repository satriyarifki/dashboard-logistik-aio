import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  Form,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExportAsConfig } from 'ngx-export-as';
import { PaginationControlsDirective } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';

@Component({
  selector: 'app-tbl-factory-overhead',
  templateUrl: './tbl-factory-overhead.component.html',
  styleUrls: ['./tbl-factory-overhead.component.css'],
})
export class TblFactoryOverheadComponent {
  //TOOLS
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  searchInputStorage: any;
  itemPerPage = 7;
  updateBool = false;
  addYearBool = false;

  //API
  budgetOverheadByYearApi: any[] = [];
  budgetYearListApi: any[] = [];
  userData: any;
  yearSelect: Number = new Date().getFullYear();

//Form
formOverhead = new FormGroup({
  array: new FormArray([]),
});
formAddYear = new FormGroup({
    year: new FormControl(null, Validators.required),
    type: new FormControl('Overhead'),
  });

exportAsConfig: ExportAsConfig = {
  type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'overhead',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.budgetOverheadByYearApi.length,
  };
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private deleteService: DeleteApiService,
    private router: Router
  ) {
    this.userData = authService.getUser()[0];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {
    this.spinner.show();
    forkJoin(
      this.apiService.getBudgetOverhead(),
      this.apiService.getBudgetOverHandYearList('Overhead')
    ).subscribe(
      (res) => {
        this.budgetOverheadByYearApi = res[0];
        this.budgetYearListApi = res[1];
        this.yearSelect = Number(formatDate(res[0][0]?.date, 'yyyy', 'EN-us'))
        // console.log(res[2]);
        // this.fillOverheadArray();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.alertService.onCallAlert('Data Cannot Loaded!', AlertType.Error);
      }
    );
  }

  fillOverheadArray() {
    let array = this.formOverhead.get('array') as FormArray;
    this.budgetOverheadByYearApi.forEach((elem) => {
      // console.log(elem.date.slice(0, 7));

      array.push(
        new FormGroup({
          id: new FormControl(elem.id, [Validators.required]),
          date: new FormControl(elem.date.slice(0, 7), [Validators.required]),
          skb: new FormControl(elem.skb, [Validators.required]),
          kjy: new FormControl(elem.kjy, [Validators.required]),
          type: new FormControl(elem.type, [Validators.required]),
        })
      );
    });
  }
  
  onUpdate() {
    // console.log(this.fOverhead.array);
    this.apiService
      .updateBudgetOverHand({ items: this.fOverhead.array })
      .subscribe(
        (res) => {
          this.alertService.onCallAlert('Update Overhead Success!', AlertType.Success);
          this.ngOnInit();
          this.changeUpdateModal(0)
        },
        (err) => {
          console.log(err);
          this.alertService.onCallAlert(
            'Update Overhead Failed!',
            AlertType.Error
          );
        }
      );
  }
  
onAddYear() {
    if (
      this.formAddYear.invalid ||
      this.formAddYear.value.year! > new Date().getFullYear() + 20 ||
      this.formAddYear.value.year! < 1990
    ) {
      this.alertService.onCallAlert('Year is Invalid !', AlertType.Warning);
      return;
    }

    this.apiService.postBudgetOverHand(this.formAddYear.value).subscribe(
      (res) => {
        this.alertService.onCallAlert('Add Year Success !', AlertType.Success);
        this.ngOnInit()
        this.changeAddYearModal(0)
      },
      (err) => {
        console.log(err);
        this.alertService.onCallAlert('Add Year Failed !', AlertType.Error);
      }
    );
  }

  deleteBudget(data: any) {
    const fun =
      'this.apiService.deleteBudgetOverHand(' +
      JSON.stringify({ year: data.year, type: data.type }) +
      ')';
    this.deleteService.onCallDelete({
      dataName: data.year + ', ' + data.type,
      func: fun,
    });
  }

  changeSelectYear() {
    this.spinner.show()
    this.apiService
      .getBudgetOverheadByYear(this.yearSelect)
      .subscribe((res) => {
        this.budgetOverheadByYearApi = res;
        this.spinner.hide()
      });
      
  }


  get fOverhead() {
    return this.formOverhead.value;
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  changeUpdateModal(id: number) {
    if (id != 0) {
      this.updateBool = true;
      this.fillOverheadArray()
    } else {
      this.updateBool = false;
      let array = this.formOverhead.get('array') as FormArray;
      array.clear()

    }
  }
  changeAddYearModal(id: number) {
    if (id != 0) {
      this.addYearBool = true;
    } else {
      this.addYearBool = false;
      this.formAddYear.reset();
    }
  }
}
