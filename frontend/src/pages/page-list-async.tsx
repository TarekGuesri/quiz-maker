import React, { FC, Suspense, lazy } from "react";

import { Loading } from "src/components/layout/loading";

const Landing = lazy(() => import("./landing"));
const CreateQuiz = lazy(() => import("./create-quiz"));

export const LandingPage: FC = () => (
  <Suspense fallback={<Loading />}>
    <Landing />
  </Suspense>
);
export const CreateQuizPage: FC = () => (
  <Suspense fallback={<Loading />}>
    <CreateQuiz />
  </Suspense>
);
