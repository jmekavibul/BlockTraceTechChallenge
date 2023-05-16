import React from "react";
import Chart from "react-apexcharts";

const GraphComponent = ({ top5TotalSent }) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: Object.values(top5TotalSent),
    },
  };

  const series = [
    {
      name: "series-1",
      data: Object.keys(top5TotalSent).map((key) => parseInt(key)),
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="50%"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;