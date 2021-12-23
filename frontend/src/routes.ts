import {
  QuizPage,
  CreateQuizPage,
  LandingPage,
  NotFoundPage,
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
  {
    component: NotFoundPage,
    exact: false,
  },
];
