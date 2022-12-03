import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import {ITeacher} from '../interfaces/basetype'
import { textAlign } from '@mui/system';

interface TeacherProps {
    teachers:Array<ITeacher> | undefined
}

export const TeachersTable = ({teachers}:TeacherProps) => {
    return <>
    <Paper>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>image</TableCell>
            <TableCell>label</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers?.map((el, i) => {
            return <TableRow>
                      <TableCell sx={{display:'flex', justifyContent:'center'}}>
                        <Image src={'data:image/jpeg;base64,' + el.person?.img} 
                               alt={'ID' + el.person.box.id.toString()}
                               height={120} width={100}>
                        </Image>
                      </TableCell>
                      <TableCell>{el.label}</TableCell>
                   </TableRow>
          })}
        </TableBody>
      </Table>
    </Paper>
    </>
}