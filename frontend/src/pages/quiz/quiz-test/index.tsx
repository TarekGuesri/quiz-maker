import React from "react";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { nextQuestion, getQuizResult } from "src/redux/quiz/quiz-slice";

import { Timer } from "./timer";
import { Progress } from "./progress";
import { Question } from "./question";
import { Answers } from "./answers";

const useStyles = makeStyles(() => ({
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

      <Progress
        currentQuestion={questionIndex + 1}
        totalQuestions={questions.length}
      />

      <Box mb={3}>
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
              <Question content={question.content} />

              <Answers
                answers={question.answers}
                selectedAnswer={selectedAnswers[index]}
              />
            </div>
          </Fade>
        ))}
      </Box>

      {questionIndex + 1 >= questions.length ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => dispatch(getQuizResult())}
          disabled={!selectedAnswers[questionIndex]}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => dispatch(nextQuestion())}
          disabled={!selectedAnswers[questionIndex]}
        >
          Next
        </Button>
      )}
    </>
  );
};
