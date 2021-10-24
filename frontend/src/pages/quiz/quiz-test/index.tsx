import React, { useEffect } from "react";

import { makeStyles } from "@mui/styles";

import Button from "@mui/material/Button";
import { Theme } from "@mui/material";
import { store } from "src/redux/store";
import { startQuiz, resetState } from "src/redux/quiz/quiz-slice";
import { Timer } from "./timer";
import { Progress } from "./progress";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "150px",
    padding: "10px",
  },
}));

export const QuizTest: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    return () => {
      store.dispatch(resetState());
    };
  }, []);

  return (
    <>
      <Timer />

      <Progress />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => store.dispatch(startQuiz())}
        // disabled={questions.length < 2}
      >
        Start Quiz
      </Button>
    </>
  );
};
