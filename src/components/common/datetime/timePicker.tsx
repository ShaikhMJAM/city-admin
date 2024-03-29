import { FC, useEffect, useRef } from "react";
import { useField, UseFieldHookProps } from "packages/form";
// import { KeyboardTimePickerProps } from "@material-ui/pickers";
import { TimePickerProps } from "@mui/lab/TimePicker";
import { KeyboardTimePicker } from "components/styledComponent/datetime";
import Grid, { GridProps } from "@mui/material/Grid";

import { Omit, Merge } from "../types";

//import { theme2 } from "app/audit/theme";
import "./styleTimepicker.css";
import { TextField } from "components/styledComponent";
// import {
//   ThemeProvider,
//   unstable_createMuiStrictModeTheme,
// } from "@material-ui/core";
// const themeObj = unstable_createMuiStrictModeTheme(theme2);

type KeyboardTimePickerPropsSubset = Omit<
  TimePickerProps<any>,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyTimeTimePickerAllProps = Merge<
  Merge<KeyboardTimePickerPropsSubset, MyGridExtendedProps>,
  UseFieldHookProps
>;

export const MyTimePicker: FC<MyTimeTimePickerAllProps> = ({
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
    //validationRun,
    validationRun: "onChange",
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
    skipValueUpdateFromCrossFieldWhenReadOnly,
  });
  useEffect(() => {
    if (typeof value === "string") {
      let result = new Date(value);
      //console.log(value, result);
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
    //<ThemeProvider theme={themeObj}>
    <KeyboardTimePicker
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value === "" ? null : new Date(value)} //make sure to pass null when input is empty string
      // @ts-ignore
      onChange={handleChange}
      disabled={isSubmitting}
      readOnly={readOnly}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          onBlur: handleBlur,
          error: !isSubmitting && isError,
          helperText: !isSubmitting && isError ? error : null,
          inputProps: {
            tabIndex: readOnly ? -1 : undefined,
            ...inputProps,
          },
          InputLabelProps: {
            shrink: true,
          },
          InputProps: {
            readOnly: readOnly,
            tabIndex: readOnly ? -1 : undefined,
            ...InputProps,
          },
        },
      }}
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

export default MyTimePicker;
