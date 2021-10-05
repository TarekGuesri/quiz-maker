import React from "react";
import { useAppSelector } from "src/redux/hooks";
import { CardBox } from "src/components/cards/card-box";
import { CreateQuizForm } from "src/components/create-quiz/create-quiz-form";
import { CreateQuizSuccess } from "src/components/create-quiz/create-quiz-success";

const CreateQuiz: React.FC = ({}) => {
  const { quizID } = useAppSelector((state) => state.createQuiz);

  return (
    <CardBox>{quizID ? <CreateQuizSuccess /> : <CreateQuizForm />}</CardBox>
  );
};

export default CreateQuiz;
