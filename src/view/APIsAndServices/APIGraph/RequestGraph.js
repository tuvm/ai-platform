import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "requests",
      backgroundColor: "#39c2d761",
      borderColor: "#39c2d761",
      borderWidth: 1,
      hoverBackgroundColor: "#39C2D7",
      hoverBorderColor: "#39C2D7",
      data: [65, 59, 80, 81, 56, 55, 40],
      pointRadius: 1,
      pointHoverRadius: 1,
      maxBarThickness: 50,
    },
  ],
};

export default function RequestGraph() {
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
