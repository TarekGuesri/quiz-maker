import React from "react";
import { useAppSelector } from "src/redux/hooks";
import Typography from "@mui/material/Typography";
import { CardBox } from "src/components/cards/card-box";

const QuizIntro: React.FC = () => {
  const { quizID } = useAppSelector((state) => state.createQuiz);

  return <>QuizIntro</>;
};

export default QuizIntro;
