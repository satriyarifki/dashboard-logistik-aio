import { formatDate } from '@angular/common';
import { Component, ElementRef, Inject, LOCALE_ID, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('PieChart') chartElement!: ElementRef;
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
    private renderer:Renderer2,
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
      fill: {
        type: 'gradient',
      },
      dataLabels: {
        style: {
          fontSize: '16px',
          fontFamily: 'Quicksand',
          fontWeight: 600,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      colors: [
        '#FF6F61',
        '#FFD700',
        '#FFA07A',
        '#00FA9A',
        '#1E90FF',
        '#FF69B4',
        '#FF4500',
        '#6A5ACD',
        '#FF8C00',
        '#8B008B',
        '#32CD32',
        '#FFD700',
      ],
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'right',
        fontSize: '16px',
        fontFamily: 'Quicksand',
        fontWeight: 600,
        floating: false,
        offsetY: 80,
        offsetX: 200,
      },
    };
    setTimeout(() => {
      for (let i = 0; i < (<HTMLElement>this.chartElement.nativeElement).getElementsByClassName('apexcharts-legend-series').length; i++){
        (<HTMLElement>(<HTMLElement>this.chartElement.nativeElement).getElementsByClassName('apexcharts-legend-series').item(i)).style.display='flex'
      }
      // console.log((<HTMLElement>this.chartElement.nativeElement).getElementsByClassName('apexcharts-legend-series').item(2));
      // console.log((<HTMLElement>this.chartElement.nativeElement).getElementsByClassName('apexcharts-legend').item(0));
    }, 0);
  
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
