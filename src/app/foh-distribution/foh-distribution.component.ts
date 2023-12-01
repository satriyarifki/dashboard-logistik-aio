import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import {
  ShippingChart,
  MultiLineChart,
  multiColumnChart,
  pieChart,
} from '../ApexChart';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';
import { DeleteApiService } from '../services/delete-api/delete-api.service';

@Component({
  selector: 'app-foh-distribution',
  templateUrl: './foh-distribution.component.html',
  styleUrls: ['./foh-distribution.component.css'],
})
export class FohDistributionComponent {
  public pieChart!: Partial<pieChart> | any;
  time: any;

  //API
  fohDistribution: any[] = [];

  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private deleteService: DeleteApiService,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string
  ) {
    spinner.show();
    this.getCurrentDate();
    forkJoin(apiService.getBudgetFohDistribution()).subscribe((res) => {
      this.fohDistribution = res[0];
      this.chart();
      spinner.hide();
    });
  }

  chart() {
    // console.log(this.dataHandling);
    this.pieChart = {
      series: this.dataFohDistribution.percentage,
      chart: {
        height: '500',
        type: 'pie',
      },
      labels: this.dataFohDistribution.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        show: true,
        // position: 'center',
        horizontalAlign: 'center', 
        offsetY:20,
      },
    };
  }

  get dataFohDistribution() {
    let percentage: any[] = [];
    let label: any[] = [];
    this.fohDistribution.forEach((elem) => {
      percentage.push(elem.percentage);
      label.push(elem.item);
    });
    return { percentage: percentage, labels: label };
  }

  currencyRounded(data: number) {
    return String(data).length > 9
      ? (data / 1000000000).toFixed(2) + ' Bio'
      : (data / 1000000).toFixed() + ' Mio';
  }
}
