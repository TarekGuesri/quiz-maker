import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import varelaRound from 'src/assets/fonts/VarelaRound-Regular.ttf';

const Theme: FC = (props) => {
  const darkMode: boolean = true;

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
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

export default Theme;
