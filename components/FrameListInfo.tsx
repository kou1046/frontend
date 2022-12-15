import Image from "next/image"
import { Frame } from "../interfaces/basetype"
import Grid from "@mui/material/Grid"
import Paper from '@mui/material/Paper';
import { ScatterKeypoints } from "./ScatterKeypoints";
import { Chart, registerables } from 'chart.js';

export const FrameInfo = ({frame, people, img, group}:Frame) => {

    return <>
        <Paper elevation={10} sx={{p:3}}>
            <h1>{group.name}</h1>
            <img src={`data:image/jpeg;base64,${img}`}
            alt={`frame-${frame}`} width={500} height={300}></img>
         </Paper>
    </>
}

export interface FramesProps {
    frames : Array<Frame>
}

export const FrameListInfo = ({frames}:FramesProps) => {

    return <>
        <Grid container spacing={1} justifyContent='center'> 
            {frames.map((frame, i) => {
                return <Grid key={'grid-' + frame.group.name}>
                    <FrameInfo {...frame} key={frame.group.name}></FrameInfo>
                </Grid>
            })}
        </Grid>
    </>
}