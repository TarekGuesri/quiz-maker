import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: "#fff",
    marginBottom: theme.spacing(4),
    borderRadius: "12px",
    padding: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
}));

interface QuestionProps {
  content: string;
}

export const Question: React.FC<QuestionProps> = ({ content }) => {
  const classes = useStyles();

  return (
    <Card sx={{ minWidth: 275 }} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};
