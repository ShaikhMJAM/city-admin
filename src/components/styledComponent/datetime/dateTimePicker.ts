import styles from "./styles";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { withStyles } from "@mui/styles";

const StyledKeyboardDateTimePicker = withStyles(styles)(DateTimePicker);

export default StyledKeyboardDateTimePicker;
