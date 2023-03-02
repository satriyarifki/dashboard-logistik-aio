import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexLegend,
} from 'ng-apexcharts';

export type TempChart = {
  seriesSoyjoy: ApexAxisChartSeries;
  seriesPocari: ApexAxisChartSeries;
  humiditySoyjoy: ApexAxisChartSeries;
  humidityPocari: ApexAxisChartSeries;
  chart: ApexChart;
  chart2: ApexChart;
  rangeChart: ApexChart;
  dataLabelsTemperature: ApexDataLabels;
  dataLabelsHumidity: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  plotOptionsHorizontal: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  xHumiditySoyjoy: ApexXAxis;
  xHumidityPocari: ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};

export type TruckingFromChart = {
  seriesKejayan: ApexAxisChartSeries;
  seriesSukabumi: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  responsive: ApexResponsive;
};

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
  grid: ApexGrid;
};

export type OnTimeFleetChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};
