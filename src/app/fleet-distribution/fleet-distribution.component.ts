import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  DeliveryDesChart,
  OnTimeFleetChart,
  TruckingFromChart,
} from '../ApexChart';
import { ProductService } from '../services/product.service';
import worldTimestamp from 'world-timestamp';
import { zoomInVar } from '../animations';

@Component({
  selector: 'app-fleet-distribution',
  templateUrl: './fleet-distribution.component.html',
  styleUrls: ['./fleet-distribution.component.css'],
  animations: [zoomInVar],
})
export class FleetDistributionComponent {
  @Input('timen') timenow: Date = new Date();
  @ViewChild('chart') chart!: ChartComponent;
  public truckingFromChart!: Partial<TruckingFromChart> | any;
  public deliveryDestinationChart: Partial<DeliveryDesChart> | any;
  public onTimeFleetChart: Partial<OnTimeFleetChart> | any;
  focusButton = false;
  wingboxFocus = false;
  time: any;

  constructor(private pService: ProductService) {
    this.TruckingFromCharts();
    this.chartDelDes();
    this.OnTimeCharts();
    this.getCurrentDate();
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

  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }

  TruckingFromCharts() {
    this.truckingFromChart = {
      seriesKejayan: [
        {
          name: 'Kejayan',
          data: [227, 235, 11, 105, 22],
        },
      ],
      seriesSukabumi: [
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
        height: 250,
        width: '100%',
        events: {
          click: (event: any, chartContext: any, config: any) => {
            if (config.config.title.text == 'Kejayan') {
            }
            if (config.config.title.text == 'Sukabumi') {
            }
            // console.log(config);
          },
          legendClick: function (
            chartContext: any,
            seriesIndex: any,
            config: any
          ) {
            // console.log(chartContext);
            // console.log('clicked');
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
          breakpoint: 700,
          options: {
            chart: {
              width: '100%',
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

  chartDelDes() {
    this.deliveryDestinationChart = {
      series: [40, 32, 19, 6, 3],
      chart: {
        height: '230vh',
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

        style: {
          fontSize: '25px',
          fontFamily: 'Exo',
          fontWeight: 600,
        },
      },
      titleSukabumi: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: -10,
        style: {
          fontSize: '25px',
          fontFamily: 'Exo',
          fontWeight: 600,
        },
      },
      plotOptions: {
        pie: {
          customScale: 1,
        },
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
        offsetX: 0,
        offsetY: 40,
        horizontalAlign: 'center',
        onItemClick: {
          toggleDataSeries: true,
        },
        fontFamily: 'manrope',
        fontWeight: 400,
        itemMargin: {
          horizontal: 0,
          vertical: 0,
        },
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
              // position: 'bottom',
              offsetX: -20,
              offsetY: 20,
            },
          },
        },
      ],
    };
  }

  OnTimeCharts() {
    this.onTimeFleetChart = {
      series: [75],
      chart: {
        height: 230,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '60%',
            background: '#fff',
            image: undefined,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString() + '%';
              },
              color: '#111',
              fontSize: '36px',
              fontFamily: 'manrope',
              fontWeight: 700,
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'round',
      },
      labels: [],
    };
  }
}
