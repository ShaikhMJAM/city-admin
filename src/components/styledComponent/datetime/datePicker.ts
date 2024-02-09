import styles from "./styles";

// import { KeyboardDatePicker } from "@material-ui/pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { withStyles } from "@mui/styles";

const StyledKeyboardDatePicker = withStyles(styles)(DatePicker);

export default StyledKeyboardDatePicker;
