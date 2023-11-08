import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { CheckLnChart, TempChart } from '../ApexChart';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rmpm-collection',
  templateUrl: './rmpm-collection.component.html',
  styleUrls: ['./rmpm-collection.component.css'],
})
export class RmpmCollectionComponent {
  public checkLnChart!: Partial<CheckLnChart> | any;
  public tempChart!: Partial<TempChart> | any;
  //TOOLS
  time: any;
  dateUpdateOccu: any;
  dateUpdateCheck: any;

  //API
  occuLastApi: any[] = [];
  newestLevel: any[] = [];
  tempSoyjoy: any[] = [];
  tempPocari: any[] = [];

  //CHARTS
  yTempPocari: any[] = [];
  yTempSoyjoy: any[] = [];
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
    private spinner: NgxSpinnerService
  ) {
    spinner.show();
    this.getCurrentDate();
    forkJoin(
      apiService.getRmpmOccupancyViewLast(),
      apiService.getCheckLevelNewest(),
      this.apiService.getTempPocari(),
      this.apiService.getTempSoyjoy()
    ).subscribe(
      (data) => {
        this.occuLastApi = data[0];
        this.newestLevel = data[1];
        this.tempPocari = data[2];
        this.tempSoyjoy = data[3];
        //  console.log(this.newestLevel);
        const d = new Date()
        d.setUTCSeconds(this.tempPocari[0].time)
        console.log(d);
        
        this.dateUpdateOccu = this.getDateTime(this.occuLastApi);
        this.dateUpdateCheck = this.getDateTime(this.newestLevel);
        // console.log(this.occuLastApi[0]);
        // console.log(d);

        // console.log(this.occuLastApi[0]?.time.slice(0,2));
        this.pushDataTempChart();
        this.chartCheckLn2();
        spinner.hide();
      },
      (err) => {
        console.log(err);
        spinner.hide();
      }
    );
  }

  chartCheckLn2() {
    this.checkLnChart = {
      series: [
        {
          name: ['Level Ln2'],
          type: 'column',
          data: [
            this.newestLevel[1].level,
            this.newestLevel[2].level,
            this.newestLevel[3].level,
          ],
        },
        {
          name: 'Std Level Refill',
          type: 'line',
          data: [1694, 1250, 839],
        },
      ],
      series2: [
        {
          name: 'Level Ln2',
          type: 'column',
          data: [this.newestLevel[0].level],
        },
        {
          name: 'Std Level Refill',
          type: 'column',
          data: [110],
        },
      ],
      chart: {
        height: 250,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 7,
          endingShape: 'rounded',
        },
      },
      stroke: {
        width: [0, 5],
      },
      stroke2: {
        width: [0, 0],
      },
      title: {
        // text: 'Traffic Sources',
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Quicksand',
        },
        formatter: (params: any) => {
          return this.separateComma(params);
        },
        // enabledOnSeries: [1],
      },
      colors: [
        '#3ac7e0',
        '#acdb12',
        // '#00ABB3',
        // '#00ABB3',
        // '#00ABB3',
        // '#607EAA',
        // '#607EAA',
        // '#607EAA',
      ],
      labels: [['Samator','TB1 (LN)'], ['Samator ','TB2 (N2)'], ['Samator','Soyjoy (LN2)']],
      labels2: ['', ''],
      xaxis: {
        // type: 'datetime',
      },
      yaxis: [
        {
          title: {
            text: 'Level (mmH₂O)',
            style: {
              // color: undefined,
              fontSize: '12px',
              fontFamily: 'Manrope',
              fontWeight: 700,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
        },
      ],
      yaxis2: [
        {
          title: {
            text: 'Level (inchH₂O)',
            style: {
              // color: undefined,
              fontSize: '12px',
              fontFamily: 'Manrope',
              fontWeight: 700,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
        },
      ],
    };
  }

  pushDataTempChart() {
    this.yTempSoyjoy.length = 0;
    this.yTempSoyjoy.push(
      this.tempSoyjoy[0].Temp_Cold_Storage,
      this.tempSoyjoy[0].Temp_RM_Storage,
      this.tempSoyjoy[0].Temp_RM_7,
      this.tempSoyjoy[0].Temp_Soy_Flour,
      // pocari[0].temp_strgD4,
      0,
      this.tempPocari[0].temp_add_strg,
      this.tempPocari[0].temp_strgD7,
      this.tempPocari[0].temp_conect_room
    );

    this.yTempPocari.length = 0;
    this.yTempPocari.push(
      this.tempPocari[0].tempColdStr,
      this.tempPocari[0].temp_B1anteroom,
      this.tempPocari[0].temp_B2_Flavour1,
      this.tempPocari[0].temp_B3_Flavour2.toFixed(1),
      this.tempPocari[0].temp_gdGula,
      this.tempPocari[0].temp_Gresin,
      this.tempPocari[0].temp_WHchemi,
      this.tempPocari[0].temp_WHpack_pocari,
      this.tempPocari[0].temp_FG_pocari
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
    this.tempChartFunc()
  }

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
      chart: {
        height: 250,
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
          return val % 1 == 0 ? val + '°C' : val.toFixed(1) + '°C';
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
        labels:{
          formatter: (params: any) => {
            return params.toFixed()
          },
        }
        
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

  getDateTime(params: any[]) {
    let d = new Date(params[0]?.date);
    d.setHours(params[0]?.time?.slice(0, 2) | params[0]?.jam?.slice(0, 2));
    return d;
  }

  get soyjoyOccu() {
    const occu = this.occuLastApi.filter(
      (data) =>
        data.type == 'Soyjoy' ||
        data.storageId == 14 ||
        data.storageId == 12 ||
        data.storageId == 13
    );

    return occu.sort((a, b) => a.type - b.type);
  }
  get pocariOccu() {
    const occu = this.occuLastApi.filter(
      (data) => data.type == 'Pocari' || data.storageId == 15
    );
    occu.sort(function (a, b) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    });

    return occu;
  }

  numberToPercent(used: number, cap: number) {
    return Number(((used / cap) * 100).toFixed(1));
  }

  separateComma(val: any) {
    // remove sign if negative
    var sign = 1;
    if (val < 0) {
      sign = -1;
      val = -val;
    }
    // trim the number decimal point if it exists
    let num = val.toString().includes('.')
      ? val.toString().split('.')[0]
      : val.toString();
    let len = num.toString().length;
    let result = '';
    let count = 1;

    for (let i = len - 1; i >= 0; i--) {
      result = num.toString()[i] + result;
      if (count % 3 === 0 && count !== 0 && i !== 0) {
        result = ',' + result;
      }
      count++;
    }

    // add number after decimal point
    if (val.toString().includes('.')) {
      result = result + '.' + val.toString().split('.')[1];
    }
    // return result with - sign if negative
    return sign < 0 ? '-' + result : result;
  }
}
