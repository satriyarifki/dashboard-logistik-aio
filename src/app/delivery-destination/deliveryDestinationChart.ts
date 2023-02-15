import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type DeliveryDesChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  titleKejayan: ApexTitleSubtitle;
  titleSukabumi: ApexTitleSubtitle;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
