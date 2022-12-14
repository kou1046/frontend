import { useRouter } from "next/router"
import { Paper, Box } from "@mui/material";
import { PersonAnnotator } from "../../components/teachers/PersonAnnotator";
import { ScatterTeachersDistribution } from "../../components/teachers/ScatterTeachersDistribution";
import { TeachersTable } from "../../components/teachers/TeachersTable";
import { useState } from "react";
import { ITeacher2 } from "../../interfaces/basetype";

export default function Home () {

    const router = useRouter(); 
    const teacherName = router.query.teacherName as string
    const [newData, setNewData] = useState<ITeacher2>();
    const labels =  teacherName === "wth" ? ["Nothing", "Pen", "Microcomputer"] : ['Negative', "Positive"]

    if (!router.isReady){
        return null
    }

    return (
      <>
        <Paper elevation={20} sx={{m: 3,  display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <PersonAnnotator 
           teacherType={teacherName}
           labels={labels}
           callbackRegistration={newTeacher => setNewData(newTeacher)}/>
          <Box width={600} height={600}>
            <ScatterTeachersDistribution teacherType={teacherName} newTeacherState={newData}></ScatterTeachersDistribution>
          </Box>
        </Paper>
        <Box sx={{textAlign: 'center'}}>
          <TeachersTable teacherType={teacherName} limit={10}></TeachersTable>
        </Box>
      </>
    )
}