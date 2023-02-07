import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexLegend,
  ApexYAxis,
  ApexResponsive,
} from 'ng-apexcharts';
Chart.register(...registerables);

export type ChartOptions = {
  seriesK: ApexAxisChartSeries;
  seriesS: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  lables: String[];
  titleK: ApexTitleSubtitle;
  titleS: ApexTitleSubtitle;
  plotOptionsK: ApexPlotOptions;
  plotOptionsS: ApexPlotOptions;
  fillK: ApexFill;
  fillS: ApexFill;
  stroke: ApexStroke;
};

export type BarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive;
};

export type ColumnCart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') chartCom!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public barChart!: Partial<BarChart> | any;
  public columnChart!: Partial<ColumnCart> | any;
  sku = '38';
  constructor() {
    this.funRadialChart();
    this.funBarChart();
    this.funColumnChart();
  }

  ngOnInit(): void {}

  funBarChart() {
    this.barChart = {
      series: [
        {
          name: '350ml',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: '500ml',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: '900ml',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'IW 350ml',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'IW 500ml',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJWM',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJSB',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJRA',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJAC',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJMO',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: 'SJDC',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadiusApplication: 'around',
          dataLabels: {
            maxItems: 100,
            hideOverflowingLabels: true,
            value: {
              color: '#111',
              fontSize: '25px',
              show: true,
              fontFamily: 'manrope',
            },
            total: {
              enabled: false,

              offsetX: 50,
              offsetY: 0,
              style: {
                color: '#373d3f',
                fontSize: '12px',
                fontFamily: 'manrope',
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'manrope',
          fontSize: '10px',
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Sales Vs Delivery',
        align: 'center',
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      xaxis: {
        categories: [
          '01-22-2023',
          '01-23-2023',
          '01-24-2023',
          '01-25-2023',
          '01-26-2023',
          '01-27-2023',
          '01-28-2023',
        ],
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'manrope',
          },
        },
      },
      tooltip: {},
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.2,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        fontFamily: 'manrope',
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
          },
        },
      ],
    };
  }

  funRadialChart() {
    this.chartOptions = {
      seriesK: [60],
      seriesS: [75],
      chart: {
        height: 350,
        type: 'radialBar',
        events: {
          click(event: any, chartContext: any, config: any) {
            console.log(event);
            console.log(chartContext);
          },
        },
      },
      titleK: {
        text: 'Kejayan',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '30px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titleS: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '30px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      labels: [this.sku + ' SKU'],
      fillK: {
        colors: ['#00FFC6'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.3,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      fillS: {
        colors: ['#30AADD'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.3,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      plotOptionsK: {
        radialBar: {
          dataLabels: {
            name: {
              offsetY: -5,
              show: true,
              color: '#008063',
              fontSize: '27px',
              fontFamily: 'manrope',
              fontWeight: 700,
            },
            value: {
              color: '#111',
              fontSize: '25px',
              show: true,
              fontFamily: 'manrope',
            },
          },
        },
      },
      plotOptionsS: {
        radialBar: {
          dataLabels: {
            name: {
              offsetY: -5,
              show: true,
              color: '#1A5B77',
              fontSize: '27px',
              fontFamily: 'manrope',
              fontWeight: 700,
            },
            value: {
              color: '#111',
              fontSize: '25px',
              show: true,
              fontFamily: 'manrope',
            },
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
    };
  }
  funColumnChart() {
    this.columnChart = {
      series: [
        {
          name: 'Percentage',
          data: [
            0.18, 0.22, 0.86, 0.19, 0.13, 0.1, 2.26, 1.96, 1.63, 0.04, 1.69,
          ],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: [
          '350ml',
          '500ml',
          '900ml',
          'IW 350ml',
          'IW 500ml',
          'SJWM',
          'SJSB',
          'SJRA',
          'SJAC',
          'SJMO',
          'SJDC',
        ],
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + '%';
          },
        },
      },
      title: {
        text: 'Sales Vs Delivery',
        align: 'center',
        offsetY: 320,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
    };
  }
}
