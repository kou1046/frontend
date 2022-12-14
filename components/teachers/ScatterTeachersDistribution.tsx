import { BoundingBox, ITeacher2, Person2 } from "../../interfaces/basetype"
import Paper from '@mui/material/Paper';
import { Scatter, getElementAtEvent, getDatasetAtEvent } from 'react-chartjs-2'
import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";


type PlotData = Array<Array<ITeacher2>>;

type PropsType = {
    teacherType: string; 
    newTeacherState?: ITeacher2; 
};

export const ScatterTeachersDistribution = ({teacherType, newTeacherState}: PropsType) => {

    const [plotData, setPlotData] = useState<PlotData>([]);
    const chartRef = useRef(null!);

    const fetchPlotData = async () => {
        const res = await axios.get(`/${teacherType}/distribution/`);
        setPlotData(res.data)
    }

    const dataOnClick = (e: any) => {
        const clickedElement = getElementAtEvent(chartRef.current, e)
        console.log(clickedElement)
    }

    const addPlotData = (newTeacher: ITeacher2) => {
        setPlotData(data => {
            data[newTeacher.label] = [...data[newTeacher.label], ...[newTeacher]]
            return JSON.parse(JSON.stringify(data))
        })
    }

    const renderData = () => {

        const colors = ['#000000', '#FF0000', '#0067c0', '#4db56a']
        const data = {
            datasets: plotData.map((teachers, i) => {
                const data = teachers.map(teacher => {
                    return {x: teacher.person.box.xmax, y: teacher.person.frameNum / 25}
                })
                const order = plotData.length - i
                return {data: data, label: i.toString() + ` (${data.length})`, backgroundColor: colors[i], order: order}
            })
        }
        
        const options = {
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 1400,
                    title: {
                        display: true, 
                        text: 'x [px]'
                    }
                },
                y: {
                    display: true,
                    min: 0,
                    max: 7000, 
                    title: {
                        display: true, 
                        text: 'Time [sec]'
                    }
                }, 
               
            }
          }
      
        return <Scatter 
                ref={chartRef} 
                data={data} 
                options={options}
                onClick={dataOnClick}
                ></Scatter>
    }

    useEffect(() => {
        fetchPlotData();
      }, [])

    useEffect(() => {
        if (newTeacherState){
            addPlotData(newTeacherState)
        }
    }, [newTeacherState])

    return <>
        {renderData()}
    </>

}
