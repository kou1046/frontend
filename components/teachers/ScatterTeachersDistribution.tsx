import { ITeacher2, Person2 } from "../../interfaces/basetype"
import { Scatter, getElementAtEvent} from 'react-chartjs-2'
import { Chart } from "chart.js";
import { useEffect, useRef, useState, memo } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

type PlotData = Array<Array<ITeacher2>>;

type PropsType = {
    teacherType: string; 
    newTeacherState?: ITeacher2; 
};


export const ScatterTeachersDistribution = memo(function ScatterTeachersDistribution({teacherType, newTeacherState}: PropsType) {

    const [plotData, setPlotData] = useState<PlotData>([]);
    const chartRef = useRef<Chart<"scatter">>(null);

    const fetchPlotData = async () => {
        const res = await axios.get(`/${teacherType}/distribution/`);
        setPlotData(res.data);
    }

    const renderData = () => {
        const colors = ['#000000', '#FF0000', '#0067c0', '#4db56a']
        const data = {
            datasets: plotData.map((teachers, i) => {
                const data = teachers.map(teacher => {
                    return {x: teacher.person.box.xmax, y: teacher.person.frameNum / 25}
                })
                const order = plotData.length - i
                return {data: data,
                        label: i.toString() + ` (${data.length})`,
                        backgroundColor: colors[i], 
                        order: order,
                        pointRadius: 2.
                    }
            })
        }
        
        const options = {
            maintainAspectRatio: false,
            responsive: false,
            plugins: {
                title: {
                    text: 'Distribution',
                    display: true, 
                    color: 'black',
                    font: {
                        size: 18,
                    }
                }
            },
            scales: {
                x: {
                    min: 0,
                    title: {
                        display: true, 
                        text: 'x [px]',
                        color: 'black'
                    },
                    border: {
                        color: 'black'
                    },
                    grid: {
                        color: 'black'
                    },
                    ticks: {
                        color: "black",
                    }
                },
                y: {
                    display: true,
                    min: 0,
                    title: {
                        display: true, 
                        text: 'Time [sec]',
                        color: 'black'
                    }, 
                    border: {
                        color: 'black'
                    },
                    grid: {
                        color: 'black'
                    },
                    ticks: {
                        color: "black"
                    }
                }, 
               
            }
          }
      
        return <>
                 <Scatter 
                    ref={chartRef} 
                    data={data} 
                    options={options}
                    width={400}
                    height={400}
                  />
               </>
    }

    useEffect(() => {
        fetchPlotData();
      }, [])

    useEffect(() => {
        if (newTeacherState){
            setPlotData(data => {
                data[newTeacherState.label] = [...data[newTeacherState.label], ...[newTeacherState]]
                return JSON.parse(JSON.stringify(data))
            })
        }
    }, [newTeacherState])

    return <>
        {plotData.length ? renderData() : <CircularProgress />}
    </>
})
