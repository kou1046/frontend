import { useRouter } from "next/router"
import { Paper, Box } from "@mui/material";
import {Snackbar} from "@mui/material";
import { PersonAnnotator } from "../../components/teachers/PersonAnnotator";
import { ScatterTeachersDistribution } from "../../components/teachers/ScatterTeachersDistribution";
import { TeachersTable } from "../../components/teachers/TeachersTable";
import { useEffect, useState } from "react";
import { DashBoard } from "../../components/DashBoard";
import { Grid } from "@mui/material";
import { ITeacher2 } from "../../interfaces/basetype";
import { GetStaticProps, GetStaticPaths } from "next";

type PathParams = {
  teacherName: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
 
  return {
    paths: ["wd", "programming", "wth"].map(el => (
      {
        params: {teacherName: el}
      }
    )), 
    fallback: false  // 上記以外のパスでアクセスした場合は 404 ページにする
  }
}

export const getStaticProps: GetStaticProps<PathParams> = async context => {
  const { teacherName } = context.params as PathParams

  const props: PathParams = {
    teacherName: teacherName
  }

  return { props }
}

export default function Home ({teacherName}: PathParams) {

    const [newData, setNewData] = useState<ITeacher2>();
    const [open, setIsOpen] = useState<boolean>(false);
    const labels =  teacherName === "wth" ? ["Nothing", "Pen", "Microcomputer"] : ['Negative', "Positive"]

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
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item>
            <DashBoard>
              <Box sx={{p: 2}}>
                <PersonAnnotator
                 teacherType={teacherName}
                 labels={labels}
                 callbackRegistration={onRegist}/>
              </Box>
            </DashBoard>
           </Grid>
          <Grid item>
            <DashBoard>
              <ScatterTeachersDistribution teacherType={teacherName} newTeacherState={newData} />
            </DashBoard>
          </Grid>
        </Grid>
        <Box sx={{textAlign: 'center', mt: 3}}>
          <TeachersTable teacherType={teacherName} limit={10}></TeachersTable>
        </Box>
     </>
    )


}