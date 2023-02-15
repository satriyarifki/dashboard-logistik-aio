import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TrackingFromChart } from '../truckingChart';

@Component({
  selector: 'app-trucking-sukabumi',
  templateUrl: './trucking-sukabumi.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./trucking-sukabumi.component.css'],
})
export class TruckingSukabumiComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public trackingFromChart!: Partial<TrackingFromChart> | any;
  check = false;

  constructor() {
    this.trackingFromChart = {
      series: [
        // {
        //   name: 'Kejayan',
        //   data: [227, 235, 11, 105, 22],
        // },
        {
          name: 'Sukabumi',
          data: [365, 394, 52, 25, 51],
        },
      ],
      title: {
        text: 'Tracking From Kejayan',
      },
      chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        events: {
          legendClick: function (
            chartContext: any,
            seriesIndex: any,
            config: any
          ) {
            console.log(chartContext);

            console.log('clicked');
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 5,
          borderRadiusApplication: 'around',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'manrope',
          fontSize: '15px',
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: ['Container', 'Wing Box', 'Tronton', 'Fuso', 'Colt Diesel'],
        labels: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'manrope',
            fontSize: '15px',
            fontWeight: 600,
          },
        },
      },
      responsive: [
        {
          breakpoint: 650,
          options: {
            chart: {
              height: 300,
            },
            yaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: '10px',
                  fontWeight: 400,
                },
              },
            },
          },
        },
      ],
    };
  }
}
