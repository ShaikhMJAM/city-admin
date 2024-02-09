import MenuItem from "@mui/material/MenuItem";
import { withStyles } from "@mui/styles";

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      padding: "2px 6px",
    },
    "& label": {
      marginBottom: 0,
    },
  },
}))(MenuItem);
