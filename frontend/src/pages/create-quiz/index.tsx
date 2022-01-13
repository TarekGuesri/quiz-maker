import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "src/redux/hooks";
import { CardBox } from "src/components/cards/card-box";
import { CreateQuizForm } from "./create-quiz-form";
import { CreateQuizSuccess } from "./create-quiz-success";
import { resetState } from "src/redux/create-quiz/create-quiz-slice";

const CreateQuiz: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetState());
  }, []);

  const { quizID } = useAppSelector((state) => state.createQuiz);

  return (
    <CardBox>
      {quizID ? <CreateQuizSuccess quizID={quizID} /> : <CreateQuizForm />}
    </CardBox>
  );
};

export default CreateQuiz;
