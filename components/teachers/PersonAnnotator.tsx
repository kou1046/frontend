import { SetStateAction, useEffect, useState } from "react";
import { ITeacher2, Person2 } from "../../interfaces/basetype"
import { Dispatch } from "react";
import Image from "next/image";
import axios from "axios";
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Box from "@mui/material/Box"

type PropsType = {
    labels: Array<string>
    teacherType: string
    callbackRegistration?: (newTeacher: ITeacher2) => void
};

export const PersonAnnotator = ({teacherType, labels, callbackRegistration}: PropsType) => {

    const [people, setPeople] = useState<Array<Person2>>([]);
    const [personImg, setPersonImg] = useState<string>("");
    const [index, setIndex] = useState<number>(0);

    const fetchPeople = async () => {
        const res = await axios.get(`/${teacherType}/add/`);
        const res2 = await axios.get(`/people/${res.data[0].id}/screenimg/`);
        setPeople(res.data);
        setPersonImg(res2.data);
    }

    const send = async (e: any ,label: number) => {
        const sendData = {
            person: people[index].id,
            label: label
        }

        const newTeacher = {
            person: people[index], 
            label: label
        }

        const res = await axios.post(`/${teacherType}/`, sendData)

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
        const promise = fetchPeople()
    }, [])

    return <>
            {people.length ?
                <Box sx={{textAlign: 'center', m:3}}>
                    <Box component={'h1'}>Add teacher</Box>
                    <Image 
                        src={`data:image/jpeg;base64,${personImg}`} 
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
            :
            <>
                読み込み中．．．
            </>
            }
    </>
}