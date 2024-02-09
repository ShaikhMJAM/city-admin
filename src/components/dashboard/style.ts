import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  avtar: {
    bottom: "25px",
    minHeight: "48px",
    minWidth: "50px",
    // boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
    borderRadius: "10px",
  },
  card: {
    overflow: "inherit",
    "&:hover": {
      boxShadow:
        "8px 8px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
  },
  dashboardCard: {
    "&:hover": {
      boxShadow:
        "8px 8px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
  },
  typographytext: {
    display: "flex",
    justifyContent: "end",
    lineHeight: 1.5,
  },
}));
