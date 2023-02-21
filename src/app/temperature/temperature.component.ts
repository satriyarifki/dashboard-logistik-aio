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
      seriesSoyjoy: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Cold Storage',
              y: -16,
              goals: [
                {
                  name: 'Standart',
                  value: -18,
                  strokeColor: '#35e300',
                },
              ],
            },
            {
              x: 'Storage D1',
              y: 21,
              goals: [
                {
                  name: 'Standart',
                  value: 23,
                  strokeColor: '#35e300',
                },
                {
                  name: 'Min Standart',
                  value: 21,
                  strokeColor: '#e32200',
                },
                {
                  name: 'Max Standart',
                  value: 25,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage D2',
              y: 8,
              goals: [
                {
                  name: 'Standart',
                  value: 7,
                  strokeColor: '#35e300',
                },
              ],
            },
            {
              x: 'Storage D3',
              y: 20,
              goals: [
                {
                  name: 'Standart',
                  value: 20,
                  strokeColor: '#35e300',
                },
                {
                  name: 'Min Standart',
                  value: 18,
                  strokeColor: '#e32200',
                },
                {
                  name: 'Max Standart',
                  value: 22,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage D4',
              y: 22,
              goals: [
                {
                  name: 'Standart',
                  value: 23,
                  strokeColor: '#35e300',
                },
                {
                  name: 'Min Standart',
                  value: 21,
                  strokeColor: '#e32200',
                },
                {
                  name: 'Max Standart',
                  value: 25,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage D6',
              y: 30,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage D7',
              y: 7,
              goals: [
                {
                  name: 'Standart',
                  value: 7,
                  strokeColor: '#35e300',
                },
              ],
            },
            {
              x: 'Connection Room',
              y: 21,
              goals: [
                {
                  name: 'Standart',
                  value: 23,
                  strokeColor: '#35e300',
                },
                {
                  name: 'Min Standart',
                  value: 21,
                  strokeColor: '#e32200',
                },
                {
                  name: 'Max Standart',
                  value: 25,
                  strokeColor: '#e32200',
                },
              ],
            },
          ],
        },
      ],
      seriesPocari: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Cold Storage',
              y: -17,
              goals: [
                {
                  name: 'Standart',
                  value: -18,
                  strokeColor: '#35e300',
                },
              ],
            },
            {
              x: 'Storage B1',
              y: 9,
              goals: [
                {
                  name: 'Min Standart',
                  value: 0,
                  strokeColor: '#e32200',
                },
                {
                  name: 'Max Standart',
                  value: 10,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage B2',
              y: 8,
              goals: [
                {
                  name: 'Max Standart',
                  value: 15,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Storage B3',
              y: 20,
              goals: [
                {
                  name: 'Max Standart',
                  value: 15,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'WH B',
              y: 22,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'WH A',
              y: 30,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'Gudang Chemical',
              y: 27,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'WH Packaging Pocari',
              y: 21,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
            {
              x: 'WH C',
              y: 21,
              goals: [
                {
                  name: 'Max Standart',
                  value: 35,
                  strokeColor: '#e32200',
                },
              ],
            },
          ],
        },
        // {
        //   name: 'Standart',
        //   type: 'bar',
        //   data: [
        //     {
        //       x: 'Cold Storage',
        //       y: [-17, -20],
        //     },
        //     {
        //       x: 'Storage B1',
        //       y: [9, 10],
        //     },
        //     {
        //       x: 'Storage B2',
        //       y: [8, 14],
        //     },
        //     {
        //       x: 'Storage B3',
        //       y: [19, 20],
        //     },
        //     {
        //       x: 'WH B',
        //       y: [22, 25],
        //     },
        //     {
        //       x: 'WH A',
        //       y: [30, 20],
        //     },
        //     {
        //       x: 'Gudang Chemical',
        //       y: [7, 12],
        //     },
        //     {
        //       x: 'WH Packaging Pocari',
        //       y: [21, 22],
        //     },
        //     {
        //       x: 'WH C',
        //       y: [21, 21],
        //     },
        //   ],
        // },
      ],
      humiditySoyjoy: [{ data: [90, 92, 95, 80, 88] }],
      humidityPocari: [{ data: [90, 92, 95, 80, 88] }],
      chart: {
        height: 300,
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
      dataLabelsTemperature: {
        enabled: true,
        formatter: function (val: any) {
          return val + '°C';
        },
      },
      dataLabelsHumidity: {
        enabled: true,
        formatter: function (val: any) {
          return val + '%';
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
      xHumiditySoyjoy: {
        categories: [
          'Storage D1',
          'Storage D3',
          'Storage D4',
          'Storage D6',
          'Connection Room',
        ],
      },
      xHumidityPocari: {
        categories: ['WH B', 'WH A', 'Gudang Chemical', 'WH Packaging', 'WH C'],
      },
      xaxis: {
        labels: {
          rotate: 0,
        },
        // categories: [
        //   'Cold Storage',
        //   'Storage B1',
        //   'Storage B2',
        //   'Storage B3',
        //   'WH B',
        //   'WH A',
        //   'Gudang Chemical',
        //   'WH Packaging',
        //   'WH C',
        // ],
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
