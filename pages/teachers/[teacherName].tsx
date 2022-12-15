import { useRouter } from "next/router"
import { Paper, Box } from "@mui/material";
import {Snackbar} from "@mui/material";
import { PersonAnnotator } from "../../components/teachers/PersonAnnotator";
import { ScatterTeachersDistribution } from "../../components/teachers/ScatterTeachersDistribution";
import { TeachersTable } from "../../components/teachers/TeachersTable";
import { useEffect, useState } from "react";
import { ITeacher2 } from "../../interfaces/basetype";

export default function Home () {

    const router = useRouter(); 
    const teacherName = router.query.teacherName as string
    const [newData, setNewData] = useState<ITeacher2>();
    const [open, setIsOpen] = useState<boolean>(false);
    const labels =  teacherName === "wth" ? ["Nothing", "Pen", "Microcomputer"] : ['Negative', "Positive"]

    if (!router.isReady){
        return null
    }

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
        <Paper elevation={20} sx={{m: 3,  display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <PersonAnnotator 
           teacherType={teacherName}
           labels={labels}
           callbackRegistration={onRegist}/>
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