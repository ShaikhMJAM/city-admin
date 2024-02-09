import FormHelperText from "@mui/material/FormHelperText";
import { useState, useEffect, useMemo } from "react";
import { CellWrapper } from "./cellWrapper";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   KeyboardDateTimePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { theme2 } from "app/audit/theme";
import { KeyboardDateTimePicker } from "components/styledComponent/datetime";
import { getParsedDate } from "components/utils/utilFunctions/function";

const themeObj = unstable_createMuiStrictModeTheme(theme2);
export const EditableDatetimePicker = (props) => {
  const {
    value: initialValue,
    rows,
    row: { index, original },
    column: { id, validation, dateFormat, mindate, isReadOnly, __EDIT__ },
    updateGridData,
    hiddenFlag,
    loading,
  } = props;
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";
  const [loadingcall, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const isReadOnlyLocal = useMemo(() => {
    if (isReadOnly) {
      return true;
    }
    if (original?._isNewRow === false && __EDIT__?.isReadOnly === true) {
      return true;
    }
    return false;
  }, [isReadOnly, original?._isNewRow, __EDIT__]);
  const prevRows = rows
    .slice(0, index)
    .map((one) => one?.original)
    .filter((one) => Boolean(one[hiddenFlag]) !== true);

  const nextRows = rows
    .slice(index + 1)
    .map((one) => one?.original)
    .filter((one) => Boolean(one[hiddenFlag]) !== true);

  const onChange = (date) => {
    //console.log("e.target.value", e.target.checked);
    setValue(date);
    // setLoading(true);
    validation(date, original, prevRows, nextRows).then((result) => {
      // setLoading(false);
      updateGridData(index, id, date, true, result);
    });
  };

  const onBlur = () => {
    setLoading(true);
    validation(value, original, prevRows, nextRows).then((result) => {
      setLoading(false);
      updateGridData(index, id, value, true, result);
    });
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // console.log(value)
  return (
    <CellWrapper showBorder {...props}>
      <ThemeProvider theme={themeObj}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <KeyboardDateTimePicker
            format={dateFormat || "dd/MM/yyyy HH:mm:ss"}
            onChange={onChange}
            value={value === "" || value === null ? null : getParsedDate(value)}
            disabled={loadingcall || loading}
            readOnly={isReadOnlyLocal}
            minDate={mindate || new Date("1900-01-01")}
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            slotProps={{
              textField: {
                onBlur,
                name: id,
                "aria-label": "Select Date",
                autoComplete: "off",
                InputProps: { disableUnderline: true },
                InputLabelProps: { shrink: true },
              },
              actionBar: {
                actions: ["today", "accept", "cancel"],
              },
            }}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </ThemeProvider>
      {Boolean(externalTouched) && Boolean(externalError) ? (
        <FormHelperText style={{ whiteSpace: "break-spaces" }} error={true}>
          {externalError}
        </FormHelperText>
      ) : null}
    </CellWrapper>
  );
};
