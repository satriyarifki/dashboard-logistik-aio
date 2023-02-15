import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
} from 'ng-apexcharts';
export type InvenAccChart = {
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
