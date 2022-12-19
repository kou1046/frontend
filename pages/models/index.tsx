import Link from 'next/link';
import axios from 'axios';
import { Box } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import {GetStaticProps, GetStaticPaths} from "next";
import { ModelInfoVisual } from '../../components/models/ModelInfo';
import {PageNationContents, InferenceModel, ModelInfo} from "../../interfaces/basetype";

type PageProps = {
    models: PageNationContents<InferenceModel>
    modelInfo: Array<ModelInfo>
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const res = await axios.get<PageNationContents<InferenceModel>>("/models/"); 
    const info = await Promise.all(res.data.results.map(async el => {
        const res = await axios.get(`models/${el.id}/info/`);
        return res.data
    }))

    const props = {
        models: res.data,
        modelInfo: info
    };

    return { props }
}

export default function Home({ models, modelInfo }: PageProps) {
    return <>
        <Grid container justifyContent={"center"} spacing={3}>
            {models.results.map((model, i) => {
                return <Grid item key={`model-${model.name}`} xs={10}>
                          <Paper elevation={10} sx={{p: 3}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                              <h1>{model.name}</h1>
                              <Box sx={{ml:'auto'}}>
                                <Link href={`/models/${model.id}/teachers`}>
                                  <h2>教師データを集める →</h2>
                                </Link>
                              </Box>
                            </Box>
                            <ModelInfoVisual modelInfo={modelInfo[i]}></ModelInfoVisual>
                          </Paper>
                       </Grid>
            })}
        </Grid>
    </>
}