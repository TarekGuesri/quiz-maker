import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { NavLink } from "react-router-dom";
import React from "react";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { switchDarkMode } from "src/redux/ui/ui-slice";

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.ui);
  return (
    <Box sx={{ flexGrow: 1 }} py={3}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar className={classes.toolbar}>
          <Typography
            color="primary"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
              QuizMaker
            </NavLink>
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={darkMode}
                  onChange={() => dispatch(switchDarkMode())}
                />
              }
              label="🌙"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
