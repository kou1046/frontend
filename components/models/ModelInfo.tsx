import { Chart } from "chart.js/auto";
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import { InferenceModel, ModelInfo } from "../../interfaces/basetype";

Chart.register();

type PropsType = {
  modelInfo: ModelInfo;
};

export const ModelInfoVisual = ({ modelInfo }: PropsType) => {
  const chartRef = useRef<Chart<"line">>(null);
  const { trainAccs, testAccs } = modelInfo;
  const accSet = [trainAccs, testAccs];
  const labels = ["Train", "Test"];
  const colors = ["black", "red"];
  const data = {
    labels: Array.from({ length: modelInfo.epoch }, (_, k) => k + 1),
    datasets: accSet.map((accs, i) => ({
      label: labels[i],
      data: accs,
      borderColor: colors[i],
      backgroundColor: colors[i],
      borderWidth: 1.5,
      pointRadius: 0,
    })),
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Epoch",
          color: "black",
          font: {
            size: 24,
            weight: "bold",
          },
        },
        ticks: {
          color: "black",
          autoSkipPadding: 50,
          maxRotation: 0,
          font: {
            size: 24,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Accuracy",
          color: "black",
          font: {
            size: 24,
            weight: "bold",
          },
        },
        ticks: {
          color: "black",
          font: {
            size: 24,
            weight: "bold",
          },
        },
      },
    },
  };

  return <Line data={data} ref={chartRef} options={options}></Line>;
};
