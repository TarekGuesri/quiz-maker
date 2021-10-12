import React, { FC } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";

import { useAppSelector } from "src/redux/hooks";
import varelaRound from "src/assets/fonts/VarelaRound-Regular.ttf";

export const Theme: FC = (props) => {
  const { darkMode } = useAppSelector((state) => state.ui);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#333" : "#f7f7f7",
        paper: darkMode ? "#333" : "#fbfbfb",
      },
      primary: {
        main: "#8e49de",
      },
      secondary: {
        main: "#edb200",
        dark: "#d19d00",
        light: "#ffe44b",
        contrastText: "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
        secondary: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      fontFamily: "Varela Round",
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
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "11px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
