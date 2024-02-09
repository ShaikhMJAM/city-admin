import { createTheme, ThemeOptions } from "@mui/material/styles";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgb(128, 0, 0)",
    },
  },
  /**
   * updated by Altaf
   * setting mui v5 `TextField` default `outlined` variant to `standard`
   */
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
  },
});

export const theme2: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "rgb(128, 0, 0)",
    },
    secondary: {
      main: "#fff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
  },
});
