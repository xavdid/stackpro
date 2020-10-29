import React from "react";
import { Bar } from "react-chartjs-2";

import { Recording } from "./interfaces";

const color = (r: number, g: number, b: number): string =>
  `rgb(${r}, ${g}, ${b})`;

const formatHour = (hour: number): string => {
  if (hour === 0) {
    return "12AM";
  }
  if (hour < 12) {
    return `${hour}AM`;
  }

  if (hour === 12) {
    return `12PM`;
  }

  return `${hour - 12}PM`;
};

const formatDate = (dateStr: string): string => {
  const [date, time] = dateStr.split("T");
  const hour = time.split(":")[0];

  return `${date}, ${formatHour(parseInt(hour, 10))} UTC`;
};

const structureDataForChart = (
  data: Recording[]
): {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
} => {
  return {
    labels: data.map(d => formatDate(d.collectedAt)),
    datasets: [
      {
        label: "# Unanswered",
        data: data.map(d => d.asked - d.answered),
        backgroundColor: color(0, 39, 76),
      },
      {
        label: "# Answered",
        data: data.map(d => d.answered),
        backgroundColor: color(0, 178, 169),
      },
    ],
  };
};

const options = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "# Questions",
        },
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 24,
        },
        scaleLabel: {
          display: true,
          labelString: "Recording Timestamp",
        },
        stacked: true,
      },
    ],
  },
};

const StackedBar = ({ data }: { data: Recording[] }) => (
  <Bar data={structureDataForChart(data)} options={options} />
);

export default StackedBar;
