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

export type CheckLnChart = {
  series: ApexAxisChartSeries;
  series2: ApexAxisChartSeries;
  chart: ApexChart;
  chart2: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  yaxis2: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  labels: string[];
  labels2: string[];
  stroke: any; // ApexStroke;
  stroke2: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  colors: any; 
  fill: ApexFill;
  tooltip: ApexTooltip;
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
  colors: any;
  responsive: ApexResponsive;
};

export type DeliveryDesChart = {
  series: ApexNonAxisChartSeries;
  seriesSukabumi: ApexNonAxisChartSeries;
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
  seriesSukabumi: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};

export type ColumnLnYesterday = {
  series: ApexAxisChartSeries;
  series2: ApexAxisChartSeries;
  series3: ApexAxisChartSeries;
  series4: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  xaxis2: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  yaxis2: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  colors: any; 
  colors2: any; 
  colors3: any; 
  colors4: any; 
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
}
