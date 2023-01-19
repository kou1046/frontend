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
      <div className="container mx-auto mt-3 text-center">
        <h1>
          Group: {groupName} Frame: {frameNum}
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[frameImg, screenshotImg].map((el, i) => (
            <DashBoard>
              <>
                <img src={`data:image/jpeg;base64,${el}`} alt={""} width={"350px"} height={"250px"} key={`img-${i}`} />
              </>
            </DashBoard>
          ))}
          <div className="col-span-2">
            <Slider value={frameNum} onChange={(e, num) => setFrameNum(num as number)} min={1} max={180000} />
            <DashBoard>
              <ScatterDragDistribution
                groupName={groupName}
                dataOnClick={(x, y) => setFrameNum(x)}
              ></ScatterDragDistribution>
            </DashBoard>
          </div>
        </div>
      </div>
    </>
  );
}
