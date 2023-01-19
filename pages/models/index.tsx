import Link from "next/link";
import axios from "axios";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import { GetStaticProps, GetStaticPaths } from "next";
import { ModelInfoVisual } from "../../components/models/ModelInfo";
import { PageNationContents, InferenceModel, ModelInfo } from "../../interfaces/basetype";
import { DashBoard } from "components/DashBoard";

type PageProps = {
  models: PageNationContents<InferenceModel>;
  modelInfo: Array<ModelInfo>;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const res = await axios.get<PageNationContents<InferenceModel>>("/models/");
  const info = await Promise.all(
    res.data.results.map(async (el) => {
      const res = await axios.get(`models/${el.id}/info/`);
      return res.data;
    })
  );

  const props = {
    models: res.data,
    modelInfo: info,
  };

  return { props };
};

export default function Home({ models, modelInfo }: PageProps) {
  return (
    <>
      <div className="container mx-auto mt-10 flex flex-col items-center justify-center space-y-5">
        {models.results.map((model, i) => {
          return (
            <DashBoard className="w-full p-5">
              <div className="flex justify-between">
                <h1>{model.name}</h1>
                <Link href={`/models/${model.id}/teachers`}>
                  <h2>教師データを集める →</h2>
                </Link>
              </div>
              <ModelInfoVisual modelInfo={modelInfo[i]}></ModelInfoVisual>
            </DashBoard>
          );
        })}
      </div>
    </>
  );
}
