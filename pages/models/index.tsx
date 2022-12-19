import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import {GetStaticProps, GetStaticPaths} from "next";
import {PageNationContents, InferenceModel} from "../../interfaces/basetype";

const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get<PageNationContents<InferenceModel>>("/inference-models/"); 
    const modelNames = res.data.results.map(el => el.name)
    const props = {
        modelNames: modelNames
    }
    return { props }
}

export default function Home({ modelNames }) {

}