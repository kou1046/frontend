import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Group, PageNationContents } from "../../interfaces/basetype"
import { DashBoard } from '../../components/DashBoard'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'

export default function Home () {

    const [groups, setGruops] = useState<PageNationContents<Group>>();

    const fetchGroups = async () => {
      const res = await axios.get<PageNationContents<Group>>("/groups/")
      setGruops(res.data);
    }
  
    useEffect(() => {
      fetchGroups();
    }, [])
  
    return <>
      <Grid container justifyContent={"center"} spacing={3}>
        {groups?.results.map(group => {
          return (
            <Grid key={`Group-${group.name}`} item>
              <Link href={`/groups/${group.name}/`}>
                <DashBoard>
                  <Box component={"h1"} sx={{m: "0 150px"}}>{group.name}</Box>
                </DashBoard>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </>
}