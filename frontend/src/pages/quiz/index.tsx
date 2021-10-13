import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
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
      <Typography color="secondary" variant="h5" component="div" mb={1}>
        {quiz?.title}
      </Typography>
      {!quizStarted ? <QuizIntro /> : <>QuizStarted</>}
    </CardBox>
  );
};

export default Quiz;
