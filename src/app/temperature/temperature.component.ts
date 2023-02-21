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
  time: any;

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }

  constructor(private pService: ProductService) {
    this.getCurrentDate();
    // this.pService.getMockSum().subscribe((respon) => {
    //   this.mockData = respon;
    //   for (let index of respon) {
    //     this.mockAvg.push(index.sum_estoque);
    //   }
    //   console.log(this.mockAvg);
    //
    // });
    this.tempChartFunc();
  }
  tempChartFunc() {
    this.tempChart = {
      annotations: {
        points: [
          {
            x: 'Storage1',
            y: -10,
            seriesIndex: 0,
            marker: {
              size: 8,
            },
            label: {
              borderColor: '#FF4560',
              text: 'Point Annotation',
            },
          },
        ],
      },
      series: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Cold Storage',
              y: -16,
              goals: [
                {
                  name: 'Expected',
                  value: -18,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D1',
              y: 21,
              goals: [
                {
                  name: 'Expected',
                  value: 23,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D2',
              y: 8,
              goals: [
                {
                  name: 'Expected',
                  value: 7,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D3',
              y: 20,
              goals: [
                {
                  name: 'Expected',
                  value: 20,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D4',
              y: 22,
              goals: [
                {
                  name: 'Expected',
                  value: 23,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D6',
              y: 30,
              goals: [
                {
                  name: 'Expected',
                  value: 35,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Storage D7',
              y: 7,
              goals: [
                {
                  name: 'Expected',
                  value: 7,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Connection Room',
              y: 21,
              goals: [
                {
                  name: 'Expected',
                  value: 23,
                  strokeColor: '#775DD0',
                },
              ],
            },
          ],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [
              {
                from: -20,
                to: 0,
              },
            ],
          },
          columnWidth: '80%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + '°C';
        },
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
          rotate: 0,
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
        },
      },
    };
  }
}
