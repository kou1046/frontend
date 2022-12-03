import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

axios.defaults.baseURL = 'http://133.62.185.133:8000/api'

export default function App({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState<number>(0)
  const tabNames = ['data', 'models']
  const links = ['/', '/models']

  return <>
    <Component {...pageProps} />
  </>
}