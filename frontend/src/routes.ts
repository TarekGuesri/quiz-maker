import {
  QuizPage,
  CreateQuizPage,
  LandingPage,
} from "src/pages/page-list-async";

export const routes = [
  {
    component: LandingPage,
    path: "/",
    exact: true,
  },
  {
    component: CreateQuizPage,
    path: "/create",
    exact: false,
  },
  {
    component: QuizPage,
    path: "/quiz/:quizCode",
    exact: false,
  },
];
