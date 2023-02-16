import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ProductService } from '../services/product.service';
import { TempChart } from './../ApexChart';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public tempChart!: Partial<TempChart> | any;
  mockData: any;
  mockAvg: number[] = [];

  constructor(private pService: ProductService) {
    this.pService.getMockSum().subscribe((respon) => {
      this.mockData = respon;
      for (let index of respon) {
        this.mockAvg.push(index.sum_estoque);
      }
      console.log(this.mockAvg);
      this.tempChartFunc();
    });
  }
  tempChartFunc() {
    this.tempChart = {
      series: [
        {
          name: 'Servings',
          data: this.mockAvg,
        },
      ],
      annotations: {
        points: [
          {
            x: 'Bananas',
            seriesIndex: 0,
            label: {
              borderColor: '#775DD0',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Bananas are good',
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          'Apples',
          'Oranges',
          'Strawberries',
          'Pineapples',
          'Mangoes',
          'Bananas',
          'Blackberries',
          'Pears',
          'Watermelons',
          'Cherries',
          'Pomegranates',
          'Tangerines',
          'Papayas',
        ],
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Servings',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    };
  }
}
