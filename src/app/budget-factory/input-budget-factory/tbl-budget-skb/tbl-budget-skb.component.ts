import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-tbl-budget-skb',
  templateUrl: './tbl-budget-skb.component.html',
  styleUrls: ['./tbl-budget-skb.component.css']
})
export class TblBudgetSkbComponent {
  //TOOLS
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  searchInputStorage: any;
  itemPerPage = 7;
  updateBool = false;
  addYearBool = false;
  storageId: number = 0;

  //API
  budgetYearListApi: any[] = [];
  budgetByYearApi: any[] = [];
  userData: any;
  yearSelect: Number = new Date().getFullYear();

  //Form
  form = new FormGroup({
    array: new FormArray([]),
  });
  formAddYear = new FormGroup({
    year: new FormControl(null, Validators.required),
    from: new FormControl('Sukabumi'),
  });

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'budgetSkb',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.budgetByYearApi.length,
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
      this.apiService.getBudgetFactoryYearList('Sukabumi'),
      this.apiService.getBudgetFactorySkbByYear(this.yearSelect)
    ).subscribe(
      (res) => {
        this.budgetYearListApi = res[0];
        this.budgetByYearApi = res[1];
        
        // this.fillArray();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.alertService.onCallAlert('Data Cannot Loaded!', AlertType.Error);
      }
    );
  }
  changeSelectYear() {
    this.spinner.show()
    this.apiService
      .getBudgetFactorySkbByYear(this.yearSelect)
      .subscribe((res) => {
        this.budgetByYearApi = res;
        this.spinner.hide()
      });
      
  }

  deleteBudget(data: any) {
    const fun =
      'this.apiService.deleteBudgetFactory(' +
      JSON.stringify({ year: data.year, from: data.from }) +
      ')';
    this.deleteService.onCallDelete({
      dataName: data.year + ', ' + data.from,
      func: fun,
    });
  }

  fillArray() {
    let array = this.form.get('array') as FormArray;
    this.budgetByYearApi.forEach((elem) => {
      // console.log(elem.date.slice(0, 7));

      array.push(
        new FormGroup({
          id: new FormControl(elem.id, [Validators.required]),
          date: new FormControl(elem.date.slice(0, 7), [Validators.required]),
          bud: new FormControl(elem.bud, [Validators.required]),
          foh: new FormControl(elem.foh, [Validators.required]),
          from: new FormControl(elem.from, [Validators.required]),
        })
      );
    });
  }
  
  onUpdate() {
   //  console.log(this.f.array);
    this.apiService
      .updateBudgetFactory({ items: this.f.array })
      .subscribe(
        (res) => {
          this.alertService.onCallAlert('Update Budget Factory Success!', AlertType.Success);
          this.ngOnInit();
          this.changeUpdateModal(0)
        },
        (err) => {
          console.log(err);
          this.alertService.onCallAlert(
            'Update Budget Factory Failed!',
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

    this.apiService.postBudgetFactory(this.formAddYear.value).subscribe(
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

  get f() {
    return this.form.value;
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }

  changeUpdateModal(id: number) {
    if (id != 0) {
      this.updateBool = true;
      this.fillArray()
    } else {
      this.updateBool = false;
      let array = this.form.get('array') as FormArray;
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
