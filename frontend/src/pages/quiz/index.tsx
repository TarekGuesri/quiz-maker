import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { CardBox } from "src/components/cards/card-box";
import { resetState, getQuizByCode } from "src/redux/quiz/quiz-slice";
import { Loading } from "src/components/layout/loading";
import { QuizIntro } from "./quiz-intro";
import { QuizTest } from "./quiz-test";
import { QuizResult } from "./quiz-result";

const Quiz: React.FC = () => {
  const {
    quiz,
    isLoading,
    isSubmitting,
    quizStarted,
    quizResult,
    errorMessage,
  } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  const { quizCode } = useParams<{ quizCode: string }>();

  // Getting quiz
  useEffect(() => {
    dispatch(resetState());
    dispatch(getQuizByCode(quizCode));
  }, []);

  if (isLoading || isSubmitting) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <CardBox>
        <Typography color="secondary" variant="h5" component="div" mb={3}>
          {errorMessage}
        </Typography>
        {errorMessage === "Quiz not found!" && (
          <Typography component="div">
            Wrong link or quiz has been deleted!
          </Typography>
        )}
      </CardBox>
    );
  }

  if (quizResult >= 0) {
    return (
      <CardBox>
        <QuizResult score={quizResult} />
      </CardBox>
    );
  }

  return (
    <CardBox>
      <Typography color="secondary" variant="h4" component="div" mb={1}>
        {quiz.title}
      </Typography>
      <Box mt={3}>
        {!quizStarted && (
          <Fade
            in={!quizStarted}
            style={{ transitionDelay: "100ms" }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <QuizIntro description={quiz.description} />
            </div>
          </Fade>
        )}

        <Fade
          in={quizStarted}
          style={{ transitionDelay: "400ms" }}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <QuizTest />
          </div>
        </Fade>
      </Box>
    </CardBox>
  );
};

export default Quiz;
