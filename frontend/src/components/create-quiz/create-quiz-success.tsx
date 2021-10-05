import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

interface iProps {
  quizID: string;
}

export const CreateQuizSuccess: FC<iProps> = ({ quizID }) => {
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
          <Link href={`http://localhost:3000/quiz/${quizID}`}>
            http://localhost:3000/quiz/{quizID}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
