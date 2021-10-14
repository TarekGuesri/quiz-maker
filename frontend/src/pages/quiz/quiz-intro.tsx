import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import ligthBulbImage from "src/assets/images/quiz-light-bulb.png";

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
  // We use this to hide div style (border and backround) when image is loading
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      <div className={imageLoading ? "" : classes.ligthBulbBackground}>
        <img
          src={ligthBulbImage}
          alt=""
          className={classes.ligthBulbImage}
          onLoad={() => setImageLoading(false)}
        />
      </div>
    </>
  );
};
