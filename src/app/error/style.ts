import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginTop: "60px",
    minHeight: "calc(100vh - 165px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  successImg: {
    maxHeight: "calc(100vh - 200px)",
  },
  center: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
  },
}));
