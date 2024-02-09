import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const drawerWidth = 250;

export const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    position: "relative",
    top: "5px",
    bottom: "15px",
    background: "var(--white)",
    left: "6px",
    right: "15px",
    height: "99%",
    overflowY: "hidden",
    // borderBottomLeftRadius: "10px",
    borderRadius: "0.75rem",
    // borderRadius: "24px",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    borderBottomLeftRadius: "10px",
    borderStartStartRadius: "10px",
    // marginTop: "20px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6.5),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6.5),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    zIndex: 9999,
    height: "70px",
    ...theme.mixins.toolbar,
    background: "var(--white)",
  },
  hrCSS: {
    zIndex: 9999,
  },
  logo: {
    height: "50px",
  },
  buttonLink: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    display: "inline",
    margin: 0,
    padding: 0,
    "&:focus": {
      textDecoration: "none",
    },
    "$:hover": {
      textDecoration: "none",
    },
  },
}));

/*
  
*/
