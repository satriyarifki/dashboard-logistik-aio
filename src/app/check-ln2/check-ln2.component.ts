import { formatDate } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { CheckLnChart, ColumnLnYesterday } from '../ApexChart';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-check-ln2',
  templateUrl: './check-ln2.component.html',
  styleUrls: ['./check-ln2.component.css'],
})
export class CheckLn2Component {
  //CHART
  public checkLnChart!: Partial<CheckLnChart> | any;
  public lnYesterday: Partial<ColumnLnYesterday> | any;

  //TOOLS
  time: any;
  datetimeUpdate: any;
  yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

  //API
  newestLevel: any[] = [];
  levelYesterday: any[] = [];

  //Chart
  airProductData:any[] = []
  airProductLabels:any[] = []
  samatorSoyjoyData:any[] = []
  samatorSoyjoyLabels:any[] = []
  samatorTB1Data:any[] = []
  samatorTB1Labels:any[] = []
  samatorTB2Data:any[] = []
  samatorTB2Labels:any[] = []

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

    console.log(this.yesterday);

    forkJoin(
      apiService.getCheckLevelNewest(),
      apiService.getReportLn2All(this.yesterday.toISOString()
      .slice(0, 10))
    ).subscribe(
      (res) => {
        this.newestLevel = res[0];
        this.levelYesterday = res[1];
        console.log(this.levelYesterday);
        console.log(this.yesterdayData(1));
        let d = new Date(this.newestLevel[0]?.date);
        d.setHours(this.newestLevel[0]?.jam.slice(0, 2));
        this.datetimeUpdate = d;
        this.chart();
        spinner.hide();
      },
      (err) => {
        spinner.hide();
        console.log(err);
      }
    );
  }

  yesterdayData(tankiId:number){
    let value:any[] = []
    let label:any[] = []
    
    this.filterLevelByTanki(tankiId).forEach(elem=>{
      value.push(elem.level)
      label.push(elem.jam)
    })
    if (value.length) {
      
    }
    return {value:value.reverse(),label:label.reverse()}
  }

  filterLevelByTanki(tankiId:number){
    return this.levelYesterday.filter(data=>data.tankiId == tankiId)
  }

  chart() {
    console.log(this.newestLevel[0].level);

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
          data: this.yesterdayData(1).value
        },
      ],
      series2: [
        {
          name: '',
          data: this.yesterdayData(2).value
        },
      ],
      series3: [
        {
          name: '',
          data: this.yesterdayData(3).value
        },
      ],
      series4: [
        {
          name: '',
          data: this.yesterdayData(4).value
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
      labels: this.yesterdayData(1).label,
      labels2: this.yesterdayData(2).label,
      labels3: this.yesterdayData(3).label,
      labels4: this.yesterdayData(4).label,
      xaxis: {
        // type: 'datetime',
        // // min: new Date("01 Mar 2012").getTime(),
        labels: {
          formatter: function(value:any) {
            return String(value).slice(0,5)
          }
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
      markers: {
        size: 5,
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
