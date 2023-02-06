import { Chart } from "chart.js/auto";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { ActionTrend } from "interfaces/basetype";
import { ActionSync } from "interfaces/basetype";
import { useRef } from "react";

Chart.register();

type PropsType = {
  actionSync: ActionSync;
  dataOnClick?: (x: number, y: number) => void;
};

const colors = ["black", "red", "blue"];

const ActionSyncChart = ({ actionSync, dataOnClick }: PropsType) => {
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="mx-auto flex items-center">
          <img src={`data:image/jpg;base64,${actionSync.imgs[0]}`} width={60} height={60} />
          <h1>
            {actionSync.ids[0]}&{actionSync.ids[1]}
          </h1>
          <img src={`data:image/jpg;base64,${actionSync.imgs[1]}`} width={60} height={60} />
        </div>
        {actionSync.pair_trends.map((trend, i) => (
          <TrendChart {...trend} color={colors[i]} dataOnClick={dataOnClick} />
        ))}
      </div>
    </>
  );
};

const TrendChart = ({
  name,
  data,
  color,
  dataOnClick,
}: ActionTrend & { color: string; dataOnClick?: (x: number, y: number) => void }) => {
  const chartRef = useRef<Chart<"line">>(null!);

  const plotData = {
    labels: Array.from(data, (v, k) => Math.ceil(k * 10 * 25)),
    datasets: [
      {
        label: name,
        data,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      y: {
        max: 1.5,
        min: -1.5,
      },
    },
  };

  const onClick = (event: any) => {
    if (!dataOnClick) return;
    if (!chartRef.current.data.labels) return;
    const element = getElementAtEvent(chartRef.current, event);
    if (!element.length) return;
    const x = chartRef.current.data.labels[element[0].index] as number;
    const y = chartRef.current.data.datasets[element[0].datasetIndex].data[element[0].index] as number;
    dataOnClick(x, y);
  };

  return <Line data={plotData} options={options} ref={chartRef} onClick={onClick}></Line>;
};

export default ActionSyncChart;
