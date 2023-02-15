import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexTitleSubtitle,
  ApexStroke,
} from 'ng-apexcharts';

export type PerfectOrderRateChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  titleKejayan: ApexTitleSubtitle;
  titleSukabumi: ApexTitleSubtitle;
};
