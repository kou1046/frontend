import { Grid, Box, Paper, Slider } from "@mui/material";

import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DashBoard } from "../../components/DashBoard";
import { ScatterDragDistribution } from "../../components/groups/ScatterDragDistribution";
import { PageNationContents, Frame, Group } from "../../interfaces/basetype";

type pathName = {
  groupName: string;
};

export const getStaticPaths: GetStaticPaths<pathName> = async () => {
  const res = await axios.get<PageNationContents<Group>>("/groups/");
  const groupNames = res.data.results.map((el) => el.name);
  return {
    paths: groupNames.map((el) => ({
      params: { groupName: el },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<pathName> = async (context) => {
  const { groupName } = context.params as pathName;
  return {
    props: {
      groupName: groupName,
    },
  };
};

export default function Home({ groupName }: pathName) {
  const [frameImg, setFrameImg] = useState<string>("");
  const [screenshotImg, setScreenshotImg] = useState<string>("");
  const [frameNum, setFrameNum] = useState<number>(1);

  const fetchFrames = async () => {
    const res = await axios.get<PageNationContents<Frame>>("/frames/", {
      params: {
        group: groupName,
        frame: frameNum,
      },
    });
    const res2 = await axios.get<string>(`/frames/${res.data.results[0].id}/img/`);
    const res3 = await axios.get<string>(`/devices/${res.data.results[0].device}/screenshot/`);
    setFrameImg(res2.data);
    setScreenshotImg(res3.data);
  };

  useEffect(() => {
    fetchFrames();
  }, [frameNum]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Box component="h1">
          {" "}
          Group: {groupName} Frame: {frameNum}
        </Box>
      </Box>
      <Grid container justifyContent={"center"} spacing={3}>
        {[frameImg, screenshotImg].map((el, i) => (
          <Grid item key={`gruop-${groupName}-img-${i}`}>
            <DashBoard>
              <>
                <Image src={`data:image/jpeg;base64,${el}`} alt={""} width={350} height={250} key={`img-${i}`} />
              </>
            </DashBoard>
          </Grid>
        ))}
        <Grid item xs={10}>
          <Slider value={frameNum} onChange={(e, num) => setFrameNum(num as number)} min={1} max={180000} />
        </Grid>
        <Grid item xs={10}>
          <DashBoard>
            <ScatterDragDistribution
              groupName={groupName}
              dataOnClick={(x, y) => setFrameNum(x)}
            ></ScatterDragDistribution>
          </DashBoard>
        </Grid>
      </Grid>
    </>
  );
}
