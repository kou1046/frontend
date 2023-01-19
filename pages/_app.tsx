import "../styles/globals.css";
import { Box } from "@mui/material";
import axios from "axios";
import type { AppProps } from "next/app";
import Link from "next/link";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_HOST}/api`;
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="container mx-auto h-12">
        <li className="grid h-12 grid-cols-3 items-center bg-gray-200 text-center">
          <ul className="">
            <Link href="/">HOME</Link>
          </ul>
          <ul>
            <Link href="/groups">Groups</Link>
          </ul>
          <ul>
            <Link href="/models">Models</Link>
          </ul>
        </li>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
