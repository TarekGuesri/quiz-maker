import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { config } from "src/config";

interface iProps {
  quizID: string;
}

export const CreateQuizSuccess: FC<iProps> = ({ quizID }) => {
  const quizURL = `${config.frontend.url}/quiz/${quizID}`;
  return (
    <>
      <Typography variant="h5" component="div" mb={2}>
        Your quiz has been created!
      </Typography>

      <Typography color="primary" mb={4}>
        <CheckCircleIcon fontSize="large" />
      </Typography>

      <Grid container>
        {/* Quiz Title */}
        <Grid item xs={12} mb={1}>
          Here&apos;s the link to your quiz:{" "}
          <Link href={quizURL}>{quizURL}</Link>
        </Grid>
      </Grid>
    </>
  );
};
