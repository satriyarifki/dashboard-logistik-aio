import { Component, ViewChild } from '@angular/core';
import { occupancyApex } from './occupancyCharts';
import { ChartComponent } from 'ng-apexcharts';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.css'],
  host: { class: 'flex justify-center' },
})
export class OccupancyComponent {
  // @ViewChild('chart') chartCom!: ChartComponent;
  public occupancyApex: Partial<occupancyApex> | any;
  //Tools
  time = new Date()

  //API
  whsOccu: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.getCurrentDate()
    this.spinner.show();
    apiService.getWarehouseOccupancy().subscribe(
      (data) => {
        this.whsOccu = data;
        // console.log(data);
        this.occupancyChart();
      },
      (err) => {},
      () => {
        this.spinner.hide();
      }
    );
  }
  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }
  occupancyChart() {
    this.occupancyApex = {
      seriesKjy: [(this.whsOccu?.usage_kjy / this.whsOccu?.capacity_kjy) * 100],
      seriesSkb: [(this.whsOccu?.usage_skb / this.whsOccu?.capacity_skb) * 100],
      seriesBks: [
        (this.whsOccu?.usage_bekasi / this.whsOccu?.capacity_bekasi) * 100,
      ],
      seriesPr: [
        (this.whsOccu?.usage_ps_rebo / this.whsOccu?.capacity_ps_rebo) * 100,
      ],
      seriesYch: [
        (this.whsOccu?.usage_external / this.whsOccu?.capacity_external) * 100,
      ],
      series: [76],
      titleKejayan: {
        text: 'Kejayan',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleSukabumi: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleMargomulyo: {
        text: 'DHL Margomulyo',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleBekasi: {
        text: 'LDC Bekasi',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titlePasarRebo: {
        text: 'LDC PasarRebo',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleCikarang: {
        text: 'YCH Cibitung',
        align: 'center',
        offsetY: 35,
        style: {
          fontSize: '25px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      chart: {
        height: 350,
        type: 'radialBar',
        offsetY: 0,
        size: 600,
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
            margin: 1, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2,
            },
          },
          hollow: {
            margin: 1,
            size: '40%',
            background: 'transparent',
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
              fontSize: '25px',
              fontFamily: 'Quicksand',
              fontWeight: 700,
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString() + '%';
              },
            },
          },
        },
      },
      fill: {
        colors: '#F39C12',
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: false,
          gradientToColors: ['#F5B041'],
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
        },
      },
      fills: {
        colors: '#9B59B6',
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: false,
          gradientToColors: ['#BB8FCE'],
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
        },
      },
      labels: ['Average Results'],
    };
  }
}
