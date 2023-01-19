import Link from "next/link";
import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { Group, PageNationContents } from "../../interfaces/basetype";
import { DashBoard } from "../../components/DashBoard";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

type PageProps = {
  groups: PageNationContents<Group>;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const res = await axios.get<PageNationContents<Group>>("/groups/");
  const props = { groups: res.data };
  return { props };
};

export default function Home({ groups }: PageProps) {
  return (
    <>
      <div className="container mx-auto mt-10 grid grid-cols-1 gap-5 text-center text-2xl font-bold sm:grid-cols-2">
        {groups.results.map((group) => {
          return (
            <div className="" key={`Group-${group.name}`}>
              <Link href={`/groups/${group.name}/`}>
                <DashBoard>{group.name}</DashBoard>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
