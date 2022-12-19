import { Paper } from "@mui/material";
import { ReactNode } from "react";

type PropsType = {
    children: ReactNode
};

export const DashBoard = ({children}: PropsType) => {
    return (
        <Paper elevation={10} sx={{
            height:400, 
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent:"center"
            }}>
            {children}
        </Paper>
    )
}