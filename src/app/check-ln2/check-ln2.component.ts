import { Component } from '@angular/core';
import { CheckLnChart, ColumnLnYesterday } from '../ApexChart';

@Component({
  selector: 'app-check-ln2',
  templateUrl: './check-ln2.component.html',
  styleUrls: ['./check-ln2.component.css'],
})
export class CheckLn2Component {
  public checkLnChart!: Partial<CheckLnChart> | any;
  public lnYesterday: Partial<ColumnLnYesterday> | any;
  time: any;

  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  constructor() {
    this.getCurrentDate();
    this.chart();
  }

  chart() {
    this.checkLnChart = {
      series: [
        {
          name: ['Level Ln2'],
          type: 'column',
          data: [4983, 5552, 2320],
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
          data: [180],
        },
        {
          name: 'Std Level Refill',
          type: 'column',
          data: [110],
        },
      ],
      chart: {
        height: 300,
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
      labels: ['Samator TB1 (LN)', 'Samator TB2 (N2)', 'Samator Soyjoy (LN2)'],
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
    this.lnYesterday = {
      series: [
        {
          name: '',
          data: [
            168, 168, 168, 168, 166, 166, 166, 166, 166, 164, 164, 164, 164,
            164, 164, 164, 164, 164, 162, 162, 162, 162, 162, 162,
          ],
        },
      ],
      series2: [
        {
          name: '',
          data: [
            4500, 4500, 4490, 4490, 4490, 4480, 4470, 4470, 4450, 4450, 4440,
            4430, 4420, 4410, 4390, 4370, 4360, 4350, 4340, 4330, 4320, 4310,
            4290, 4270,
          ],
        },
      ],
      series3: [
        {
          name: '',
          data: [
            1860, 1855, 1855, 1850, 1840, 1840, 1835, 1835, 1830, 1825, 1824,
            1820, 1818, 1817, 1815, 1813, 1810, 1810, 1805, 1805, 1805, 1805,
            1805, 1805,
          ],
        },
      ],
      series4: [
        {
          name: '',
          data: [
            5500, 5500, 5490, 5490, 5490, 5480, 5470, 5470, 5450, 5450, 5440,
            5430, 5420, 5410, 5390, 5370, 5360, 5350, 5340, 5330, 5320, 5310,
            5290, 5270,
          ],
        },
      ],
      chart: {
        type: 'area',
        height: 300,
        zoom: {
          enabled: false,
        },
        toolbar: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      labels: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:00:00.000Z',
        '2018-09-19T02:00:00.000Z',
        '2018-09-19T03:00:00.000Z',
        '2018-09-19T04:00:00.000Z',
        '2018-09-19T05:00:00.000Z',
        '2018-09-19T06:00:00.000Z',
        '2018-09-19T07:00:00.000Z',
        '2018-09-19T08:00:00.000Z',
        '2018-09-19T09:00:00.000Z',
        '2018-09-19T10:00:00.000Z',
        '2018-09-19T11:00:00.000Z',
        '2018-09-19T12:00:00.000Z',
        '2018-09-19T13:00:00.000Z',
        '2018-09-19T14:00:00.000Z',
        '2018-09-19T15:00:00.000Z',
        '2018-09-19T16:00:00.000Z',
        '2018-09-19T17:00:00.000Z',
        '2018-09-19T18:00:00.000Z',
        '2018-09-19T19:00:00.000Z',
        '2018-09-19T20:00:00.000Z',
        '2018-09-19T21:00:00.000Z',
        '2018-09-19T22:00:00.000Z',
        '2018-09-19T23:00:00.000Z',
      ],
      xaxis: {
        type: 'datetime',
        // min: new Date("01 Mar 2012").getTime(),
        labels: {
          format: 'HH:mm',
        },
      },
      colors: [
        '#0795FA',
        // '#607EAA',
      ],
      colors2: [
        // '#00ABB3',
        '#19FC9C',
      ],
      colors3: ['#FAEA1B'],
      colors4: ['#ED3FFA'],
      xaxis2: {
        type: 'datetime',
        min: new Date('2018-09-19T08:00:00.000Z').getTime(),
        max: new Date('2018-09-19T16:00:00.000Z').getTime(),
        labels: {
          format: 'HH:mm',
        },
      },
      markers: {
        size: 5,
        // colors: ['#FFA41B'],
        // strokeColors: '#fff',
        // strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: 'inchH₂O',
          style: {
            // color: undefined,
            fontSize: '12px',
            fontFamily: 'Manrope',
            fontWeight: 700,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      yaxis2: {
        // opposite: true,
        title: {
          text: 'mmH₂O',
          style: {
            // color: undefined,
            fontSize: '12px',
            fontFamily: 'Manrope',
            fontWeight: 700,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
          format: 'hh:mm dd-MM-yyyy',
          // formatter: undefined,
        },
      },
      legend: {
        horizontalAlign: 'left',
      },
    };
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
