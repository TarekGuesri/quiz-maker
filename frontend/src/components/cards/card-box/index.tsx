import React, { ReactNode } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      borderRadius: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
      },
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
