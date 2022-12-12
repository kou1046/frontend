import { useEffect, useState } from "react";
import { Person } from "../interfaces/basetype"
import Image from "next/image";
import axios from "axios";
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"


export const PersonAnnotator = () => {

    const [people, setPeople] = useState<Array<Person>>([]);
    const [index, setIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPeople = () => {
        if (!isLoading) {
            return
        }
        axios.get('/wth/add/').then(res => setPeople(res.data));
        setIsLoading(state => false)
    }

    const send = (e: any ,label: number) => {
        const sendData = {
            person: people[index].id,
            label: label
        }
        axios.post('/wth/', sendData).then(res => console.log(res.data))
        if (index+1 === people.length){
            setPeople([]);
            setIndex(0);
            setIsLoading(true);
        } else {
            setIndex(i => i+1)
        }
    }

    return <>
        <Box sx={{textAlign:'center', mt:5 }}>
            {people.length ?
                <Paper elevation={20} sx={{textAlign:'center', display:'inline-block', p:5} }>
                    <Box component={'p'}>What do the children in the red box have?</Box>
                    <Image 
                        src={`data:image/jpeg;base64,${people[index].img}`} 
                        alt={`person-${people[index].box.id}`} 
                        width={300}
                        height={180}
                        />
                    <ButtonGroup sx={{display:'flex', justifyContent:'center'}}>
                        {['Nothing', 'Pen', 'Microcomputer'].map((el, i) => <Button 
                                                                             variant="contained"
                                                                             color='error'
                                                                             key={`btn-${i}`}
                                                                             onClick={(e) => send(e, i)}
                                                                             >{el}
                                                                             </Button>
                                                                             )}
                    </ButtonGroup>
                    <Box component={'h2'}>{index+1}/{people.length}</Box>
                </Paper>
            :
            <>
                {fetchPeople()}
                読み込み中．．．
            </>
            }
        </Box>
    </>
}