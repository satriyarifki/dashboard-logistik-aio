import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DamagesProductChart } from '../damagesProduct';

@Component({
  selector: 'app-damages-product',
  templateUrl: './damages-product.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./damages-product.component.css'],
})
export class DamagesProductComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<DamagesProductChart> | any;
  bool: Boolean = false;
  //Tools
  time = new Date()
  //API
  kejayan: any[] = [];
  dateKejayan: any[] = [];
  valueKejayan: any[] = [];
  sukabumi: any[] = [];
  dateSukabumi: any[] = [];
  valueSukabumi: any[] = [];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.getCurrentDate()
    spinner.show();
    forkJoin(
      apiService.getMonthKejayan(),
      apiService.getMonthSukabumi()
    ).subscribe(
      ([kjy, skb]) => {
        this.kejayan = kjy;
        this.sukabumi = skb;
        this.kejayan.forEach((elem, i) => {
          this.dateKejayan.push([new Date(elem.date).toLocaleString('default', { month: 'long' }) , + new Date(elem.date).getFullYear()]);
          this.dateSukabumi.push([new Date(this.sukabumi[i].date).toLocaleString('default', { month: 'long' }) , + new Date(elem.date).getFullYear()]);
          this.valueKejayan.push(elem.qty_damage_product);
          this.valueSukabumi.push(this.sukabumi[i].qty_damage_product);
        });
        this.damagesProduct();
      },
      () => {},
      () => {
        spinner.hide();
      }
    );
  }
  changeBool() {
    this.bool = !this.bool;
  }
  getCurrentDate() {
    this.time = new Date();
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds
  }
  damagesProduct() {
    // console.log(this.valueSukabumi);
    // console.log(Math.max(...this.valueSukabumi));

    this.chartOptions = {
      series: [
        {
          name: 'Likes',
          data: this.valueKejayan,
        },
      ],
      seriesSkb: [
        {
          name: 'Likes',
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
        enabled: true
      },
      xaxis: {
        
        categories: this.dateKejayan,
      },
      xaxisSkb: {
        
        categories: this.dateSukabumi,
      },
      titleKejayan: {
        text: 'From Kejayan',
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
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
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
      yaxis: [
        {
          min: 0,
          max: Math.max(...this.valueKejayan) * 1.2,
          title: {
            text: '',
          },
        },
      ],
      yaxisSkb: [
        {
          min: 0,
          max: Math.max(...this.valueSukabumi) * 1.2,
          title: {
            text: '',
          },
        },
      ],
    };
  }
}
