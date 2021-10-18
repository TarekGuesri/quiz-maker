import React from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  addQuestion,
  changeAnswer,
  changeDescription,
  changeTitle,
  changePage,
  changeQuestion,
  createQuiz,
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

export const CreateQuizForm: React.FC = ({}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    title,
    description,
    questionIndex,
    questions,
    selectedAnswers,
    isLoading,
    errorMessage,
  } = useAppSelector((state) => state.createQuiz);

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

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    dispatch(changeDescription(value));
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
    <>
      <Typography color="secondary" variant="h4" component="div" mb={4}>
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
            inputProps={{ "data-testid": "quiz-title" }}
          />
        </Grid>

        {/* Quiz Description */}
        <Grid item xs={12} mb={3}>
          <TextField
            value={description}
            onChange={handleChangeDescription}
            label="Quiz Description"
            placeholder="Describe the general idea and the purpose of the quiz"
            variant="outlined"
            size="medium"
            fullWidth
            inputProps={{ "data-testid": "quiz-description" }}
          />
        </Grid>

        {/* Quiz Title */}
        <Grid item xs={12} mb={3}>
          <Divider />
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
            inputProps={{ "data-testid": "question-content" }}
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
                  control={
                    <Radio
                      inputProps={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        "data-testid": `answer-radio-${index + 1}`,
                      }}
                    />
                  }
                  label={
                    <TextField
                      label={`Answer ${index + 1}...`}
                      name={answer.id}
                      value={answer.text}
                      onChange={handleChangeAnswer}
                      inputProps={{ "data-testid": `answer-text-${index + 1}` }}
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
            renderItem={(item) => {
              if (item.type === "page") {
                return (
                  <PaginationItem {...item} data-testid={`page-${item.page}`} />
                );
              } else return <PaginationItem {...item} />;
            }}
          />
        </Grid>

        {/* Error Message */}
        {errorMessage && (
          <Grid item xs={12} mb={4}>
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          </Grid>
        )}
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
            <Tooltip title="You can only have 10 questions max per quiz">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => dispatch(addQuestion())}
                  disabled={questions.length >= 10}
                >
                  Add a question
                </Button>
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={4} className={classes.buttonGridItem}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => dispatch(createQuiz())}
              disabled={isLoading}
              data-testid={`create-button-loading-${isLoading}`}
            >
              Create Quiz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
