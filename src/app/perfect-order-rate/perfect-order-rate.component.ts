import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { PerfectOrderRateChart } from './perfectOrderRate';

@Component({
  selector: 'app-perfect-order-rate',
  templateUrl: './perfect-order-rate.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./perfect-order-rate.component.css'],
})
export class PerfectOrderRateComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<PerfectOrderRateChart> | any;
  cocok = 876;
  constructor() {
    this.perfectOrderRate();
  }
  perfectOrderRate() {
    this.chartOptions = {
      series: [67],
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -105,
          endAngle: 105,
          dataLabels: {
            name: {
              fontSize: '18px',
              color: undefined,
              fontFamily: 'Quicksand',
              offsetY: 40,
              fontWeight: 600,
            },
            value: {
              offsetY: 0,
              fontSize: '25px',
              fontFamily: 'Quicksand',
              fontWeight: 600,
              color: undefined,
              formatter: function (val: any) {
                return val + '%';
              },
            },
          },
        },
      },
      titleKejayan: {
        text: 'Kejayan',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '30px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleSukabumi: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: 20,
        style: {
          fontSize: '30px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 10,
      },
      labels: [this.cocok + ' Shipment'],
    };
  }
}
