import { Chart } from "chart.js/auto";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { ActionTrend } from "interfaces/basetype";
import { ActionSync } from "interfaces/basetype";
import { useRef, memo } from "react";
import { ActionVariation } from "interfaces/basetype";

Chart.register();

type PropsType = {
  actionVariation: ActionVariation;
  dataOnClick?: (x: number, y: number) => void;
};

const colors = ["black", "red", "blue"];

const ActionVariationChart = ({ actionVariation, dataOnClick }: PropsType) => {
  const chartRef = useRef<Chart<"bar">>(null!);

  const onClick = (event: any) => {
    if (!dataOnClick) return;
    if (!chartRef.current.data.labels) return;
    const element = getElementAtEvent(chartRef.current, event);
    if (!element.length) return;
    const x = chartRef.current.data.labels[element[0].index] as number;
    const y = chartRef.current.data.datasets[element[0].datasetIndex].data[element[0].index] as number;
    dataOnClick(x, y);
  };

  const data = {
    labels: Array.from(actionVariation.action_trends[0].data, (v, k) => k * 10 * 25),
    datasets: actionVariation.action_trends.map((trend, i) => ({
      label: trend.name,
      data: trend.data,
      backgroundColor: colors[i],
    })),
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: 3,
      },
    },
  };
  return (
    <div className="text-center">
      <h1>{`ID: ${actionVariation.id}`}</h1>
      <Bar data={data} options={options} ref={chartRef} onClick={onClick}></Bar>
    </div>
  );
};

export default memo(ActionVariationChart);
