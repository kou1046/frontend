import Image from "next/image"
import { Person, Point, Keypoints } from "../pages/interfaces/basetype"
import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import { Scatter } from 'react-chartjs-2'

interface PeopleProps {
    people:Array<Person>
}

export const ScatterKeypoints = ({people}:PeopleProps) => {

    const data = {
        datasets:people.map(person => {
            const {keypoints, box} = person
            const label = `ID:${box.id}`
            const data = (Object.keys(keypoints) as (keyof Keypoints)[]).map(point_name => {
                const {x, y} = keypoints[point_name];
                return {x:x, y:y}
            })

            return {label:label, data:data}
        })
        }
    const options = {
        scales: {
            y: {
                reverse: true
            }
        }
    }

    return <>
            <Scatter data={data} options={options}></Scatter>
    </>
}