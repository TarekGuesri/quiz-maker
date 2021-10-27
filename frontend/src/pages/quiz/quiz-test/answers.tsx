import React from "react";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/hooks";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { QuestionAnswer } from "src/types";
import { selectAnswer } from "src/redux/quiz/quiz-slice";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    width: "100%",
    borderRadius: "12px",
  },
  buttonBase: {
    marginBottom: theme.spacing(2),
  },
  ripple: {
    color: "#fff",
  },
  card: {
    border: `1px solid ${theme.palette.text.primary}`,
    "&:hover": {
      cursor: "pointer",
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
      border: `1px solid ${theme.palette.secondary.dark}`,
    },
  },
  selected: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
}));

interface AnswersProps {
  answers: Array<QuestionAnswer>;
  selectedAnswer: string | unknown;
}

export const Answers: React.FC<AnswersProps> = ({
  answers,
  selectedAnswer,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <>
      {answers.map((answer, index) => (
        <ButtonBase
          key={answer.id}
          style={{ width: "100%" }}
          className={clsx(classes.root, classes.buttonBase)}
          TouchRippleProps={{ classes: { root: classes.ripple } }}
        >
          <Card
            key={answer.id}
            className={clsx(
              classes.root,
              classes.card,
              selectedAnswer === answer.id ? classes.selected : "",
            )}
            onClick={() => dispatch(selectAnswer(answer.id))}
            data-testid={`answer-${index + 1}`}
          >
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">{answer.text}</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      ))}
    </>
  );
};
