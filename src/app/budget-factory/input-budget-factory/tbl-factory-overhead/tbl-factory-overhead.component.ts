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
  storageId: number = 0;

  //API
  budgetHandlingApi: any[] = [];
  budgetOverheadApi: any[] = [];
  userData: any;

  //Form
  formOverhead = new FormGroup({
    array: new FormArray([]),
  });

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'custom',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.budgetOverheadApi.length,
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
      this.apiService.getBudgetHandling(),
      this.apiService.getBudgetOverhead()
    ).subscribe(
      (res) => {
        this.budgetHandlingApi = res[0];
        this.budgetOverheadApi = res[1];
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
    this.budgetOverheadApi.forEach((elem) => {
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
    console.log(this.fOverhead.array);
    this.apiService
      .updateBudgetOverhead({ items: this.fOverhead.array })
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
}
