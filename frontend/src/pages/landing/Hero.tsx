import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      borderRadius: theme.spacing(2),
    },
    brand: {
      color: theme.palette.primary.main,
    },
    cardContent: {
      padding: theme.spacing(4),
    },
    button: {
      borderRadius: theme.spacing(2),
    },
    cardActions: {
      justifyContent: "center",
      marginBottom: theme.spacing(3),
    },
  }),
);

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();

  return (
    <Card sx={{ minWidth: 275 }} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="div" mb={4}>
          Welcome to <span className={classes.brand}>QuizMaker</span>
        </Typography>
        <Typography variant="body1">
          Here you can make your own quizzes and share them with friends!
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to="/create">
          {" "}
          <Button color="primary" variant="contained" size="large">
            Create a Quiz
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
