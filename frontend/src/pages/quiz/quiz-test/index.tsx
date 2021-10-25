import React from "react";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { nextQuestion } from "src/redux/quiz/quiz-slice";

import { Timer } from "./timer";
import { Progress } from "./progress";
import { Question } from "./question";
import { Answers } from "./answers";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "115px",
    padding: "10px",
  },
}));

export const QuizTest: React.FC = () => {
  const classes = useStyles();
  const { quiz, questionIndex, selectedAnswers } = useAppSelector(
    (state) => state.quiz,
  );
  const dispatch = useAppDispatch();

  const { questions } = quiz;

  return (
    <>
      <Timer />

      <Progress />

      {questions.map((question, index) => (
        <Fade
          key={question.id}
          in={questionIndex === index}
          style={{
            transitionDelay: "300ms",
            display: questionIndex !== index ? "none" : "block",
          }}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <Question />

            <Answers />
          </div>
        </Fade>
      ))}

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => dispatch(nextQuestion())}
        // disabled={questions.length < 2}
      >
        Next
      </Button>
    </>
  );
};
