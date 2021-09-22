import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { CardBox } from "src/components/cards/card-box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brand: {
      color: theme.palette.primary.main,
    },
    button: {
      borderRadius: theme.spacing(2),
    },
    actionBox: {
      justifyContent: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  }),
);

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();

  return (
    <CardBox>
      <Typography variant="h5" component="div" mb={4}>
        Welcome to <span className={classes.brand}>QuizMaker</span>
      </Typography>
      <Typography variant="body1">
        Here you can make your own quizzes and share them with friends!
      </Typography>
      <Box className={classes.actionBox}>
        <Link to="/create">
          <Button color="primary" variant="contained" size="large">
            Create a Quiz
          </Button>
        </Link>
      </Box>
    </CardBox>
  );
};
