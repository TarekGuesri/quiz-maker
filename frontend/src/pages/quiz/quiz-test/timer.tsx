import React from "react";
import ReactStopwatch from "react-stopwatch";

import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  ligthBulbImage: {
    width: "75px",
    [theme.breakpoints.down("md")]: {
      width: "50px",
    },
  },
  ligthBulbBackground: {
    border: `9px solid ${theme.palette.secondary.main}`,
    backgroundColor: `${theme.palette.primary.main}`,
    display: "inline-flex",
    padding: "18px",
    borderRadius: "100px",
    marginBottom: theme.spacing(4),
  },
  button: {
    width: "150px",
    padding: "10px",
  },
}));

export const Timer: React.FC = () => {
  const classes = useStyles();

  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      onChange={({
        hours,
        minutes,
        seconds,
      }: {
        hours: number;
        minutes: number;
        seconds: number;
      }) => {
        // console.log({ hours, minutes, seconds });
      }}
      onCallback={() => console.log("Finish")}
      render={({ formatted }: { formatted: string }) => {
        return (
          <div>
            <p>Formatted: {formatted}</p>
          </div>
        );
      }}
    />
  );
};
