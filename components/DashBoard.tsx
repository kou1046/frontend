import { Paper } from "@mui/material";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  className?: string;
};

export const DashBoard = ({ children, className }: PropsType) => {
  const defaultStyle =
    "flex h-[400px] flex-col justify-center items-center rounded-2xl border-2 border-black shadow-2xl ";
  const style = className ? defaultStyle + className : defaultStyle;

  return <div className={style}>{children}</div>;
};
