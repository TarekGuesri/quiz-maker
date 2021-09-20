import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from 'src/redux/hooks';
import varelaRound from 'src/assets/fonts/VarelaRound-Regular.ttf';

export const Theme: FC = (props) => {
  const { darkMode } = useAppSelector((state) => state.ui);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#333' : '#f7f7f7',
        paper: darkMode ? '#333' : '#fbfbfb',
      },
      primary: {
        main: '#8e49de',
        // contrastText:
      },
      secondary: {
        main: '#f9de4a',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: 'Varela Round',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Varela Round';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${varelaRound}) format('truetype');
        `,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <CssBaseline />
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
