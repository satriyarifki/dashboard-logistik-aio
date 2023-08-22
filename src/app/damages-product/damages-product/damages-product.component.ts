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
    spinner.show();
    forkJoin(
      apiService.getMonthKejayan(),
      apiService.getMonthSukabumi()
    ).subscribe(
      ([kjy, skb]) => {
        this.kejayan = kjy;
        this.sukabumi = skb;
        this.kejayan.forEach((elem, i) => {
          this.dateKejayan.push(elem.date);
          this.dateSukabumi.push(this.sukabumi[i].date);
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
  damagesProduct() {
    console.log(this.kejayan);

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
          data: this.valueKejayan,
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
        categories: this.dateKejayan,
      },
      xaxisSkb: {
        type: 'datetime',
        categories: this.dateKejayan,
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
          max: 310,
          title: {
            text: '',
          },
        },
        // {
        //   opposite: true,
        //   title: {
        //     text: 'Series B',
        //   },
        // },
      ],
    };
  }
}
