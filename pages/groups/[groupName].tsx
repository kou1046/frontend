import { Grid, Box, Paper, Slider } from "@mui/material";

import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DashBoard } from "../../components/DashBoard";
import { ScatterDragDistribution } from "../../components/groups/ScatterDragDistribution";
import ActionSyncChart from "components/groups/ActionSyncChart";
import ActionVariationChart from "components/groups/ActionVariationChart";
import { PageNationContents, Frame, Group, ActionSync, ActionVariation, Member } from "../../interfaces/basetype";

type pathName = {
  groupName: string;
};

type PageProps = {
  groupName: string;
  members: Array<Member>;
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
  const res = await axios.get<Array<Member>>(`/groups/${groupName}/members/`);
  return {
    props: {
      groupName: groupName,
      members: res.data,
    },
  };
};

export default function Home({ groupName, members }: PageProps) {
  const [frameImg, setFrameImg] = useState<string>("");
  const [screenshotImg, setScreenshotImg] = useState<string>("");
  const [frameNum, setFrameNum] = useState<number>(1);
  const [actionSyncs, setActionSyncs] = useState<Array<ActionSync>>([]);
  const [actionVariations, setActionVariations] = useState<Array<ActionVariation>>([]);

  const fetchActionSyncs = async () => {
    const res = await axios.get<Array<ActionSync>>(`/groups/${groupName}/actionsyncs/`);
    setActionSyncs(res.data);
  };

  const fetchActionVariations = async () => {
    const res = await axios.get<Array<ActionVariation>>(`/groups/${groupName}/actionvariations/`);
    setActionVariations(res.data);
  };

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
    fetchActionSyncs();
    fetchActionVariations();
  }, []);

  useEffect(() => {
    fetchFrames();
  }, [frameNum]);

  return (
    <>
      <div className="container mx-auto mt-3">
        <div className="flex justify-center space-x-10">
          {members.map((member) => (
            <div>
              <h1>{`ID: ${member.id}`}</h1>
              <img src={`data:image/jpeg;base64,${member.img}`} width={80} height={80}></img>
            </div>
          ))}
        </div>
        <div className="border-2 border-black">
          {actionSyncs.length
            ? actionSyncs.map((sync, i) => (
                <ActionSyncChart key={`sync-${i}`} actionSync={sync} dataOnClick={(x, y) => setFrameNum(x)} />
              ))
            : null}
          <h1 className="text-center">Frame</h1>
        </div>
        <div className="grid grid-cols-3">
          {actionVariations.length
            ? actionVariations.map((variation, i) => (
                <ActionVariationChart
                  key={`variation-${i}`}
                  actionVariation={variation}
                  dataOnClick={(x: number, y: number) => setFrameNum(x)}
                />
              ))
            : null}
        </div>
        Group: {groupName} Frame: {frameNum}
        <Slider value={frameNum} onChange={(e, num) => setFrameNum(num as number)} min={1} max={180000} />
        <div className="grid grid-cols-2 gap-5 border-2">
          {[frameImg, screenshotImg].map((el, i) => (
            <div className="mx-auto" key={`frame-img-${i}`}>
              <Image src={`data:image/jpeg;base64,${el}`} alt={""} width={800} height={500} key={`img-${i}`} />
            </div>
          ))}
          <div className="col-span-2">
            <DashBoard>
              <ScatterDragDistribution
                groupName={groupName}
                dataOnClick={(x, y) => setFrameNum(x)}
              ></ScatterDragDistribution>
            </DashBoard>
          </div>
        </div>
        <div className="grid grid-cols-3 border-2"></div>
      </div>
    </>
  );
}
