import React, { FC } from "react";
import { useAppDispatch } from "src/redux/hooks";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { resetState } from "src/redux/create-quiz/create-quiz-slice";
import { config } from "src/config";

interface iProps {
  quizID: string;
}

export const CreateQuizSuccess: FC<iProps> = ({ quizID }) => {
  const dispatch = useAppDispatch();
  const quizURL = `${config.frontend.url}/quiz/${quizID}`;

  return (
    <>
      <Typography variant="h5" component="div" mb={1}>
        Your quiz has been created!
      </Typography>

      <Typography color="primary" mb={4}>
        <CheckCircleIcon fontSize="large" />
      </Typography>

      <Grid container>
        {/* Quiz URL */}
        <Grid item xs={12} mb={5}>
          Here&apos;s the link to your quiz:{" "}
          <Link href={quizURL}>{quizURL}</Link>
        </Grid>

        {/* Create another quiz button */}
        <Grid item xs={12} mb={1}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => dispatch(resetState())}
          >
            Create another quiz
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
