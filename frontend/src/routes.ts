import { LandingPage, CreateQuizPage } from "src/pages/pageListAsync";

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
