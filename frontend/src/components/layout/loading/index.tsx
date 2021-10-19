import { CircularProgress, Box, Theme } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "400px",
    maxHeight: "400px",
    width: "100%",
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      left: "43%",
    },
  },
  box: {
    flexGrow: 1,
    padding: `${theme.spacing(25)} 0`,
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(16)} 0`,
    },
  },
}));

export const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <CircularProgress size={50} className={classes.root} />
    </Box>
  );
};
