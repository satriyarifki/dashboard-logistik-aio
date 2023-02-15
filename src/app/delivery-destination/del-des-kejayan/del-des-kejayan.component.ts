import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { DeliveryDesChart } from '../deliveryDestinationChart';

@Component({
  selector: 'app-del-des-kejayan',
  templateUrl: './del-des-kejayan.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./del-des-kejayan.component.css'],
})
export class DelDesKejayanComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<DeliveryDesChart> | any;

  constructor() {
    this.chartDelDes();
  }
  chartDelDes() {
    this.chartOptions = {
      series: [40, 32, 19, 6, 3],
      chart: {
        width: 540,
        type: 'donut',
        event: {
          legendClick: function (
            chartContext: any,
            seriesIndex: any,
            config: any
          ) {
            console.log('success');
          },
        },
      },
      titleKejayan: {
        text: 'Kejayan',
        align: 'center',
        offsetY: -10,
        offsetX: -80,
        style: {
          fontSize: '30px',
          fontFamily: 'Exo',
          fontWeight: 600,
        },
      },
      titleSukabumi: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: -10,
        offsetX: -80,
        style: {
          fontSize: '30px',
          fontFamily: 'Exo',
          fontWeight: 600,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'manrope',
          fontWeight: 500,
        },
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        show: true,
        offsetX: 15,
        offsetY: 80,
        horizontalAlign: 'center',
        fontSize: '18px',
        fontFamily: 'manrope',
        fontWeight: 400,
      },
      labels: ['Distributor', 'ODI', 'Export', 'Intersite WH', 'LDC'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 320,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
