import {Snackbar} from "@mui/material";
import axios from "axios";
import { PersonAnnotator } from "../../../components/teachers/PersonAnnotator";
import { ScatterTeachersDistribution } from "../../../components/teachers/ScatterTeachersDistribution";
import { TeachersTable } from "../../../components/teachers/TeachersTable";
import { useEffect, useState } from "react";
import { DashBoard } from "../../../components/DashBoard";
import { Grid, Box } from "@mui/material";
import { ITeacher2, PageNationContents, InferenceModel } from "../../../interfaces/basetype";
import { GetStaticProps, GetStaticPaths } from "next";

type PathParams = {
  modelId: string;
}

type PageProps = {
  model: InferenceModel
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const res = await axios.get<PageNationContents<InferenceModel>>("/models/");
  const modelIds = res.data.results.map(el => el.id);
  return {
    paths: modelIds.map(el => (
      {params: { modelId: el }}
    )), 
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async context => {
  const { modelId } = context.params as PathParams
  const res = await axios.get<InferenceModel>(`/models/${modelId}/`);

  const props  = {
    model: res.data
  }

  return { props }
}

export default function Home ({ model }: PageProps) {

    const [newData, setNewData] = useState<ITeacher2>();
    const [open, setIsOpen] = useState<boolean>(false);

    const onRegist = (newTeacher: ITeacher2) => {
        setNewData(newTeacher);
        setIsOpen(true);
    }

    return (
      <>
        <Snackbar 
         anchorOrigin={{vertical: "top", horizontal: "center"}} 
         open={open} 
         onClose={() => setIsOpen(false)} 
         autoHideDuration={2000}
         message={`Registration success! id: ${newData?.person.id}`}
        />
        <Box sx={{textAlign: "center"}}>
          <Box component={"h1"}>{model.name}</Box>
        </Box>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item>
            <DashBoard>
              <Box sx={{p: 2}}>
                <PersonAnnotator
                 model={model}
                 callbackRegistration={onRegist}/>
              </Box>
            </DashBoard>
           </Grid>
          <Grid item>
            <DashBoard>
              <ScatterTeachersDistribution modelId={model.id} newTeacherState={newData} />
            </DashBoard>
          </Grid>
        </Grid>
        <Box sx={{textAlign: 'center', mt: 3}}>
          <TeachersTable modelId={model.id} limit={10}></TeachersTable>
        </Box>
     </>
    )


}