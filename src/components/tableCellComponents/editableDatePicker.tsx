import FormHelperText from "@mui/material/FormHelperText";
import { useState, useEffect, useMemo } from "react";
import { CellWrapper } from "./cellWrapper";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { theme2 } from "app/audit/theme";
import { KeyboardDatePicker } from "components/styledComponent/datetime";
import {
  getParsedDate,
  isValidDate,
} from "components/utils/utilFunctions/function";

const themeObj = unstable_createMuiStrictModeTheme(theme2);
export const EditableDatePicker = (props) => {
  const {
    value: initialValue,
    rows,
    row: { index, original },
    column: {
      id,
      validation,
      dateFormat,
      mindate,
      maxdate,
      disablePast,
      disableFuture,
      disableToday,
      isReadOnly,
      __EDIT__,
    },
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
    if (date !== null && isValidDate(date) && disablePast === true) {
      const currentDate = new Date().toLocaleDateString();
      const selectedDate = new Date(date).toLocaleDateString();

      if (new Date(selectedDate) < new Date(currentDate)) {
        setValue(new Date());
        return;
      }
    }

    if (date !== null && isValidDate(date) && disableFuture === true) {
      const currentDate = new Date().toLocaleDateString();
      const selectedDate = new Date(date).toLocaleDateString();

      if (new Date(selectedDate) > new Date(currentDate)) {
        setValue(new Date());
        return;
      }
    }

    if (disableToday && isValidDate(date) && disablePast) {
      const currentDate = new Date().toLocaleDateString();
      const selectedDate = new Date(date).toLocaleDateString();

      if (selectedDate === currentDate) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() + 1);
        setValue(yesterday);
        return;
      }
    }
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
    // let initialDate = initialValue;
    // if (!initialDate) {
    //   initialDate = new Date();
    // }
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onBlur();
  }, []);

  return (
    <CellWrapper showBorder {...props}>
      <ThemeProvider theme={themeObj}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <KeyboardDatePicker
            format={dateFormat ?? "dd/MM/yyyy"}
            onChange={onChange}
            value={value === "" || value === null ? null : getParsedDate(value)}
            disabled={loadingcall || loading}
            readOnly={isReadOnlyLocal}
            minDate={mindate || new Date("1900-01-01")}
            maxDate={maxdate || null}
            disablePast={disablePast}
            disableFuture={disableFuture}
            // error={Boolean(externalTouched) && Boolean(externalError)}
            slotProps={{
              textField: {
                onBlur,
                "aria-label": "Select Date",
                name: id,
                autoComplete: "off",
                InputLabelProps: { shrink: true },
                InputProps: { disableUnderline: true },
              },
              actionBar: {
                actions: disableToday
                  ? ["accept", "cancel"]
                  : ["today", "accept", "cancel"],
              },
            }}
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
