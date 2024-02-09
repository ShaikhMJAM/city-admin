import { withStyles } from "@mui/styles";
import TableHead from "@mui/material/TableHead";

export const StickyTableHead = withStyles(() => ({
  root: {
    position: "sticky",
    zIndex: 10,
    top: 0,
    backgroundColor: "white",
    display: "block",
  },
}))(TableHead);
