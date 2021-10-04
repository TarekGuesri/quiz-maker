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

const environments: Environment[] = ["development", "production"];
const e = environments.indexOf(getEnv());

export const config = {
  api: {
    url: [`http://localhost:5000`, "http://localhost:5000"][e],
  },
};
