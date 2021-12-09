import React from "react";
import { Bar, Line } from "react-chartjs-2";
import get from 'lodash/get';
import { isDiff } from "../../../utils/helpers";
import { CHART_TYPE_COLORS, KEY_LIST } from "../../../utils/constants/config";
import { isEmpty } from "lodash";

const RequestGraph = (props) => {
  console.log({ data: props.data });
  const { graphType } = props;
  const datasets = get(props.data, 'datasets');
  let chartDatasets = [];

  if (!isEmpty(datasets)) {
    chartDatasets = datasets.map((item, idx) => {
      let data = item.data;
      const label = item.label || getModelName(item.query_string);
      const model = item.query_string ? item.query_string.split('ai_model=')[1] : '';
      if (graphType === 'request-size') {
        data = data.map((item) => (item / 1024 / 1024).toFixed(2));
      }
      let color = CHART_TYPE_COLORS[label] || CHART_TYPE_COLORS['Default']
      return {
        data,
        label: label,
        borderWidth: 3,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 1,
        pointHoverRadius: 1,
        fill: false,
      };
    });
  }

  console.log({ chartDatasets });

  const data = {
    labels: props.data?.labels || [],
    datasets: chartDatasets,
  };

  return (
    <div style={{ height: 320 }}>
      <Line 
        data={data}
        options={{
          tooltips: {
            displayColors: true,
            callbacks: {
              mode: "x",
            },
          },
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
          },
          legend: {
            align: "center",
            labels: {
              boxWidth: 11,
              padding: 20,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                },
              },
            ],
          }
        }}
      />
    </div>
  );
};

export default React.memo(RequestGraph, (prevProps, nextProps) => {
  return !isDiff(prevProps.data, nextProps.data);
});

export const getModelName = (querystring) => {
  const keyname = querystring.split("ai_model=")[1] || "";
  const name = KEY_LIST[keyname] || "";
  return name;
};
