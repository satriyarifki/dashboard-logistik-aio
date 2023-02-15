import { Component, ViewChild } from '@angular/core';
import { occupancyApex } from './occupancyCharts';
import { ChartComponent } from 'ng-apexcharts';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.css'],
  host: { class: 'flex justify-center' },
})
export class OccupancyComponent {
  @ViewChild('chart') chartCom!: ChartComponent;
  public occupancyApex!: Partial<occupancyApex> | any;
  constructor(private router: Router) {
    this.occupancyChart();
  }
  occupancyChart() {
    this.occupancyApex = {
      series: [76],
      titleKejayan: {
        text: 'Kejayan',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titleSukabumi: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titleMargomulyo: {
        text: 'DHL Margomulyo',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titleBekasi: {
        text: 'LDC Bekasi',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titlePasarRebo: {
        text: 'LDC PasarRebo',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      titleCikarang: {
        text: 'YCH Cikarang',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '25px',
          fontFamily: 'Fonarto',
          fontWeight: 500,
        },
      },
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: 0,
        size: 500,
      },
      grid: {
        show: true,
        padding: {
          top: 0,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2,
            },
          },
          hollow: {
            margin: 5,
            size: '40%',
            background: 'transparent',
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'front',
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ['Average Results'],
    };
  }
}
