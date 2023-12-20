import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import {
  multiColumnChart,
  MultiLineChart,
  pieChart,
  ShippingChart,
} from '../ApexChart';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';
import { DeleteApiService } from '../services/delete-api/delete-api.service';

@Component({
  selector: 'app-budget-factory',
  templateUrl: './budget-factory.component.html',
  styleUrls: ['./budget-factory.component.css'],
})
export class BudgetFactoryComponent {
  public shippingChart!: Partial<ShippingChart> | any;
  public multiLineChart!: Partial<MultiLineChart> | any;
  public multiColumnChart!: Partial<multiColumnChart> | any;
  public pieChart!: Partial<pieChart> | any;
  time: any;
  lastData: number[] = []
  lastIndex: number = 0

  colorsBudget = [
    'bg-indigo-50 text-indigo-900',
    'bg-emerald-50 text-emerald-900',
    'bg-amber-50 text-amber-900',
    'bg-fuchsia-50 text-fuchsia-900',
  ];


  //API
  budgetFactoryKjy: any[] = [];
  budgetFactorySkb: any[] = [];
  budgetHandling: any[] = [];
  budgetOverhead: any[] = [];
  budgetShipping: any[] = [];
  budgetSummary: any[] = [];
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
    
    forkJoin(
      apiService.getBudgetFactoryKjyByyear(new Date().getFullYear()),
      apiService.getBudgetFactorySkbByYear(new Date().getFullYear()),
      apiService.getBudgetHandlingByYear(new Date().getFullYear()),
      apiService.getBudgetOverheadByYear(new Date().getFullYear()),
      apiService.getBudgetShipping(),
      apiService.getBudgetSummary(),
      apiService.getBudgetFohDistribution()
    ).subscribe((res) => {
      this.budgetFactoryKjy = res[0];
      this.budgetFactorySkb = res[1];
      this.budgetHandling = res[2];
      this.budgetOverhead = res[3];
      this.budgetShipping = res[4];
      this.budgetSummary = res[5];
      this.fohDistribution = res[6];
      this.chart();
      spinner.hide();
    });
  }

  chart() {
    this.lastData = this.dataHandling.kjy.filter(data=>data!=0)
    this.lastIndex = this.lastData.length-1
    
    //
    this.shippingChart = {
      series: [
        {
          name: 'serie1',
          data: this.dataShippingKjy.value,
        },
      ],
      series2: [
        {
          name: 'serie1',
          data: this.dataShippingSkb.value,
        },
      ],
      chart: {
        type: 'bar',
        height: '200px',
        offsetY: -13,
        toolbar: {
          offsetY: 30,
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          endingShape: 'rounded',
          borderRadius: 3,
          dataLabels: {
            position: 'top',
            // hideOverflowingLabels: false,
            total: {
              enabled: true,
            },
          },
        },
      },
      title: {
        text: 'Ctn(Thousand)',
        align: 'right',
        margin: 0,
        offsetY: 5,
        floating: true,
        style: {
          fontSize: '11px',
          fontFamily: 'Manrope',
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 13,
        // offsetY: -7,
        textAnchor: 'middle',
        formatter: function (val: any, opts: any) {
          let seriess: number = 0;
          seriess = opts.config.series[0].data.reduce(
            (acc: any, val: any) => acc + val,
            0
          );
          let percent = ((val / seriess) * 100).toFixed(1);
          // console.log(opts.config.series[0].data);
          return [val + 'K' + '\xa0'.repeat(2) + ' ' + percent + '%'];
          // return [val + 'K' , ' ' + percent + '%'];
        },
        background: {
          enabled: false,
          padding: 5,
          opacity: 0.2,
        },
        style: {
          fontSize: '12px',
          // colors: ['#000'],
          // colors: ['#AB46D2', '#FF0BAC', '#00BEC5', '#E48F45', '#6499E9'],
          colors: ['#490663', '#590040', '#003C2E', '#61400C', '#01233D'],
        },
        dropShadow: {
          enabled: false,
          color: '#fff',
          top: 0.5,
          left: 0.5,
          blur: 0.5,
          opacity: 1,
        },
      },
      colors: ['#BEADFA', '#FE7BE5', '#85E6C5', '#F8DE22', '#75C2F6'],
      // colors: ['#AB46D2', '#FF0BAC', '#00BEC5', '#E48F45', '#6499E9'],

      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: this.dataShippingKjy.labels,
        max:
          Math.max(...this.dataShippingKjy.value) +
          Math.max(...this.dataShippingKjy.value) / 3,
      },
      xaxis2: {
        labels: {
          show: false,
        },
        categories: this.dataShippingSkb.labels,
        max:
          Math.max(...this.dataShippingSkb.value) +
          Math.max(...this.dataShippingSkb.value) / 3,
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'Manrope',
            // colors: ['#53BF9D', '#BD4291','#F94C66','#53BF9D','#3AB0FF'],
            // colors: ['#FF6D60', '#F7D060','#F3E99F','#98D8AA','#A6D0DD'],
          },
        },
      },
      legend: {
        show: false,
      },
    };

    this.multiLineChart = {
      series: [
        {
          name: 'Kejayan',
          data: this.dataHandling.kjy,
        },
        {
          name: 'Sukabumi',
          data: this.dataHandling.skb,
        },
      ],
      series2: [
        {
          name: 'Kejayan',
          data: this.dataOverhead.kjy,
        },
        {
          name: 'Sukabumi',
          data: this.dataOverhead.skb,
        },
      ],
      chart: {
        height: '235px',
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#ed6a5e', '#3BACB6'],
      dataLabels: {
        enabled: true,
        formatter: (val: any, opts: any) => {
          // console.log(this.lastIndex);
          if(opts.dataPointIndex==this.lastIndex){
            return val
          }
          
        },
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Warehouse Handling Load',
        align: 'left',
        style: {
          fontSize: '16px',
          fontFamily: 'Manrope',
        },
      },
      title2: {
        text: 'Factory Overhead per Unit',
        align: 'left',
        style: {
          fontSize: '16px',
          fontFamily: 'Manrope',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: this.dataHandling.labels,
        // title: {
        //   text: 'Month',
        //   offsetY: -15,
        // },
      },
      yaxis: {
        title: {
          text: 'Mio Carton',
          style: {
            fontSize: '12px',
            fontFamily: 'Manrope',
            cssClass: 'font-bold font-manrope',
          },
        },
      },
      yaxis2: {
        title: {
          text: 'Rp/Carton',
          style: {
            fontSize: '12px',
            fontFamily: 'Manrope',
            cssClass: 'font-bold font-manrope',
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
    this.multiColumnChart = {
      series: [
        {
          name: 'BUD',
          data: this.dataBudgetSkb.bud,
        },
        {
          name: 'FOH',
          data: this.dataBudgetSkb.foh,
        },
      ],
      series2: [
        {
          name: 'BUD',
          data: this.dataBudgetKjy.bud,
        },
        {
          name: 'FOH',
          data: this.dataBudgetKjy.foh,
        },
      ],
      chart: {
        type: 'bar',
        height: '260px',
        toolbar: {
          offsetY: 30,
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '75%',
          endingShape: 'rounded',
          borderRadius: 2,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        style: {
          fontSize: 10,
          fontFamily: 'Manrope',
          fontWeight: 700,
        },
        background: {
          enabled: true,
          foreColor: '',
          padding: 2,
          borderRadius: 2,
          borderWidth: 1,
          // borderColor: '#6d72c3',
          opacity: 0.9,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45,
          },
        },
      },
      colors: ['#ff8e72', '#ed6a5e'],
      colors2: [
        '#8FE3CF',
        '#3BACB6',
        // '#2F8F9D',
      ],
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      title: {
        text: 'Bio',
        align: 'left',
        margin: 0,
        offsetY: 5,
        floating: true,
        style: {
          fontSize: '12px',
          fontFamily: 'Manrope',
        },
      },
      xaxis: {
        categories: this.dataBudgetKjy.labels,
      },
      yaxis: {
        show: false,
        // floating: true,
        title: {
          text: 'Bio',
          offsetX: 10,
          style: {
            fontSize: 10,
            fontFamily: 'Manrope',
            fontWeight: 700,
          },
        },
        labels: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return '$ ' + val + ' thousands';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        fontWeight: 500,
        fontFamily: 'Manrope',
      },
    };
    this.pieChart = {
      series: this.dataFohDistribution.percentage,
      chart: {
        height: 'auto',
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
    };
  }

  get dataShippingKjy() {
    let value: any[] = [];
    let label: any[] = [];
    const datas = this.budgetShipping.filter((data) => data.from == 'Kejayan');
    datas.forEach((elem) => {
      value.push(elem.qty_carton);
      label.push(elem.destination);
    });
    return { value: value, labels: label };
  }
  get dataShippingSkb() {
    let value: any[] = [];
    let label: any[] = [];
    const datas = this.budgetShipping.filter((data) => data.from == 'Sukabumi');
    datas.forEach((elem) => {
      value.push(elem.qty_carton);
      label.push(elem.destination);
    });
    return { value: value, labels: label };
  }
  get dataHandling() {
    let kjy: any[] = [];
    let skb: any[] = [];
    let label: any[] = [];
    this.budgetHandling.forEach((elem) => {
      kjy.push(elem.kjy);
      skb.push(elem.skb);
      label.push(formatDate(elem.date, 'MMM', this.locale));
    });
    return { kjy: kjy, skb: skb, labels: label };
  }
  get dataOverhead() {
    let kjy: any[] = [];
    let skb: any[] = [];
    let label: any[] = [];
    this.budgetOverhead.forEach((elem) => {
      kjy.push(elem.kjy);
      skb.push(elem.skb);
      label.push(formatDate(elem.date, 'MMM', this.locale));
    });
    return { kjy: kjy, skb: skb, labels: label };
  }
  get dataBudgetKjy() {
    let bud: any[] = [];
    let foh: any[] = [];
    let label: any[] = [];
    const datas = this.budgetFactoryKjy.filter((data) => data.from == 'Kejayan');
    datas.forEach((elem) => {
      bud.push(elem.bud);
      foh.push(elem.foh);
      label.push(formatDate(elem.date, 'MMM', this.locale));
    });
    return { bud: bud, foh: foh, labels: label };
  }
  get dataBudgetSkb() {
    let bud: any[] = [];
    let foh: any[] = [];
    let label: any[] = [];
    const datas = this.budgetFactorySkb.filter((data) => data.from == 'Sukabumi');
    datas.forEach((elem) => {
      bud.push(elem.bud);
      foh.push(elem.foh);
      label.push(formatDate(elem.date, 'MMM', this.locale));
    });
    return { bud: bud, foh: foh, labels: label };
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
