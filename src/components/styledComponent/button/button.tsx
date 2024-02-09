import Button from "@mui/material/Button";

import { withStyles } from "@mui/styles";

const GradientButton = withStyles({
  root: {
    background: "var(--theme-color1)",
    border: 0,
    color: "#fff !important",
    fontWeight: 700,
    minWidth: "80px",
    letterSpacing: "0.02857em",
    boxShadow: "none",
    textTransform: "capitalize",
    "&:hover": {
      // background: "rgb(200,0,0)",
      background: "var(--theme-color4)",
      boxShadow: "none",
    },
    "&:active": {
      background: "var(--theme-color4)",
      boxShadow: "none",
    },
    //Commented By digal on 20/07/2023 for form button color disable after click
    // "&:focus": {
    //   background: "var(--theme-color4)",
    //   boxShadow: "none",
    // },
  },
})(Button);

export default GradientButton;
