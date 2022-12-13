import { useEffect, useState } from "react";
import { ITeacher, Person } from "../interfaces/basetype"
import Image from "next/image";
import axios from "axios";
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { RSC_MODULE_TYPES } from "next/dist/shared/lib/constants";

type PropsType = {
    labels: Array<string>
    teacherType: string
};

export const PersonAnnotator = ({teacherType, labels}: PropsType) => {

    const [people, setPeople] = useState<Array<Person>>([]);
    const [index, setIndex] = useState<number>(0);

    const fetchPeople = async () => {
        const res = await axios.get(`/${teacherType}/add/`);
        setPeople(res.data);
    }

    const send = async (e: any ,label: number) => {
        const sendData = {
            person: people[index].id,
            label: label
        }
        const res = await axios.post(`/${teacherType}/`, sendData)
        if (index+1 === people.length){
            setPeople([]);
            setIndex(0);
        } else {
            setIndex(i => i+1)
        }
    }

    useEffect(() => {
        const promise = fetchPeople()
    }, [])

    return <>
            {people.length ?
            <Paper elevation={20}>
                <Box sx={{textAlign: 'center', m:3}}>
                    <Image 
                        src={`data:image/jpeg;base64,${people[index].img}`} 
                        alt={`person-${people[index].box.id}`} 
                        width={400}
                        height={300}
                        />
                    <ButtonGroup sx={{display:'flex', justifyContent:'center'}}>
                        {labels.map((el, i) => <Button 
                                                variant="contained"
                                                key={`btn-${i}`}
                                                onClick={(e) => send(e, i)}
                                                >{el}
                                                </Button>
                                                )}
                    </ButtonGroup>
                </Box>
            </Paper>
            :
            <>
                読み込み中．．．
            </>
            }
    </>
}