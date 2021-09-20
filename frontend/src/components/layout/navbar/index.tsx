import React from 'react';
import { makeStyles } from '@mui/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { switchDarkMode } from 'src/redux/ui/uiSlice';

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
});

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
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
            QuizMaker
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
