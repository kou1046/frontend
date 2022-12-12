import axios from 'axios'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import Box from "@mui/material/Box"
import { Person } from '../interfaces/basetype'
import { PersonAnnotator } from '../components/PersonAnnotator'



export default function Home() {
  
  return (
    <>
    <PersonAnnotator></PersonAnnotator>
    </>
  )
}