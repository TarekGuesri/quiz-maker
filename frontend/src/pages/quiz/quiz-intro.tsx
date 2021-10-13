import React from "react";
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
  },
}));

export const QuizIntro: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.ligthBulbBackground}>
        <img
          src="https://cdn-icons.flaticon.com/png/512/3261/premium/3261308.png?token=exp=1634148994~hmac=cd3c4ae1c889fa44e37febffd98be9eb"
          alt=""
          className={classes.ligthBulbImage}
        />
      </div>
    </>
  );
};
