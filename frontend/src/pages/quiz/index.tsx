import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { CardBox } from "src/components/cards/card-box";
import { store } from "src/redux/store";
import { getQuizByCode } from "src/redux/quiz/quiz-slice";
import { Loading } from "src/components/layout/loading";
import { QuizIntro } from "./quiz-intro";

const Quiz: React.FC = () => {
  const { quiz, isLoading, quizStarted, errorMessage } = useAppSelector(
    (state) => state.quiz,
  );

  const { quizCode } = useParams<{ quizCode: string }>();

  // Getting quiz
  useEffect(() => {
    store.dispatch(getQuizByCode(quizCode));
  }, []);

  if (isLoading) {
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

  return (
    <CardBox>
      <Typography color="secondary" variant="h4" component="div" mb={1}>
        {quiz?.title}
      </Typography>
      <Box mt={3}>
        {!quizStarted ? (
          <Fade
            in={!quizStarted}
            style={{ transitionDelay: "100ms" }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <QuizIntro />
            </div>
          </Fade>
        ) : (
          <></>
        )}

        <Fade
          in={quizStarted}
          style={{ transitionDelay: "1000ms" }}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <>QuizStarted</>
          </div>
        </Fade>
      </Box>
    </CardBox>
  );
};

export default Quiz;
