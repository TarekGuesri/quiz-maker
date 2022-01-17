import { Environment } from "../types";

// Environment getter
export const getEnv: () => Environment = () => {
  switch (location.hostname) {
    case "localhost":
      return "development";
    default:
      return "production";
  }
};

const frontendPort = location.port;
const environments: Environment[] = ["development", "production"];
const e = environments.indexOf(getEnv());

export const config = {
  frontend: {
    url: [
      `http://localhost:${frontendPort}`, // Development
      "https://quiz-maker.tariqguesri.com", // Production
    ][e],
  },
  api: {
    url: [
      "http://localhost:5000", // Development
      "https://quiz-maker.tariqguesri.com", // Production
    ][e],
  },
};
