import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Theme } from "@mui/material";
import { store } from "src/redux/store";
import { startQuiz } from "src/redux/quiz/quiz-slice";
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
    marginBottom: theme.spacing(4),
  },
  button: {
    width: "150px",
    padding: "10px",
  },
}));

interface QuizIntroProps {
  description?: string | undefined;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ description }) => {
  const classes = useStyles();
  // We use this to hide div style (border and backround) when image is loading
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      <div className={imageLoading ? "" : classes.ligthBulbBackground}>
        <img
          src={ligthBulbImage}
          alt="light-bulb-image"
          className={classes.ligthBulbImage}
          onLoad={() => setImageLoading(false)}
          data-testid="light-bulb-image"
        />
      </div>

      <Typography mb={4} data-testid="quiz-description">
        {description || "This quiz doesn't have a descirption."}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => store.dispatch(startQuiz())}
      >
        Start Quiz
      </Button>
    </>
  );
};
