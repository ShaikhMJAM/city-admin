import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { GradientButton } from "components/styledComponent/button";
import CircularProgress from "@mui/material/CircularProgress";
import { Fragment, useState, useRef, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { OTPResendRequest } from "./api";
import { useSnackbar } from "notistack";
export const OTPModel = ({
  classes,
  open,
  handleClose,
  loginState,
  VerifyOTP,
  OTPError,
  setOTPError,
}) => {
  const [OTP, setOTP] = useState("");
  const [showPasswordTime, setShowPasswordTime] = useState(0);
  const showPassword = Date.now() < showPasswordTime;
  const [, forceUpdate] = useState<any | null>();
  const timerRef = useRef<any>(null);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  const [btnshow, setbtnshow] = useState(false);
  const inputButtonRef = useRef<any>(null);
  const renderButton = (buttonProps) => {
    let { remainingTime, ...other } = buttonProps;
    return (
      <a
        remainingtime={remainingTime}
        {...other}
        className={clsx(
          classes.resendbtnLink,
          !btnshow && classes.btnvisibleoff
        )}
      >
        Resend OTP
      </a>
    );
  };
  const ClickEventHandler = () => {
    if (!Boolean(OTP) || OTP.length < 6) {
      setOTPError("Please enter a 6 digit OTP number");
    } else {
      setOTPError("");
      VerifyOTP(OTP);
    }
  };
  const handleCloseEvent = () => {
    setOTPError("");
    setOTP("");
    handleClose();
  };
  const renderTime = (remainingtime) => {
    if (parseInt(remainingtime) === 0) {
      setTimeout(() => {
        setbtnshow(true);
      }, 700);
    }
    return (
      <span className={clsx(btnshow && classes.btnvisibleoff)}>
        OTP Resend In {remainingtime} Sec.
      </span>
    );
  };
  useEffect(() => {
    if (loginState?.otpmodelClose ?? false) {
      handleCloseEvent();
    }
  }, [loginState.otpmodelClose]);
  return (
    <Fragment>
      <Dialog fullWidth={false} open={open}>
        <DialogTitle>OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter OTP</DialogContentText>
          <div
            className={classes.divflex}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                inputButtonRef?.current?.click?.();
              }
            }}
          >
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure={!showPassword}
              className={classes.otpinputpadding}
            />

            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                if (!showPassword) {
                  setShowPasswordTime(Date.now() + 5000);
                  timerRef.current = setTimeout(
                    () => forceUpdate(Date.now()),
                    5000
                  );
                } else if (showPassword) setShowPasswordTime(0);
              }}
              onMouseDown={(e) => e.preventDefault()}
              disabled={loginState.otploading}
              className={classes.ibtnvisible}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
          {Boolean(OTPError) ? (
            <FormHelperText style={{ color: "red" }}>{OTPError}</FormHelperText>
          ) : null}
          {loginState.otploading ? null : (
            <ResendOTP
              onResendClick={() => setbtnshow(false)}
              // onTimerComplete={() => setbtnshow(true)}
              renderButton={renderButton}
              renderTime={renderTime}
              maxTime={60}
              className={classes.resendOTPalign}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.verifybutton}>
          <GradientButton
            disabled={loginState.otploading}
            endIcon={
              loginState.otploading ? <CircularProgress size={20} /> : null
            }
            onClick={ClickEventHandler}
            ref={inputButtonRef}
          >
            Verify
          </GradientButton>
          <GradientButton
            disabled={loginState.otploading}
            onClick={handleCloseEvent}
          >
            Cancel
          </GradientButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export const OTPModelForm = ({
  classes,
  handleClose,
  loginState,
  VerifyOTP,
  OTPError,
  setOTPError,
  resendFlag,
  setNewRequestID = (id) => {},
  otpresendCount = 0,
  authType = "O",
}) => {
  const [OTP, setOTP] = useState("");
  const [showPasswordTime, setShowPasswordTime] = useState(0);
  const showPassword = Date.now() < showPasswordTime;
  const [, forceUpdate] = useState<any | null>();
  const timerRef = useRef<any>(null);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  const [btnshow, setbtnshow] = useState(false);
  const [resendotpLoading, setResendotpLoading] = useState(false);
  const inputButtonRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const renderButton = (buttonProps) => {
    let { remainingTime, ...other } = buttonProps;
    return resendotpLoading ? (
      <a
        className={clsx(
          classes.resendbtnLink,
          !btnshow && classes.btnvisibleoff
        )}
        style={{ cursor: "wait" }}
      >
        Resend OTP {<CircularProgress size={20} color="secondary" />}
      </a>
    ) : (
      <a
        remainingtime={remainingTime}
        {...other}
        className={clsx(
          classes.resendbtnLink,
          !btnshow && classes.btnvisibleoff
        )}
      >
        Resend OTP
      </a>
    );
  };
  const ClickEventHandler = () => {
    if (!Boolean(OTP) || OTP.length < 6) {
      setOTPError("Please enter a 6 digit OTP number");
    } else {
      setOTPError("");
      VerifyOTP(OTP);
    }
  };
  const handleResendClick = async () => {
    setResendotpLoading(true);
    const { status, data, message } = await OTPResendRequest(
      resendFlag === "FORGET_PW" || resendFlag === "FORGT_TOTP"
        ? loginState?.requestCd
        : loginState?.transactionID,
      loginState?.username,
      resendFlag
    );
    setResendotpLoading(false);
    if (status === "0") {
      setNewRequestID(data?.REQUEST_CD);
      setbtnshow(false);
      enqueueSnackbar(message, { variant: "success" });
    } else {
      enqueueSnackbar(message, { variant: "error" });
    }
  };
  const handleCloseEvent = () => {
    setOTPError("");
    setOTP("");
    handleClose();
  };
  const renderTime = (remainingtime) => {
    if (parseInt(remainingtime) === 0) {
      setTimeout(() => {
        setbtnshow(true);
      }, 700);
    }
    return (
      <span className={clsx(btnshow && classes.btnvisibleoff)}>
        OTP Resend In {remainingtime} Sec.
      </span>
    );
  };
  useEffect(() => {
    if (loginState?.otpmodelClose ?? false) {
      handleCloseEvent();
    }
  }, [loginState.otpmodelClose]);
  return (
    <Fragment>
      <div className="text" style={{ marginTop: 5 }}>
        Please Enter OTP
        {loginState?.auth_type === "T" ? " (Authenticator)" : ""}
      </div>
      <div
        className={classes.otpformWrap}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            inputButtonRef?.current?.click?.();
          }
        }}
      >
        {/* <div
            className={classes.divflex}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                inputButtonRef?.current?.click?.();
              }
            }}
          > */}
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure={!showPassword}
          className={classes.otpinputform}
        />

        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            if (!showPassword) {
              setShowPasswordTime(Date.now() + 5000);
              timerRef.current = setTimeout(
                () => forceUpdate(Date.now()),
                5000
              );
            } else if (showPassword) setShowPasswordTime(0);
          }}
          onMouseDown={(e) => e.preventDefault()}
          disabled={loginState.otploading}
          className={classes.ibtnvisible}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
      {Boolean(OTPError) ? (
        <FormHelperText style={{ color: "red" }}>{OTPError}</FormHelperText>
      ) : null}
      {loginState?.auth_type === "T" ? (
        <div style={{ flex: "auto" }}>
          <a href="forgot-totp">Forgot TOTP</a>
        </div>
      ) : (
        <></>
      )}
      {loginState.otploading ||
      otpresendCount >= 3 ||
      loginState?.auth_type === "T" ? null : (
        <ResendOTP
          onResendClick={handleResendClick}
          // onTimerComplete={() => setbtnshow(true)}
          renderButton={renderButton}
          renderTime={renderTime}
          maxTime={60}
          className={classes.resendOTPalign}
        />
      )}
      <div style={{ marginTop: "20px", display: "flex" }}>
        <div style={{ flex: "auto", textAlign: "end" }}>
          <GradientButton
            disabled={loginState.otploading}
            onClick={handleCloseEvent}
            tabIndex={6}
          >
            Back
          </GradientButton>
          <GradientButton
            disabled={loginState.otploading}
            endIcon={
              loginState.otploading ? <CircularProgress size={20} /> : null
            }
            onClick={ClickEventHandler}
            ref={inputButtonRef}
            style={{ marginLeft: 5 }}
            tabIndex={5}
          >
            Verify
          </GradientButton>
        </div>
      </div>
    </Fragment>
  );
};
