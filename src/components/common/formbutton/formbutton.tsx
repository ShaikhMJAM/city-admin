import { Fragment } from "react";
import { Merge } from "../types";
import { UseFieldHookProps } from "packages/form";
import { FormControlLabelProps } from "@mui/material/FormControlLabel";
import { FormControlProps } from "@mui/material/FormControl";
import { FormHelperTextProps } from "@mui/material/FormHelperText";
import Grid, { GridProps } from "@mui/material/Grid";
import { ButtonProps } from "@mui/material/Button";
import { GradientButton } from "components/styledComponent/button";
interface extendedFiledProps extends UseFieldHookProps {
  label: string;
}
interface MyButtonExtendedProps {
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}
type MyButtonMixedProps = Merge<ButtonProps, extendedFiledProps>;
export type MyFormButtonAllProps = Merge<
  MyButtonMixedProps,
  MyButtonExtendedProps
>;
export const FormButton = ({
  label,
  enableGrid,
  GridProps,
  fieldKey,
  onFormButtonClickHandel,
  ...others
}) => {
  // console.log(others);
  const ClickEventCall = (e) => {
    if (typeof onFormButtonClickHandel === "function") {
      onFormButtonClickHandel(fieldKey);
    }
  };
  const result = (
    <Fragment>
      <GradientButton
        color="secondary"
        onClick={ClickEventCall}
        style={{ width: "100%" }}
      >
        {label}
      </GradientButton>
    </Fragment>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid
        {...GridProps}
        key={fieldKey}
        container
        justifyContent="center"
        alignItems="center"
      >
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default FormButton;
