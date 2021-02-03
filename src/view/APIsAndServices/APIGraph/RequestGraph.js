import React from "react";
import { Bar } from "react-chartjs-2";
import get from 'lodash/get';
import { isDiff } from "../../../utils/helpers";
import { CHART_COLORS, KEY_LIST } from "../../../utils/constants/config";
import { isEmpty } from "lodash";

const RequestGraph = (props) => {
  console.log({ data: props.data });
  const { graphType } = props;
  const datasets = get(props.data, 'datasets');
  let chartDatasets = [];

  if (!isEmpty(datasets)) {
    chartDatasets = datasets.map((item) => {
      let data = item.data;
      const label = getModelName(item.query_string);
      const model = item.query_string ? item.query_string.split('ai_model=')[1] : '';
      if (graphType === 'request-size') {
        data = data.map((item) => (item / 1024 / 1024).toFixed(2));
      }
      return {
        data,
        label: label,
        borderWidth: 1,
        backgroundColor: CHART_COLORS[model],
        borderColor: CHART_COLORS[model],
        pointRadius: 1,
        pointHoverRadius: 1,
        maxBarThickness: 30,
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
      <Bar
        data={data}
        type="bar"
        width={50}
        height={50}
        base={50}
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
            xAxes: [
              {
                gridLines: {
                  display: false,
                  zeroLine: true,
                },
              },
            ],
            yAxes: [
              {
                position: "right",
              },
            ],
          },
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
