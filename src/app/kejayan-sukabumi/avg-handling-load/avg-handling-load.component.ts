import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AVGHandlingLoadChart } from './avgHandlingLoad';

@Component({
  selector: 'app-avg-handling-load',
  templateUrl: './avg-handling-load.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./avg-handling-load.component.css'],
})
export class AvgHandlingLoadComponent {
  // @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<AVGHandlingLoadChart> | any;

  //tools
  time = new Date();

  //API
  kejayan: any[] = [];
  sukabumi: any[] = [];
  dateKejayan: any[] = [];
  dateSukabumi: any[] = [];
  valueKejayan: any[] = [];
  valueSukabumi: any[] = [];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.getCurrentDate();
    spinner.show();
    forkJoin(
      apiService.getMonthKejayan(),
      apiService.getMonthSukabumi()
    ).subscribe(
      ([kjy, skb]) => {
        this.kejayan = kjy;
        this.sukabumi = skb;
        this.kejayan.forEach((elem, i) => {
          this.dateKejayan.push([
            new Date(elem.date).toLocaleString('default', { month: 'long' }),
            +new Date(elem.date).getFullYear(),
          ]);
          this.dateSukabumi.push([
            new Date(this.sukabumi[i].date).toLocaleString('default', {
              month: 'long',
            }),
            +new Date(elem.date).getFullYear(),
          ]);
          this.valueKejayan.push(elem.qty_handling_load);
          this.valueSukabumi.push(this.sukabumi[i].qty_handling_load);
        });
        this.avgHandlingLoad();
      },
      () => {},
      () => {
        spinner.hide();
      }
    );
  }
  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }
  avgHandlingLoad() {
    this.chartOptions = {
      series: [
        {
          name: 'Kejayan',
          data: this.valueKejayan,
        },
        {
          name: 'Sukabumi',
          data: this.valueSukabumi,
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
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: this.dateKejayan,
      },
      titleKejayan: {
        text: 'In mio Carton',
        align: 'left',
        style: {
          fontFamily: 'Manrope',
          fontSize: '20px',
          fontWeight: 600,
        },
      },
      titleSukabumi: {
        text: 'From Sukabumi',
        align: 'left',
        style: {
          fontFamily: 'Manrope',
          fontSize: '20px',
          fontWeight: 600,
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
          style: {
            fontFamily: 'Manrope',
          },
          text: 'Carton',
        },
      },
    };
  }
}
