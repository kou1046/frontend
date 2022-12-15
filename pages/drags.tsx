import axios from "axios"
import { useEffect, useState } from "react"
import { Box } from "@mui/system"
import { PageNationContents, Frame, Device } from "../interfaces/basetype";
import Image from "next/image";

export default function Drags () {

  const [frameNum, setFrameNum] = useState<number>(90000);
  const [frameImg, setFrameImg] = useState<string>("");
  const [screenshotImg, setScreenshotImg] = useState<string>("");
  const [skipNum, setSkipNum] = useState<number>(5);

  const onScroll = (e: any) => {
    if (e.deltaY < 0) {
      setFrameNum(frame => (frame + skipNum))
    } else {
      setFrameNum(frame => (frame - skipNum) >= 1 ? frame - skipNum : 1)
    }
  }

  const fetchContents = async () => {
    const res = await axios.get("/frames/", {
      params: {
        frame: frameNum, 
        group: "G3"
      }
    });
    const res2 = await axios.get(`/frames/${res.data.results[0].id}/img/`);
    const res3 = await axios.get(`/devices/${res.data.results[0].device}/screenshot/`);

    setFrameImg(res2.data); 
    setScreenshotImg(res3.data);
  }
  
  useEffect(() => {
    fetchContents();
  }, [frameNum])

  return <>
    <Box sx={{width: 300, height:300, backgroundColor: "black"}} onWheel={onScroll}></Box>
    <Box component={"h1"}>{frameNum}</Box>
    <Image src={`data:image/jpeg;base64,${frameImg}`} width={400} height={280} alt={"test"}  onWheel={onScroll}/>
    <Image src={`data:image/jpeg;base64,${screenshotImg}`} width={400} height={280} alt="test" />
  </>
}