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
      <Box sx={{ width: "100%" }}>
        <Box
          component={"li"}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightgray",
            m: "20px 0",
            p: "0 20em",
          }}
        >
          <Box component={"ul"}>
            <Link href="/">HOME</Link>
          </Box>
          <Box component={"ul"} sx={{ ml: "auto" }}>
            <Link href="/groups">Groups</Link>
          </Box>
          <Box component={"ul"}>
            <Link href="/models">Models</Link>
          </Box>
        </Box>
      </Box>
      <Component {...pageProps} />
    </>
  );
}
