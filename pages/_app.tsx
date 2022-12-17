import '../styles/globals.css'
import Link from 'next/link';
import type { AppProps } from 'next/app'
import axios from 'axios'
import { Chart, registerables, defaults } from 'chart.js';
import Select from '@mui/material';
import MenuItem from '@mui/material';
import { Box } from "@mui/material"

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`
axios.interceptors.response.use(res => res, err => {
  alert("APIサーバーが起動していないか, エンドポイントが存在しません");
  throw err
})

Chart.register(...registerables);

export default function App({ Component, pageProps }: AppProps) {
  
  return <>
    <Box sx={{width: "100%"}}>
      <Box component={"li"} sx={{display: "flex", 
                                 justifyContent: "center",
                                 backgroundColor: 'lightgray',
                                 m: "20px 0",
                                 p: "0 20em"
                                 }}>
        <Box component={"ul"}><Link href="/">HOME</Link></Box>
        <Box component={"ul"} sx={{ml: "auto"}}><Link href="/groups">Groups</Link></Box>
        <Box component={"ul"}><Link href="/teachers/wth">Teachers</Link></Box>
        <Box component={"ul"}>Drags</Box>
      </Box>
    </Box>
    <Component {...pageProps} />
  </>
}