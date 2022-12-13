import axios from 'axios'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Box from "@mui/material/Box"
import { ITeacher, Person } from '../interfaces/basetype'
import { PersonAnnotator } from '../components/PersonAnnotator'
import { TeachersTable } from '../components/TeachersTable'
import { ScatterTeachersDistribution } from '../components/ScatterTeachersDistribution'



export default function Home() {

  const [img, setImg] = useState<string>('');

  const fetchImg = async () => {
      const res = await axios.get('/wth/distribution/');
      setImg(res.data);
  }

  useEffect(() => {
    const promise = fetchImg();
  }, [])
  
  return (
    <>
      <Box sx={{m: 3,  display: 'flex', justifyContent:'center', alignItems: 'center'}}>
        <PersonAnnotator teacherType='wth' labels={['Nothing', 'Pen', 'Microcomputer']}></PersonAnnotator>
        <Image width={400} height={400} src={`data:image/svg+xml;base64,${img}`} alt='distribution'></Image>
      </Box>
      <TeachersTable teacherType='wth' limit={10}></TeachersTable>
      <Box sx={{mr:10, ml:10}}>
      </Box>
    </>
  )
}