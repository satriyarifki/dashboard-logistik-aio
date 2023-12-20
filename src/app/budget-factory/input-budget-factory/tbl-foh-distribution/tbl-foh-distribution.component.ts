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
  selector: 'app-tbl-foh-distribution',
  templateUrl: './tbl-foh-distribution.component.html',
  styleUrls: ['./tbl-foh-distribution.component.css']
})
export class TblFohDistributionComponent {
  //TOOLS
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
  searchInput: any;
  searchInputStorage: any;
  itemPerPage = 5;
  updateBool = false;
  storageId: number = 0;

  //API
  fohApi: any[] = [];
  userData: any;

  //Form
  form = new FormGroup({
    array: new FormArray([]),
  });

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'stockTable', // the id of html/table element
  };

  config = {
    id: 'customFohDist',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: this.fohApi.length,
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
      this.apiService.getBudgetFohDistribution(),
    ).subscribe(
      (res) => {
        this.fohApi = res[0];
        // console.log(res[0]);
        
        // console.log(res[2]);
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

  fillArray() {
    let array = this.form.get('array') as FormArray;
    this.fohApi.forEach((elem) => {
      // console.log(elem.date.slice(0, 7));

      array.push(
        new FormGroup({
          id: new FormControl(elem.id, [Validators.required]),
          itemId: new FormControl({value:elem.id, disabled:true}, [Validators.required]),
          item: new FormControl({value:elem.item, disabled:true}, [Validators.required]),
          percentage: new FormControl(elem.percentage, [Validators.required]),
        })
      );
    });
  }
  
  onUpdate() {
   let array = this.form.get('array') as FormArray;

   this.f.array?.forEach((element,i) => {
     (array.controls[i] as FormGroup).controls['itemId'].enable(),
     (array.controls[i] as FormGroup).controls['item'].enable()
   });
   //  console.log(this.f.array);
    this.apiService
      .updateBudgetFohDistribution({ items: this.f.array })
      .subscribe(
        (res) => {
          this.alertService.onCallAlert('Update FOH Distributin Success!', AlertType.Success);
          this.ngOnInit();
          this.changeUpdateModal(0)
        },
        (err) => {
          console.log(err);
          this.alertService.onCallAlert(
            'Update FOH Distributin Failed!',
            AlertType.Error
          );
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
}
