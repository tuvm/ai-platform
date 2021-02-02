import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["May", "June", "July"],
  datasets: [
    {
      label: "Request",
      backgroundColor: "#DFD9F8",
      borderColor: "#DFD9F8",
      borderWidth: 1,
      hoverBackgroundColor: "#9c98fa",
      hoverBorderColor: "#9c98fa",
      data: [56, 55, 40],
      pointRadius: 1,
      pointHoverRadius: 1,
      maxBarThickness: 30,
    },

    {
      label: "Request/MB",
      backgroundColor: "#39c2d761",
      borderColor: "#39c2d761",
      borderWidth: 1,
      hoverBackgroundColor: "#39C2D7",
      hoverBorderColor: "#39C2D7",
      data: [124, 99, 22],
      pointRadius: 1,
      pointHoverRadius: 1,
      maxBarThickness: 30,
    },

    {
      label: "Request/ms",
      backgroundColor: "#D9F8E2",
      borderColor: "#D9F8E2",
      borderWidth: 1,
      hoverBackgroundColor: "#8af58f",
      hoverBorderColor: "#8af58f",
      data: [38, 53, 98],
      pointRadius: 1,
      pointHoverRadius: 1,
      maxBarThickness: 30,
    },
  ],
};

export default function RequestGraph() {
  return (
    <div style={{ height: 270 }}>
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
            align: 'center',
            labels: {
              boxWidth: 11,
              padding: 20,
            }
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
}
