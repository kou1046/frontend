import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import {PageNationTeacher} from '../interfaces/basetype'
import { useEffect, useState } from 'react';


type PropsType = {
    teacherType: string, 
    limit: number, 
};

export const TeachersTable = ({teacherType, limit}:PropsType) => {

    const [teachersData, setTeachersData] = useState<PageNationTeacher>();

    const fetchTeachers = async (pageNum: number) => {
      const offset = (pageNum - 1) * limit
      const res = await axios.get(`/${teacherType}/`, {
        params: {
          limit: limit, 
          offset: offset
        }
      })
      setTeachersData(res.data)
    }

    const fetchPerson = async (personId: string) => {
      const res = await axios.get(`/people/${personId}/`)
      console.log(res.data)
    }

    useEffect(() => {
      const promise = fetchTeachers(1);
    }, [])

    return <>
      {teachersData === undefined ? null
      :
      <>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Person</TableCell>
              <TableCell>Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachersData?.results.map((el, i) => {
              return <TableRow key={'row-' + i.toString()}>
                        <TableCell><a href='#!' onClick={() => fetchPerson(el.person)}>{el.person}</a></TableCell>
                        <TableCell>{el.label}</TableCell>
                     </TableRow>
            })}
          </TableBody>
        </Table>
        <Pagination 
         count={Math.ceil(teachersData?.count / limit)}
         color="primary" 
         onChange={(e, pageNum) => fetchTeachers(pageNum)} />
      </>
    }
    </>
}