import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import { CardBox } from "src/components/cards/card-box";
import onlineTestImage from "src/assets/svg/online-test.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brand: {
      color: theme.palette.primary.main,
    },
    button: {
      borderRadius: theme.spacing(2),
      padding: "10px 46px",
      fontSize: "22px",
      [theme.breakpoints.down("md")]: {
        padding: "5px 30px",
        fontSize: "19px",
      },
    },
    actionBox: {
      justifyContent: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
    onlineTestImage: {
      width: "477px",
      [theme.breakpoints.down("md")]: {
        width: "247px",
      },
    },
    onlineTestBackground: {
      display: "inline-flex",
      padding: "18px",
      borderRadius: "100px",
    },
  }),
);

export const Hero: React.FC = () => {
  const classes = useStyles();

  return (
    <CardBox>
      <Typography variant="h5" mb={3}>
        Make your own quizzes and share them with others!
      </Typography>
      <div className={classes.onlineTestBackground}>
        <img src={onlineTestImage} alt="" className={classes.onlineTestImage} />
      </div>
      <Box className={classes.actionBox}>
        <Link to="/create">
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            size="large"
          >
            Create a Quiz
          </Button>
        </Link>
      </Box>
    </CardBox>
  );
};
