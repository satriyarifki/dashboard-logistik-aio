import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { LogarithmicScale } from 'chart.js';
import { ChartComponent } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ProductService } from '../services/product.service';
import { TempChart } from './../ApexChart';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public tempChart!: Partial<TempChart> | any;
  public loading = false;
  xTempPocari: any = [
    ['Cold', 'Storage'],
    ['Storage', 'B1'],
    ['Storage', 'B2'],
    ['Storage', 'B3'],
    'WH B',
    'WH A',
    ['Gudang', 'Chemical'],
    ['WH', 'Packaging'],
    'WH C',
  ];
  xTempSoyjoy: any = [
    ['Cold', 'Storage'],
    ['Storage', 'D1'],
    ['Storage', 'D2'],
    ['Storage', 'D3'],
    ['Storage', 'D4'],
    ['Storage', 'D6'],
    ['Storage', 'D7'],
    ['Connection ', ' Room'],
  ];
  goalTempPocari: any = [
    [
      {
        name: 'Standart',
        value: -18,
        strokeColor: '#35e300',
      },
    ],
    [
      {
        name: 'Min Standart',
        value: 0,
        strokeColor: '#e0e800',
      },
      {
        name: 'Max Standart',
        value: 10,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 15,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 15,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
  ];
  goalTempSoyjoy: any = [
    [
      {
        name: 'Standart',
        value: -18,
        strokeColor: '#35e300',
      },
    ],
    [
      {
        name: 'Standart',
        value: 23,
        strokeColor: '#35e300',
      },
      {
        name: 'Min Standart',
        value: 21,
        strokeColor: '#e0e800',
      },
      {
        name: 'Max Standart',
        value: 25,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Standart',
        value: 7,
        strokeColor: '#35e300',
      },
    ],
    [
      {
        name: 'Standart',
        value: 20,
        strokeColor: '#35e300',
      },
      {
        name: 'Min Standart',
        value: 18,
        strokeColor: '#e0e800',
      },
      {
        name: 'Max Standart',
        value: 22,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Standart',
        value: 23,
        strokeColor: '#35e300',
      },
      {
        name: 'Min Standart',
        value: 21,
        strokeColor: '#e0e800',
      },
      {
        name: 'Max Standart',
        value: 25,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Max Standart',
        value: 35,
        strokeColor: '#e32200',
      },
    ],
    [
      {
        name: 'Standart',
        value: 7,
        strokeColor: '#35e300',
      },
    ],
    [
      {
        name: 'Standart',
        value: 23,
        strokeColor: '#35e300',
      },
      {
        name: 'Min Standart',
        value: 21,
        strokeColor: '#e0e800',
      },
      {
        name: 'Max Standart',
        value: 25,
        strokeColor: '#e32200',
      },
    ],
  ];
  yTempPocari: any[] = [];
  yTempSoyjoy: any[] = [];
  time: any;
  tempPocari: any;
  tempSoyjoy: any;
  humPocari: any[] = [];
  humSoyjoy: any[] = [];
  dataTempPocari: any[] = [];
  dataTempSoyjoy: any[] = [];

  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  constructor(
    private apiService: ApiService,
    public loader: LoaderService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getCurrentDate();
    this.tempChartFunc();
    this.getData();

    setInterval(() => {
      this.getData();
      this.spinner.hide();
    }, 5 * 60 * 1000);
  }

  // GET DATA PROCESS ============================================ //
  getData() {
    this.spinner.show();

    forkJoin(
      this.apiService.getTempPocari(),
      this.apiService.getTempSoyjoy()
    ).subscribe(
      ([pocari, soyjoy]) => {
        this.tempPocari = pocari[0];
        this.tempSoyjoy = soyjoy[0];

        this.humPocari.length = 0;
        this.humSoyjoy.length = 0;
        this.humSoyjoy.push(
          0,
          0,
          this.tempPocari.RH_strgD4,
          this.tempPocari.RH_add_strg,
          this.tempPocari.RH_conect_room
        );

        this.humPocari.push(
          pocari[0].RH_gdGula,
          pocari[0].RH_Gresin,
          pocari[0].RH_WHchemi,
          pocari[0].RH_WHpack_pocari,
          pocari[0].RH_FG_pocari
        );

        this.yTempSoyjoy.length = 0;
        this.yTempSoyjoy.push(
          soyjoy[0].Temp_Cold_Storage,
          soyjoy[0].Temp_RM_Storage,
          soyjoy[0].Temp_RM_7,
          soyjoy[0].Temp_Soy_Flour,
          // pocari[0].temp_strgD4,
          0,
          pocari[0].temp_add_strg,
          pocari[0].temp_strgD7,
          pocari[0].temp_conect_room
        );

        this.yTempPocari.length = 0;
        this.yTempPocari.push(
          pocari[0].tempColdStr,
          pocari[0].temp_B1anteroom,
          pocari[0].temp_B2_Flavour1,
          pocari[0].temp_B3_Flavour2.toFixed(1),
          pocari[0].temp_gdGula,
          pocari[0].temp_Gresin,
          pocari[0].temp_WHchemi,
          pocari[0].temp_WHpack_pocari,
          pocari[0].temp_FG_pocari
        );

        this.dataTempPocari.length = 0;
        this.dataTempSoyjoy.length = 0;
        for (
          let i = 0;
          i < this.yTempPocari.length && this.yTempSoyjoy.length;
          i++
        ) {
          this.dataTempPocari.push({
            x: this.xTempPocari[i],
            y: this.yTempPocari[i],
            goals: this.goalTempPocari[i],
          });
          if (this.yTempSoyjoy[i] != null) {
            this.dataTempSoyjoy.push({
              x: this.xTempSoyjoy[i],
              y: this.yTempSoyjoy[i],
              goals: this.goalTempSoyjoy[i],
            });
          }
        }
        this.tempChartFunc();
      },
      (err) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  // Chart Variable ========================================= //
  tempChartFunc() {
    this.tempChart = {
      seriesSoyjoy: [
        {
          name: 'Actual',
          data: this.dataTempSoyjoy,
        },
      ],
      seriesPocari: [
        {
          name: 'Actual',
          data: this.dataTempPocari,
        },
      ],
      humiditySoyjoy: [
        {
          data: this.humSoyjoy,
        },
      ],
      humidityPocari: [
        {
          data: this.humPocari,
        },
      ],
      chart: {
        height: 300,
        type: 'bar',
        events: {
          click: (event: any, chartContext: any, config: any) => {
            // if (config.config.title.text == 'Kejayan') {

            // }
            // if (config.config.title.text == 'Sukabumi') {

            // }
            console.log(config);
          },
        },
      },
      chart2: {
        height: 200,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          colors: {
            ranges: [
              {
                from: -20,
                to: 0,
              },
            ],
          },
          columnWidth: '80%',
          borderRadius: 5,
          endingShape: 'rounded',
        },
      },
      plotOptionsHorizontal: {
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
          borderRadius: 5,
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
          ['Connection', 'Room'],
        ],
      },
      xHumidityPocari: {
        categories: [
          'WH B',
          'WH A',
          ['Gudang', 'Chemical'],
          ['WH', 'Packaging'],
          'WH C',
        ],
      },
      xaxis: {
        labels: {
          rotate: 0,
        },
      },
      yaxis: {
        min: -25,
        max: 45,
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
