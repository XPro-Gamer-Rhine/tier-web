"use client";

import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[500],
      light: cyan[300],
      dark: cyan[700],
    },
    secondary: {
      main: cyan[300],
      light: cyan[100],
      dark: cyan[500],
    },
  },
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
});

export default theme;
