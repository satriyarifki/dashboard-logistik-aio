import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexTitleSubtitle,
  ApexGrid,
} from 'ng-apexcharts';

export type occupancyApex = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  titleCikarang: ApexTitleSubtitle;
  titleSukabumi: ApexTitleSubtitle;
  titleBekasi: ApexTitleSubtitle;
  titlePasarRebo: ApexTitleSubtitle;
  titleMargomulyo: ApexTitleSubtitle;
  titleKejayan: ApexTitleSubtitle;
  grid: ApexGrid;
};
