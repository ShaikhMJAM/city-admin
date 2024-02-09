import { FC, useRef, useEffect } from "react";
import { useField, UseFieldHookProps } from "packages/form";
// import { KeyboardDatePickerProps } from "@material-ui/pickers";
import { DatePickerProps } from "@mui/lab/DatePicker";
import { KeyboardDatePicker } from "components/styledComponent/datetime";
import Grid, { GridProps } from "@mui/material/Grid";
import { Omit, Merge } from "../types";
import Button from "@mui/material/Button";
//import { theme2 } from "app/audit/theme";
import "./style.css";
import { TextField } from "components/styledComponent/textfield";
import { parse } from "date-fns";
import {
  getParsedDate,
  isValidDate,
} from "components/utils/utilFunctions/function";

//const themeObj: any = unstable_createMuiStrictModeTheme(theme2);
type KeyboardDatePickerPropsSubset = Omit<
  DatePickerProps<any>,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  disableTimestamp?: boolean;
  enableGrid: boolean;
}

export type MyDataPickerAllProps = Merge<
  Merge<KeyboardDatePickerPropsSubset, MyGridExtendedProps>,
  UseFieldHookProps
>;
export const MyDatePicker: FC<MyDataPickerAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  type,
  GridProps,
  enableGrid,
  //@ts-ignore
  isFieldFocused,
  InputProps,
  inputProps,
  runValidationOnDependentFieldsChange,
  skipValueUpdateFromCrossFieldWhenReadOnly,
  required,
  disablePast,
  disableFuture,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
    excluded,
    readOnly,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    //uncomment this line if there is any issue while validating
    validationRun, // uncommented
    /**
     * By Altaf Shaikh on 19-Jan-2024
     * keep validationRun coming from metadata for new datepicker to work on blur event
     * Reason: in onblur event validation function not call due to this comment `validationRun: "onChange"` and uncomment `validationRun`.
     */
    // validationRun: "onChange",     // commented
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
    skipValueUpdateFromCrossFieldWhenReadOnly,
    //@ts-ignore
  });

  const handleChangeCustom = (date) => {
    if (date !== null && isValidDate(date) && disablePast) {
      const currentDate = new Date().toLocaleDateString();
      const selectedDate = new Date(date).toLocaleDateString();

      if (new Date(selectedDate) < new Date(currentDate)) {
        handleChange(new Date());
        return;
      }
    }

    if (date !== null && isValidDate(date) && disableFuture) {
      const currentDate = new Date().toLocaleDateString();
      const selectedDate = new Date(date).toLocaleDateString();

      if (new Date(selectedDate) > new Date(currentDate)) {
        handleChange(new Date());
        return;
      }
    }
    handleChange(date);
  };

  useEffect(() => {
    if (typeof value === "string") {
      let result: any = getParsedDate(value);
      //@ts-ignore
      if (!isNaN(result)) {
        handleChange(result);
      }
    }
  }, [value, handleChange]);

  const focusRef = useRef();
  useEffect(() => {
    if (isFieldFocused) {
      //@ts-ignore
      setTimeout(() => {
        //@ts-ignore
        focusRef?.current?.focus?.();
      }, 1);
    }
  }, [isFieldFocused]);
  const isError = touched && (error ?? "") !== "";

  if (excluded) {
    return null;
  }
  const result = (
    // <ThemeProvider theme={themeObj}>
    <KeyboardDatePicker
      {...others}
      key={fieldKey}
      value={value === "" || value === null ? null : getParsedDate(value)} //make sure to pass null when input is empty string
      //@ts-ignore
      tabIndex={readOnly ? -1 : undefined}
      onChange={handleChangeCustom}
      // allowKeyboardControl={true}
      //option 2 if validationRun: "onChange" is not set, uncomment this code
      // onClose={() => {
      //   setTimeout(() => {
      //     //@ts-ignore
      //     focusRef?.current?.focus?.();
      //   }, 1);
      // }}
      disabled={isSubmitting}
      readOnly={readOnly}
      disablePast={disablePast}
      disableFuture={disableFuture}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          onBlur: handleBlur,
          id: fieldKey,
          name,
          autoComplete: "off",
          error: !isSubmitting && isError,
          required,
          helperText: !isSubmitting && isError ? error : null,
          inputProps: {
            tabIndex: readOnly ? -1 : undefined,
            ...inputProps,
          },
          InputProps: {
            readOnly: readOnly,
            ...InputProps,
          },
          InputLabelProps: { shrink: true },
          inputRef: focusRef,
        },
        actionBar: {
          actions: ["today", "accept", "cancel"],
        },
      }}
      sx={{ width: "100%" }}
      cancelLabel={
        <Button
          color="secondary"
          style={{ border: "1px solid rgba(128, 0, 0, 0.23)" }}
          disableElevation
        >
          Cancel
        </Button>
      }
      okLabel={
        <Button color="secondary" variant="contained" disableElevation>
          OK
        </Button>
      }
    />
    //</ThemeProvider>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default MyDatePicker;
