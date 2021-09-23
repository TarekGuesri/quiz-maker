import { CircularProgress } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "400px",
    maxHeight: "400px",
    width: "100%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export const Loading: React.FC = () => {
  const classes = useStyles();
  return <CircularProgress size={50} className={classes.root} />;
};
