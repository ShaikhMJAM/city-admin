import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflowY: "auto",
    width: "98%",
    marginLeft: "0px",
  },
  container: {
    padding: theme.spacing(2),
    // padding:"10px",
    height: "100%",
    display: "auto",
    // height: `calc(100vh - 70px)`,
  },
}));
