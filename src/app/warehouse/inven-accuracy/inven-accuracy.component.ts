import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { InvenAccChart } from './inven-accuracyChart';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import { bounce, swing, slideInLeft, slideInDown, slideInUp } from 'ng-animate';

@Component({
  selector: 'app-inven-accuracy',
  templateUrl: './inven-accuracy.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./inven-accuracy.component.css'],
  animations: [
    trigger('slideInSKU', [
      transition(
        ':enter',
        useAnimation(slideInDown, {
          params: { timing: 0.2 },
        })
      ),
      transition(
        ':leave',
        useAnimation(slideInUp, {
          params: { timing: 0.2, a: '0px', b: '50px' },
        })
      ),
    ]),
  ],
})
export class InvenAccuracyComponent {
  @ViewChild('chart') chartCom!: ChartComponent;
  public InvenAccChart!: Partial<InvenAccChart> | any;
  sku = 38;

  boolKejayan: Boolean = false;
  boolSukabumi: Boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.funRadialChart();
  }
  changeKejayan() {
    // if (this.boolSukabumi == true && this.boolKejayan == false) {
    //   this.boolSukabumi = false;
    // }
    this.boolKejayan = !this.boolKejayan;
    // console.log(this.boolKejayan);
    this.cdr.detectChanges();
  }
  changeSukabumi() {
    // if (this.boolSukabumi == false && this.boolKejayan == true) {
    //   this.boolKejayan = false;
    // }
    this.boolSukabumi = !this.boolSukabumi;
    // console.log(this.boolSukabumi);
    this.cdr.detectChanges();
  }
  funRadialChart() {
    this.InvenAccChart = {
      seriesK: [60],
      seriesS: [75],
      chart: {
        height: 350,
        type: 'radialBar',
        events: {
          click: (event: any, chartContext: any, config: any) => {
            if (config.config.title.text == 'Kejayan') {
              this.changeKejayan();
            }
            if (config.config.title.text == 'Sukabumi') {
              this.changeSukabumi();
            }
            // console.log(config.config.title.text);
          },
        },
      },
      titleK: {
        text: 'Kejayan',
        align: 'center',
        offsetY: 30,
        style: {
          fontSize: '30px',
          fontFamily: 'Manrope',
          fontWeight: 600,
        },
      },
      titleS: {
        text: 'Sukabumi',
        align: 'center',
        offsetY: 30,
        style: {
          fontSize: '30px',
          fontFamily: 'Manrope',
          fontWeight: 600,
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
              fontFamily: 'Quicksand',
              fontWeight: 700,
            },
            value: {
              color: '#111',
              fontSize: '25px',
              show: true,
              fontFamily: 'Quicksand',
              fontWeight: 600,
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
              fontFamily: 'Quicksand',
              fontWeight: 700,
            },
            value: {
              color: '#111',
              fontSize: '25px',
              show: true,
              fontFamily: 'Quicksand',
              fontWeight: 600,
            },
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
    };
  }
}
