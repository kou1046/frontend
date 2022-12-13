import Image from "next/image"
import { Person2, Point, Keypoints, ITeacher } from "../interfaces/basetype"
import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import { Scatter } from 'react-chartjs-2'
import { useEffect, useState } from "react";
import axios from "axios";


type ResType = Array<Array<ITeacher>>
export const ScatterTeachersDistribution = () => {

    const [plotData, setPlotData] = useState<ResType>([]);

    const fetchData = async () => {
        const res = await axios.get('/wth/distribution/')
        setPlotData(res.data)
    }

    const renderData = () => {
        console.log(plotData)
        const data = {
            datasets: plotData.map((teachers, i) => {
                const data = teachers.map(teacher => {
                    return {x: teacher.person.box.xmin, y: teacher.person.frameNum}
                })
                return {data: data, label: i.toString()}
            })
        }
        const options = {
            maintainAspectRatio: false
        }
        return <Scatter data={data} options={options}></Scatter>
    }

    useEffect(() => {
        const promise = fetchData();
    }, [])

    return <>
        {renderData()}
    </>

}