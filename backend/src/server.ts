import { app } from "./app";
import colors from "colors";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  ),
);
