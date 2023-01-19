import { Snackbar } from "@mui/material";
import axios from "axios";
import { PersonAnnotator } from "../../../components/teachers/PersonAnnotator";
import { ScatterTeachersDistribution } from "../../../components/teachers/ScatterTeachersDistribution";
import { TeachersTable } from "../../../components/teachers/TeachersTable";
import { useEffect, useState } from "react";
import { DashBoard } from "../../../components/DashBoard";
import { Grid, Box } from "@mui/material";
import { ITeacher2, PageNationContents, InferenceModel } from "../../../interfaces/basetype";
import { GetStaticProps, GetStaticPaths } from "next";

type PathParams = {
  modelId: string;
};

type PageProps = {
  model: InferenceModel;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const res = await axios.get<PageNationContents<InferenceModel>>("/models/");
  const modelIds = res.data.results.map((el) => el.id);
  return {
    paths: modelIds.map((el) => ({ params: { modelId: el } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { modelId } = context.params as PathParams;
  const res = await axios.get<InferenceModel>(`/models/${modelId}/`);

  const props = {
    model: res.data,
  };

  return { props };
};

export default function Home({ model }: PageProps) {
  const [newData, setNewData] = useState<ITeacher2>();
  const [open, setIsOpen] = useState<boolean>(false);

  const onRegist = (newTeacher: ITeacher2) => {
    setNewData(newTeacher);
    setIsOpen(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setIsOpen(false)}
        autoHideDuration={2000}
        message={`Registration success! id: ${newData?.person.id}`}
      />
      <div className="container mx-auto mt-10 text-center">
        <h1>{model.name}</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DashBoard>
            <Box sx={{ p: 2 }}>
              <PersonAnnotator model={model} callbackRegistration={onRegist} />
            </Box>
          </DashBoard>
          <DashBoard>
            <ScatterTeachersDistribution modelId={model.id} newTeacherState={newData} />
          </DashBoard>
          <div className="jusitify-center col-span-2 flex flex-col items-center">
            <TeachersTable modelId={model.id} limit={10}></TeachersTable>
          </div>
        </div>
      </div>
    </>
  );
}
