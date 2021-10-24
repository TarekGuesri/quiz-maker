import React from "react";

import { Timer } from "./timer";
import { Progress } from "./progress";
import { Question } from "./question";

export const QuizTest: React.FC = () => {
  return (
    <>
      <Timer />

      <Progress />

      <Question />
    </>
  );
};
