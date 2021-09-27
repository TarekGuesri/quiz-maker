import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { CardBox } from "src/components/cards/card-box";

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
  }),
);

interface QuestionOption {
  id: string;
  text: string;
}
interface Question {
  content: string;
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
}
interface CreateQuizState {
  title: string;
  questionIndex: number;
  questions: [Question];
}

const CreateQuiz: React.FC = ({}) => {
  const classes = useStyles();
  const firstAnswerID = uuidv4();
  const [state, setState] = useState<CreateQuizState>({
    title: "Test",
    questionIndex: 0,
    questions: [
      {
        content: "",
        options: [
          { id: firstAnswerID, text: "" },
          { id: uuidv4(), text: "" },
          { id: uuidv4(), text: "" },
          { id: uuidv4(), text: "" },
        ],
      },
    ],
  });

  const [selectedAnswers, setSelectedAnswers] = React.useState([firstAnswerID]);

  const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { questionIndex } = state;
    const selectedAnswer = (event.target as HTMLInputElement).value;

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedAnswer;

    setSelectedAnswers(newSelectedAnswers);
  };

  const { questions, questionIndex } = state;

  const currentQuestion = questions[questionIndex];

  // We use this for selected answer's radio button
  const selectedAnswer = selectedAnswers[questionIndex];

  return (
    <CardBox>
      <Typography variant="h5" component="div" mb={4}>
        Create a quiz
      </Typography>

      <Grid container>
        <Grid item xs={12} mb={3}>
          {/* Question */}
          <TextField
            id="outlined-basic"
            label="Question"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {/* Answers */}
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
              {currentQuestion.options.map((question) => (
                <FormControlLabel
                  key={question.id}
                  className={classes.formControlLabel}
                  value={question.id}
                  control={<Radio />}
                  label={<TextField />}
                />
              ))}
              <FormControlLabel
                className={classes.formControlLabel}
                value="female"
                control={<Radio />}
                label={<TextField />}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={<TextField />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default CreateQuiz;
