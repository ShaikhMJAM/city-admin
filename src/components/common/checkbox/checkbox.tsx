import { FC, useCallback } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import { CheckboxProps } from "@mui/material/Checkbox";
import { Checkbox } from "components/styledComponent/checkbox";
import Grid, { GridProps } from "@mui/material/Grid";
import FormHelperText, {
  FormHelperTextProps,
} from "@mui/material/FormHelperText";
import { Merge } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  label: string;
}

type MyCheckboxMixedProps = Merge<CheckboxProps, extendedFiledProps>;

interface MyCheckboxExtendedProps {
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyCheckboxAllProps = Merge<
  MyCheckboxMixedProps,
  MyCheckboxExtendedProps
>;

const MyCheckbox: FC<MyCheckboxAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  label,
  FormControlProps,
  FormHelperTextProps,
  FormControlLabelProps,
  GridProps,
  enableGrid,
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
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
    runValidationOnDependentFieldsChange,
    skipValueUpdateFromCrossFieldWhenReadOnly,
  });

  const handelChange = useCallback(
    (event) => {
      const { value, checked } = event.target;
      event.target["value"] = typeof checked === "boolean" ? checked : false;
      handleChange(event);
    },
    [handleChange]
  );

  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const result = (
    // @ts-ignore
    <FormControl
      {...FormControlProps}
      key={fieldKey}
      component="fieldset"
      disabled={isSubmitting}
      error={!isSubmitting && isError}
      onBlur={handleBlur}
    >
      <FormControlLabel
        {...FormControlLabelProps}
        name={name}
        control={
          <Checkbox
            {...others}
            readOnly={readOnly}
            tabIndex={readOnly ? -1 : undefined}
          />
        }
        onChange={handelChange}
        label={label}
        checked={Boolean(
          typeof value === "string"
            ? value === "Y" || value === "true"
              ? true
              : value === "N" || value === "false"
              ? false
              : false
            : value
        )}
      />

      {!isSubmitting && isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid style={{ alignSelf: "center" }} {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default MyCheckbox;
