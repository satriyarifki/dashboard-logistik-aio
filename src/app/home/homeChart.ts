import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexLegend,
  ApexYAxis,
  ApexResponsive,
} from 'ng-apexcharts';

export type ChartOptions = {
  seriesK: ApexAxisChartSeries;
  seriesS: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  lables: String[];
  titleK: ApexTitleSubtitle;
  titleS: ApexTitleSubtitle;
  plotOptionsK: ApexPlotOptions;
  plotOptionsS: ApexPlotOptions;
  fillK: ApexFill;
  fillS: ApexFill;
  stroke: ApexStroke;
};

export type BarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive;
};

export type ColumnCart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
