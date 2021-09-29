import React from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { CardBox } from "src/components/cards/card-box";
import {
  addQuestion,
  changeAnswer,
  changePage,
  changeTitle,
  changeQuestion,
  removeQuestion,
  setSelectedAnswer,
} from "src/redux/create-quiz/create-quiz-slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      color: theme.palette.text.primary,
      fontSize: "1.2rem",
      "&.Mui-focused": {
        color: theme.palette.text.primary,
      },
    },
    helperText: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
    },
    formControlLabel: {
      marginBottom: theme.spacing(2),
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "190px",
      padding: "10px",
    },
    buttonGridItem: {
      paddingLeft: "0!important",
    },
  }),
);

const CreateQuiz: React.FC = ({}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { title, questionIndex, questions, selectedAnswers } = useAppSelector(
    (state) => state.createQuiz,
  );

  const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnswer = (event.target as HTMLInputElement).value;

    dispatch(setSelectedAnswer(selectedAnswer));
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    if (value) {
      dispatch(changePage(value - 1));
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(changeTitle(value));
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(changeQuestion(value));
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    dispatch(changeAnswer({ name, value }));
  };

  const currentQuestion = questions[questionIndex];

  // We use this for selected answer's radio button
  const selectedAnswer = selectedAnswers[questionIndex];

  return (
    <CardBox>
      <Typography variant="h5" component="div" mb={4}>
        Create a quiz
      </Typography>

      <Grid container>
        {/* Quiz Title */}
        <Grid item xs={12} mb={3}>
          <TextField
            value={title}
            onChange={handleChangeTitle}
            label="Quiz Title"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Grid>

        {/* Question */}
        <Grid item xs={12} mb={3}>
          <TextField
            value={currentQuestion.content}
            onChange={handleChangeQuestion}
            label={`Question ${questionIndex + 1}`}
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Grid>

        {/* Answers */}
        <Grid item xs={12} mb={2}>
          <FormControl component="fieldset">
            <FormLabel className={classes.formLabel}>
              Answers
              <Typography className={classes.helperText}>
                Check the correct answer
              </Typography>
            </FormLabel>

            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={selectedAnswer}
              onChange={handleSelectAnswer}
            >
              {currentQuestion.answers.map((answer, index) => (
                <FormControlLabel
                  key={answer.id}
                  className={classes.formControlLabel}
                  value={answer.id}
                  control={<Radio />}
                  label={
                    <TextField
                      label={`Answer ${index + 1} ...`}
                      name={answer.id}
                      value={answer.text}
                      onChange={handleChangeAnswer}
                    />
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Pagination */}
        <Grid item xs={12} mb={4}>
          <Pagination
            className={classes.pagination}
            count={questions.length}
            page={questionIndex + 1}
            color="primary"
            onChange={handleChangePage}
          />
        </Grid>

        {/* Buttons */}
        <Grid
          container
          item
          direction="row"
          xs={12}
          maxWidth={700}
          mx="auto"
          spacing={3}
        >
          <Grid item xs={12} md={4} className={classes.buttonGridItem}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => dispatch(removeQuestion())}
              disabled={questions.length < 2}
            >
              Remove Question
            </Button>
          </Grid>
          <Grid item xs={12} md={4} className={classes.buttonGridItem}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => dispatch(addQuestion())}
              disabled={questions.length >= 10}
            >
              Add a question
            </Button>
          </Grid>
          <Grid item xs={12} md={4} className={classes.buttonGridItem}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Create Quiz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default CreateQuiz;
