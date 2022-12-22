// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data
const chartData = [
  {
    label: "Python",
    value: "210"
  },
  {
    label: "Java",
    value: "180"
  },
  {
    label: "Javascript",
    value: "145"
  },
  {
    label: "C++",
    value: "92"
  },
  {
    label: "C#",
    value: "81"
  }
];

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "bar2d", // The chart type
  width: "600", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      // Set the chart caption
      caption: "Best Programming Languages 2022",
      // Set the chart subcaption
      subCaption: "Ranked by number of programming jobs",
      // Set the x-axis name
      xAxisName: "Language",
      // Set the y-axis name
      yAxisName: "Jobs",
      numberSuffix: "K",
      // Set the theme for your chart
      theme: "fusion"
    },
    // Chart Data
    data: chartData
  }
};

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const ExampleChart = () => {
  return <ReactFC {...chartConfigs} />;
};

export default ExampleChart;
