import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
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
  constructor() {
    this.damagesProduct();
  }
  changeBool() {
    this.bool = !this.bool;
  }
  damagesProduct() {
    this.chartOptions = {
      series: [
        {
          name: 'Likes',
          data: [300, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        // {
        //   name: 'Liku',
        //   data: [20, 21, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // },
        // {
        //   name: 'Lika',
        //   data: [67, 167, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // },
        // {
        //   name: 'Lika',
        //   data: [250, 145, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // },
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
