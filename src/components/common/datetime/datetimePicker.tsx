import { FC, useRef, useEffect } from "react";
import { useField, UseFieldHookProps } from "packages/form";
// import { KeyboardDateTimePickerProps } from "@material-ui/pickers";
import { DateTimePickerProps } from "@mui/lab/DateTimePicker";
import { KeyboardDateTimePicker } from "components/styledComponent/datetime";
import Grid, { GridProps } from "@mui/material/Grid";

import { Omit, Merge } from "../types";
import { TextField } from "components/styledComponent/textfield";
import {
  getParsedDate,
  isValidDate,
} from "components/utils/utilFunctions/function";

type KeyboardDateTimePickerPropsSubset = Omit<
  DateTimePickerProps<any>,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyDateTimePickerAllProps = Merge<
  Merge<KeyboardDateTimePickerPropsSubset, MyGridExtendedProps>,
  UseFieldHookProps
>;

export const MyDateTimePicker: FC<MyDateTimePickerAllProps> = ({
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
    // validationRun: "onChange",   // commented
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
    skipValueUpdateFromCrossFieldWhenReadOnly,
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
    <KeyboardDateTimePicker
      {...others}
      key={fieldKey}
      value={value === "" || value === null ? null : getParsedDate(value)} //make sure to pass null when input is empty string
      views={["year", "month", "day", "hours", "minutes", "seconds"]}
      disablePast={disablePast}
      disableFuture={disableFuture}
      //@ts-ignore
      onChange={handleChangeCustom}
      disabled={isSubmitting}
      readOnly={readOnly}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          name,
          id: fieldKey,
          onBlur: handleBlur,
          error: !isSubmitting && isError,
          helperText: !isSubmitting && isError ? error : null,
          inputProps: {
            tabIndex: readOnly ? -1 : undefined,
            ...inputProps,
          },
          InputProps: {
            readOnly: readOnly,
            ...InputProps,
          },
          InputLabelProps: {
            shrink: true,
          },
        },
        actionBar: {
          actions: ["today", "accept", "cancel"],
        },
      }}
      sx={{ width: "100%" }}
    />
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

export default MyDateTimePicker;
