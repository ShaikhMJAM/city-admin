import {
  // Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles";
import { GradientButton } from "components/styledComponent/button";
import CircularProgress from "@mui/material/CircularProgress";
import { Fragment, useState, useRef } from "react";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import DateFnsUtils from "@date-io/date-fns";
import { theme2 } from "app/audit/theme";
import { greaterThanInclusiveDate } from "registry/rulesEngine";
import { format } from "date-fns/esm";
import { TextField } from "components/styledComponent";
import { KeyboardDatePicker } from "components/styledComponent/datetime";
import { isValidDate } from "components/utils/utilFunctions/function";
import { isValid } from "date-fns";
const themeObj = unstable_createMuiStrictModeTheme(theme2);

export const DateUserRetrievalDialog = ({
  classes,
  open,
  handleClose,
  loginState,
  retrievalParaValues,
  defaultData,
  retrievalType,
}) => {
  const inputButtonRef = useRef<any>(null);
  const [selectedFromDate, setFromDate] = useState(
    defaultData?.A_FROM_DT ?? new Date(format(new Date(), "yyyy/MM/dd"))
  );
  const [selectedToDate, setToDate] = useState(
    defaultData?.A_TO_DT ?? new Date(format(new Date(), "yyyy/MM/dd"))
  );
  const [loginID, setLoginID] = useState(defaultData?.A_CUSTOM_USER_NM ?? "");
  const [error, SetError] = useState({ isError: false, error: "" });
  const [fromerror, SetFromError] = useState({ isError: false, error: "" });
  const [errorLoginID, SetErrorLoginID] = useState({
    isError: false,
    error: "",
  });
  const onFromDateChange = (date) => {
    if (isValidDate(date)) {
      date = new Date(format(date, "yyyy/MM/dd"));
      setFromDate(date);
      if (!greaterThanInclusiveDate(selectedToDate, date)) {
        SetFromError({
          isError: true,
          error: "From Date should be less than or equal to To Date.",
        });
      } else {
        SetFromError({
          isError: false,
          error: "",
        });
        SetError({
          isError: false,
          error: "",
        });
      }
    } else if (!date) {
      SetFromError({
        isError: true,
        error: "This Field is Required",
      });
      return;
    } else if (!isValid(date)) {
      SetFromError({
        isError: true,
        error: "Must be a valid date",
      });
      return;
    }
  };

  const onToDateChange = (date) => {
    if (isValidDate(date)) {
      date = new Date(format(date, "yyyy/MM/dd"));
      setToDate(date);
      if (!greaterThanInclusiveDate(date, selectedFromDate)) {
        SetError({
          isError: true,
          error: "To Date should be greater than or equal to From Date.",
        });
      } else {
        SetError({
          isError: false,
          error: "",
        });
        SetFromError({
          isError: false,
          error: "",
        });
      }
    } else if (!date) {
      SetError({
        isError: true,
        error: "This Field is Required",
      });
      return;
    } else if (!isValid(date)) {
      SetError({
        isError: true,
        error: "Must be a valid date",
      });
      return;
    }
  };
  const onFocusSelectDate = (date) => {
    date.target.select();
  };

  return (
    <Fragment>
      <Dialog open={open} maxWidth="xs" sx={{ marginBottom: "12rem" }}>
        <DialogTitle>Enter Retrieval Parameters</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Please Verify OTP</DialogContentText> */}
          <div
            className={classes.divflex}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                inputButtonRef?.current?.click?.();
              }
            }}
          >
            <ThemeProvider theme={themeObj}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div style={{ display: "flex", gap: "1.25rem" }}>
                  <KeyboardDatePicker
                    // @ts-ignore
                    format="dd/MM/yyyy"
                    label="From Date"
                    onChange={onFromDateChange}
                    value={selectedFromDate}
                    disableFuture
                    slots={{
                      textField: TextField,
                    }}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        placeholder: "DD/MM/YYYY",
                        error: fromerror.isError,
                        helperText: fromerror.error,
                        onFocus: onFocusSelectDate,
                        "aria-label": "Select Date",
                        InputLabelProps: { shrink: true },
                        autoComplete: "off",
                      },
                      actionBar: {
                        actions: ["today", "accept", "cancel"],
                      },
                    }}
                  />
                  <KeyboardDatePicker
                    //@ts-ignore
                    format="dd/MM/yyyy"
                    label="To Date"
                    onChange={onToDateChange}
                    minDate={selectedFromDate}
                    value={selectedToDate}
                    slots={{
                      textField: TextField,
                    }}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        error: error.isError,
                        helperText: error.error,
                        placeholder: "DD/MM/YYYY",
                        "aria-label": "Select Date",
                        InputLabelProps: { shrink: true },
                        autoComplete: "off",
                        onFocus: onFocusSelectDate,
                      },
                      actionBar: {
                        actions: ["today", "accept", "cancel"],
                      },
                    }}
                  />
                </div>
                <TextField
                  key={"login-id-static"}
                  id={"login-id-static"}
                  variant="standard"
                  name={"loginID"}
                  label={"Login ID"}
                  required={retrievalType === "DATEUSERNM" ? true : false}
                  value={loginID}
                  fullWidth={true}
                  style={{ marginTop: "15px" }}
                  placeholder="Enter Login ID"
                  onChange={(event) => {
                    const inputText = event.target.value;
                    if (inputText.length <= 16) {
                      const value = inputText.trimStart();
                      const inputValue = value.replace(/[^A-Za-z0-9]/g, "");
                      setLoginID(inputValue);
                      SetErrorLoginID({
                        isError: false,
                        error: "",
                      });
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errorLoginID.isError}
                  helperText={errorLoginID.error}
                  autoComplete={"off"}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
        </DialogContent>
        <Grid item container justifyContent="center" alignItems="center">
          <DialogActions className={classes.verifybutton}>
            <GradientButton
              // disabled={loginState.loading}
              disabled={
                loginState.loading || fromerror.isError || error.isError
              }
              endIcon={
                loginState.loading ? <CircularProgress size={20} /> : null
              }
              onClick={() => {
                if (
                  !greaterThanInclusiveDate(selectedToDate, selectedFromDate)
                ) {
                  SetError({
                    isError: true,
                    error: "To date should be greater than From date.",
                  });
                } else if (
                  !Boolean(loginID) &&
                  retrievalType === "DATEUSERNM"
                ) {
                  SetErrorLoginID({
                    isError: true,
                    error: "Required Value Missing For Login ID.",
                  });
                } else {
                  let retrievalValues = [
                    {
                      id: "A_FROM_DT",
                      value: {
                        condition: "equal",
                        value: format(
                          new Date(
                            selectedFromDate.toISOString() ?? new Date()
                          ),
                          "dd/MM/yyyy"
                        ),
                        columnName: "From Date",
                      },
                    },
                    {
                      id: "A_TO_DT",
                      value: {
                        condition: "equal",
                        value: format(
                          new Date(selectedToDate.toISOString() ?? new Date()),
                          "dd/MM/yyyy"
                        ),
                        columnName: "To Date",
                      },
                    },
                    {
                      id: "A_CUSTOM_USER_NM",
                      value: {
                        condition: "equal",
                        value: loginID,
                        columnName: "Login ID",
                      },
                    },
                  ];

                  retrievalParaValues(retrievalValues, {
                    A_FROM_DT: selectedFromDate,
                    A_TO_DT: selectedToDate,
                    A_CUSTOM_USER_NM: loginID,
                  });
                }
              }}
              ref={inputButtonRef}
              style={{ marginTop: "15px" }}
            >
              Ok
            </GradientButton>
            <GradientButton
              disabled={loginState.loading}
              onClick={handleClose}
              style={{ marginTop: "15px" }}
            >
              Cancel
            </GradientButton>
          </DialogActions>
        </Grid>
      </Dialog>
    </Fragment>
  );
};
