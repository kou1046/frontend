import { SetStateAction, useEffect, useState } from "react";
import { InferenceModel, ITeacher2, Person2 } from "../../interfaces/basetype"
import { Dispatch } from "react";
import Image from "next/image";
import axios from "axios";
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Box from "@mui/material/Box"
import { CircularProgress } from "@mui/material";

type PropsType = {
    model: InferenceModel
    callbackRegistration?: (newTeacher: ITeacher2) => void
};

export const PersonAnnotator = ({model, callbackRegistration}: PropsType) => {

    const [people, setPeople] = useState<Array<Person2>>([]);
    const [personImg, setPersonImg] = useState<string>("");
    const [index, setIndex] = useState<number>(0);

    const fetchPeople = async () => {
        const res = await axios.get(`/models/${model.id}/teachers/add/`);
        const res2 = await axios.get(`/people/${res.data[0].id}/screenimg/`);
        setPeople(res.data);
        setPersonImg(res2.data);
    }

    const send = async (e: any ,label: number) => {
        const sendData = {
            person: people[index].id,
            label: label, 
            model: model.id
        }

        const newTeacher = {
            person: people[index], 
            label: label
        }

        const res = await axios.post(`models/${model.id}/teachers/`, sendData)

        if (callbackRegistration){
            callbackRegistration(newTeacher);
        } 
                               
        if (index+1 === people.length){
            setPeople([]);
            setIndex(0);
        } else {
            const res = await axios.get(`/people/${people[index+1].id}/screenimg/`)
            setPersonImg(res.data)
            setIndex(i => i+1)
        }
    }

    useEffect(() => {
        fetchPeople()
    }, [])
    
    return <>
            {people.length ?
                <Box sx={{textAlign: "center"}}>
                    <Box component={"h3"}>教師データの追加</Box>
                    <img
                        src={`data:image/jpeg;base64,${personImg}`} 
                        alt={`person-${people[index].box.id}`} 
                        width={380}
                        height={250}
                        />
                    <ButtonGroup sx={{display:'flex', justifyContent:'center'}}>
                        {model.labelDescription
                        .split("_")
                        .map((el, i) => <Button 
                                         variant="contained"
                                         key={`btn-${i}`}
                                         onClick={(e) => send(e, i)}
                                         >{el}
                                         </Button>
                                         )}
                    </ButtonGroup>
                </Box>
            :
            <>
                <CircularProgress />
            </>
            }
    </>
}