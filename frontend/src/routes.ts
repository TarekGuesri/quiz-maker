import { CreateQuizPage, LandingPage } from "src/pages/page-list-async";

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
];
