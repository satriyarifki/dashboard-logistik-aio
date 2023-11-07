import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  DeliveryDesChart,
  OnTimeFleetChart,
  TruckingFromChart,
} from '../ApexChart';
import worldTimestamp from 'world-timestamp';
import { zoomInVar } from '../animations';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

var totalTrucking: {
  Kejayan: Number;
  Sukabumi: Number;
};

@Component({
  selector: 'app-fleet-distribution',
  templateUrl: './fleet-distribution.component.html',
  styleUrls: ['./fleet-distribution.component.css'],
  animations: [zoomInVar],
})
export class FleetDistributionComponent implements OnInit {
  @Input('timen') timenow: Date = new Date();
  @ViewChild('chart') chart!: ChartComponent;
  public truckingFromChart!: Partial<TruckingFromChart> | any;
  public deliveryDestinationChart: Partial<DeliveryDesChart> | any;
  public onTimeFleetChart: Partial<OnTimeFleetChart> | any;

  focusButton = false;
  wingboxFocus = false;
  time: any;
  fleetKejayan!: any;
  fleetSukabumi!: any;
  totalTrucking = totalTrucking;
  totalTruckingKejayan: any;
  totalTruckingSukabumi: any;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private idle: Idle,
    private keepLive: Keepalive
  ) {
    // this.chartDelDes();
  }
  async ngOnInit(): Promise<void> {
    this.getCurrentDate();
    await this.dataService();
  }

  dataService() {
    this.spinner.show();
    forkJoin(
      this.apiService.getFleetKejayan(),
      this.apiService.getFleetSukabumi()
    ).subscribe(
      ([kejayan, sukabumi]) => {
        this.fleetKejayan = kejayan;
        this.fleetSukabumi = sukabumi;
        // console.log(this.fleetKejayan);
        // console.log(this.fleetSukabumi.within_time);

        this.TruckingFromCharts();
        this.chartDelDes();
        this.OnTimeCharts();
        this.sumTruckingQuantity();

        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
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

  sumTruckingQuantity() {
    this.totalTruckingKejayan = [
      this.fleetKejayan.container,
      this.fleetKejayan.wing_box,
      this.fleetKejayan.tronton,
      this.fleetKejayan.fuso,
      this.fleetKejayan.cold_diesel,
    ]
      .map(Number)
      .reduce((x, y) => {
        return x + y;
      });
    this.totalTruckingSukabumi = [
      this.fleetSukabumi.container,
      this.fleetSukabumi.wing_box,
      this.fleetSukabumi.tronton,
      this.fleetSukabumi.fuso,
      this.fleetSukabumi.cold_diesel,
    ]
      .map(Number)
      .reduce((x, y) => {
        return x + y;
      });
  }

  TruckingFromCharts() {
    this.truckingFromChart = {
      seriesKejayan: [
        {
          name: 'Kejayan',
          data: [
            this.fleetKejayan.container,
            this.fleetKejayan.wing_box,
            this.fleetKejayan.tronton,
            this.fleetKejayan.fuso,
            this.fleetKejayan.cold_diesel,
          ],
        },
      ],
      seriesSukabumi: [
        {
          name: 'Sukabumi',
          data: [
            this.fleetSukabumi.container,
            this.fleetSukabumi.wing_box,
            this.fleetSukabumi.tronton,
            this.fleetSukabumi.fuso,
            this.fleetSukabumi.cold_diesel,
          ],
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
          dataLabels: {
            position: 'center',
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'manrope',
          fontSize: '15px',
          fontWeight: 700,
          colors: ['white'],
        },
        dropShadow: {
          enabled: true,
          opacity: 0.6,
          left: 0,
          blur: 1,
          color: 'biru',
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      // colors: ['#6D67E4'],
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
      series: [
        Number(this.fleetKejayan.ditributor),
        Number(this.fleetKejayan.odi),
        Number(this.fleetKejayan.export),
        Number(this.fleetKejayan.intransitt_wh),
        Number(this.fleetKejayan.ldc),
      ],
      seriesSukabumi: [
        Number(this.fleetSukabumi.ditributor),
        Number(this.fleetSukabumi.odi),
        Number(this.fleetSukabumi.export),
        Number(this.fleetSukabumi.intransitt_wh),
        Number(this.fleetSukabumi.ldc),
      ],
      // series: [11.1 , Number(this.fleet.deliveryDestination[0].odi), 21.5, 15.98, 17.23],
      chart: {
        height: '230vh',
        type: 'donut',
        event: {
          legendClick: function (
            chartContext: any,
            seriesIndex: any,
            config: any
          ) {
            // console.log('success');
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
      series: [this.fleetKejayan.within_time],
      seriesSukabumi: [this.fleetSukabumi.within_time],
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
                return parseFloat(val.toString()).toString() + '%';
              },
              color: '#111',
              fontSize: '36px',
              fontFamily: 'Quicksand',
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
