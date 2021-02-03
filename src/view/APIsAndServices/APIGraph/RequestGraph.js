import React from "react";
import { Bar } from "react-chartjs-2";
import get from 'lodash/get';
import { isDiff } from "../../../utils/helpers";
import { CHART_COLORS, KEY_LIST } from "../../../utils/constants/config";
import { isEmpty } from "lodash";

const RequestGraph = (props) => {
  console.log({ data: props.data });
  const { graphType } = props;
  // const { filterType } = props;
  const datasets = get(props.data, 'datasets');
  let chartDatasets = [];


  console.log({ datasets });

  if (!isEmpty(datasets)) {
    chartDatasets = datasets.map((item) => {
      let data = item.data;
      const label = getModelName(item.query_string);
      const model = item.query_string ? item.query_string.split('ai_model=')[1] : '';
      if (graphType === 'request-size') {
        data = data.map((item) => Math.floor(item / 1024 / 1024, 2));
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
  
  // const data2 = {
  //   labels: props.rawData[0]?.labels || [],
  //   // datasets: [
  //   //   {
  //   //     label: props.label || '',
  //   //     // backgroundColor: '#39c2d761',
  //   //     // borderColor: '#39c2d761',
  //   //     borderWidth: 1,
  //   //     backgroundColor: '#39C2D7',
  //   //     borderColor: '#39C2D7',
  //   //     data: props.data.values || [],
  //   //     pointRadius: 1,
  //   //     pointHoverRadius: 1,
  //   //     maxBarThickness: 50,
  //   //   },
  //   // ],

  //   datasets: props.rawData
  //     ? props.rawData.map((item, index) => {
  //         const model = item.query_string ? item.query_string.split('ai_model=')[1] : '';
  //         const label = getModelName(item.query_string);
  //         const data = [];
  //         props.rawData.forEach(item => {
  //           data.push(item.values[index])
  //         });
  //         return {
  //           label,
  //           borderWidth: 1,
  //           backgroundColor: CHART_COLORS[model],
  //           borderColor: CHART_COLORS[model],
  //           data,
  //           pointRadius: 1,
  //           pointHoverRadius: 1,
  //           maxBarThickness: 50,
  //         };
  //       })
  //     : [],
  // };

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
            // display: false
            align: "center",
            labels: {
              boxWidth: 11,
              padding: 20,
            },
          },
          scales: {
            xAxes: [
              {
                // stacked: true,
                gridLines: {
                  display: false,
                  zeroLine: true,
                },
              },
            ],
            yAxes: [
              {
                // stacked: true,
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

const getModelName = (querystring) => {
  const keyname = querystring.split("ai_model=")[1] || "";
  const name = KEY_LIST[keyname] || "";
  return name;
};
