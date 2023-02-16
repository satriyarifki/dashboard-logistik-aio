import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TrackingFromChart } from '../truckingChart';
import { zoomInVar } from 'src/app/animations';

@Component({
  selector: 'app-trucking-kejayan',
  templateUrl: './trucking-kejayan.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./trucking-kejayan.component.css'],
  animations: [zoomInVar],
})
export class TruckingKejayanComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public trackingFromChart!: Partial<TrackingFromChart> | any;
  focusButton = false;
  wingboxFocus = false;

  constructor() {
    this.TruckingFromCharts();
  }

  onFocus() {
    this.focusButton = true;
  }
  onFocusout() {
    this.focusButton = false;
  }
  wingboxFocused() {
    this.wingboxFocus = true;
  }
  wingboxFocusout() {
    this.wingboxFocus = false;
  }

  TruckingFromCharts() {
    this.trackingFromChart = {
      series: [
        {
          name: 'Kejayan',
          data: [227, 235, 11, 105, 22],
        },
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
        height: 450,
        width: '100%',
        events: {
          click: (event: any, chartContext: any, config: any) => {
            if (config.config.title.text == 'Kejayan') {
            }
            if (config.config.title.text == 'Sukabumi') {
            }
            console.log(config);
          },
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
