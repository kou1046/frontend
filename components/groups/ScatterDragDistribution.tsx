import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { useState, useEffect, useRef } from "react";
import { Scatter, getElementAtEvent } from "react-chartjs-2";

Chart.register();

type PlotData = {
  ID: string;
  xs: Array<number>;
  ys: Array<number>;
};

type PlotDataSet = Array<PlotData>;

type PropsType = {
  groupName: string;
  dataOnClick?(x: number, y: number): void;
};

export const ScatterDragDistribution = ({ groupName, dataOnClick }: PropsType) => {
  const [plotDataSet, setPlotDataSet] = useState<PlotDataSet>([]);
  const chartRef = useRef<Chart<"scatter">>(null!);

  const fetchDrags = async () => {
    const res = await axios.get<Array<PlotData>>(`/groups/${groupName}/drags/distribution`);
    setPlotDataSet(res.data);
  };

  useEffect(() => {
    fetchDrags();
  }, []);

  const render = () => {
    const data = {
      datasets: plotDataSet.map((el) => {
        const data = el.xs.map((x, i) => ({ x: x, y: el.ys[i] }));
        const label = "ID: " + el.ID;
        return { data: data, label: label };
      }),
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        title: {
          text: "Drag Distribution",
          display: true,
          color: "black",
          font: {
            size: 18,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Video frame [1/25 sec]",
            color: "black",
          },
          border: {
            color: "black",
          },
          grid: {
            color: "black",
          },
          ticks: {
            color: "black",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Drag distribution [sec]",
            color: "black",
          },
          border: {
            color: "black",
          },
          grid: {
            color: "black",
          },
          ticks: {
            color: "black",
          },
        },
      },
    };

    const onClick = (event: any) => {
      const element = getElementAtEvent(chartRef.current, event);
      if (!element.length) return;

      const { xs, ys } = plotDataSet[element[0].datasetIndex];
      const [x, y] = [xs[element[0].index], ys[element[0].index]];
      if (dataOnClick) dataOnClick(x, y);
    };

    return <Scatter data={data} ref={chartRef} options={options} onClick={onClick}></Scatter>;
  };

  if (!plotDataSet.length) {
    return <CircularProgress />;
  }

  return render();
};
