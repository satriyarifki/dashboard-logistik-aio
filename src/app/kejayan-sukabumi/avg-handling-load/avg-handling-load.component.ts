import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AVGHandlingLoadChart } from './avgHandlingLoad';

@Component({
  selector: 'app-avg-handling-load',
  templateUrl: './avg-handling-load.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./avg-handling-load.component.css'],
})
export class AvgHandlingLoadComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<AVGHandlingLoadChart> | any;

  constructor() {
    this.avgHandlingLoad();
  }
  avgHandlingLoad() {
    this.chartOptions = {
      series: [
        {
          name: 'Kejayan',
          data: [2.5, 3.5, 5, 4, 3, 2.8, 2.85, 3, 2.5, 3, 2, 2.7],
        },
        {
          name: 'Sukabumi',
          data: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: 5,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
        ],
      },
      titleKejayan: {
        text: 'In mio Carton',
        align: 'left',
        style: {
          fontFamily: 'Exo',
          fontSize: '20px',
        },
      },
      titleSukabumi: {
        text: 'From Sukabumi',
        align: 'left',
        style: {
          fontFamily: 'Exo',
          fontSize: '20px',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.4,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          
        },
      },
      markers: {
        size: 1,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      yaxis: {
        // min: 0,
        // max: 310,
        title: {
          text: 'Carton',
        },
      },
    };
  }
}
