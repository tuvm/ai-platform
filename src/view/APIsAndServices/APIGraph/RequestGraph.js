import React from 'react';
import { Bar } from 'react-chartjs-2';
import { isDiff } from '../../../utils/helpers';

const RequestGraph = (props) => {
  const data = {
    labels: props.data.labels || [],
    datasets: [
      {
        label: props.label || '',
        backgroundColor: '#39c2d761',
        borderColor: '#39c2d761',
        borderWidth: 1,
        hoverBackgroundColor: '#39C2D7',
        hoverBorderColor: '#39C2D7',
        data: props.data.values || [],
        pointRadius: 1,
        pointHoverRadius: 1,
        maxBarThickness: 50,
      },
    ],
  };

  return (
    <div style={{ height: 320 }}>
      <Bar
        data={data}
        width={50}
        height={50}
        base={50}
        options={{
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
          },
          legend: {
            display: false
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
                position: 'right',
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
