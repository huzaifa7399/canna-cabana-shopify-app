import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  typography: {
    fontFamily: "sans-serif",
    fontWeightLight: "300",
  },
  palette: {
    common: {
      black: "#000",
      white: "#FFF",
    },
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#1c2536",
    },
    success: {
      main: "#56CA00",
    },
    error: {
      main: "#FF4C51",
    },
    warning: {
      main: "#FFB400",
    },
    info: {
      main: "#16B1FF",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
      disabled: "#AAAAAA",
    },
    divider: "#000",
    background: {
      default: "#fff",
    },
  },
});
