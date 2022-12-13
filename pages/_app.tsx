import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import axios from 'axios'
import { Chart, registerables } from 'chart.js';


axios.defaults.baseURL = 'http://133.62.185.133:8000/api'
Chart.register(...registerables);

export default function App({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState<number>(0)
  const tabNames = ['data', 'models']
  const links = ['/', '/models']

  return <>
    <Component {...pageProps} />
  </>
}