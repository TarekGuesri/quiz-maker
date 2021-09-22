import React, { ReactNode } from "react";
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
    cardContent: {
      padding: theme.spacing(4),
    },
  }),
);

interface CardBoxProps {
  children: ReactNode;
}

export const CardBox: React.FC<CardBoxProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Card sx={{ minWidth: 275 }} className={classes.root}>
      <CardContent className={classes.cardContent}>{children}</CardContent>
    </Card>
  );
};
