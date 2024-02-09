import { useReducer, useContext, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
//import loginImg from "assets/images/SEO-bro.svg";
import loginImg from "assets/images/login-animation.svg";
import { useStyles } from "./style";
import { UsernamePasswordField } from "./usernamePassword";
import { AuthContext } from "./authContext";
//import * as API from "./api";
// import logo from "assets/images/logo.jpg";
// import logo from "assets/images/MobiFinLogo.jpg";
import { OTPModelForm } from "./otpPopup";
import { veirfyUsernameandPassword, verifyOTP } from "./api";
import { useSnackbar } from "notistack";
import { PasswordRotation } from "./pwdRotation";
import { GeneralAPI } from "registry/fns/functions";
import { useTranslation } from "react-i18next";

const inititalState = {
  username: "",
  firstName: "",
  lastName: "",
  loading: false,
  otploading: false,
  isError: false,
  isUsernameError: false,
  isPasswordError: false,
  userMessage: "",
  OtpuserMessage: "",
  userMessageforpassword: "",
  userMessageforusername: "",
  currentFlow: "username",
  transactionID: "",
  access_token: "",
  token_type: "",
  otpmodelClose: false,
  auth_type: "O",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "usernameandpasswordrequired": {
      return {
        ...state,
        loading: false,
        isError: true,
        isUsernameError: true,
        isPasswordError: true,
        otploading: false,
        userMessage: action?.payload?.error,
        userMessageforpassword: action?.payload?.errorPassword,
        userMessageforusername: action?.payload?.errorUsername,
        username: "",
        transactionID: "",
      };
    }
    case "passwordVerificationFailure":
      return {
        ...state,
        loading: false,
        isError: true,
        isUsernameError: false,
        isPasswordError: true,
        otploading: false,
        userMessage: action?.payload?.error,
        userMessageforpassword: action?.payload?.errorPassword,
        username: "",
        transactionID: "",
      };
    case "usernameVerificationFailure": {
      return {
        ...state,
        loading: false,
        isError: true,
        isUsernameError: true,
        isPasswordError: false,
        otploading: false,
        userMessage: action?.payload?.error,
        userMessageforusername: action?.payload?.errorUsername,
        username: "",
        transactionID: "",
      };
    }
    case "inititatePasswordVerification": {
      return {
        ...state,
        loading: true,
        isError: false,
        isUsernameError: false,
        isPasswordError: false,
        otploading: false,
        userMessage: "",
        userMessageforusername: "",
        userMessageforpassword: "",
        username: "",
        transactionID: "",
        access_token: "",
      };
    }
    case "passwordRotation": {
      return {
        ...state,
        loading: false,
        username: action?.payload?.username,
        access_token: action?.payload?.access_token,
        token_type: action?.payload?.token_type,
      };
    }
    case "passwordRotationsuccess": {
      return {
        ...state,
        loading: false,
        otpmodelClose: Boolean(action?.payload?.otpmodelclose),
      };
    }
    case "passwordVerificationSuccessful": {
      return {
        ...state,
        loading: false,
        otploading: false,
        transactionID: action?.payload?.transactionID,
        username: action?.payload?.username,
        auth_type: action?.payload?.auth_type,
        OtpuserMessage: "",
        access_token: action?.payload?.access_token,
        token_type: action?.payload?.token_type,
        otpmodelClose: false,
      };
    }
    case "inititateOTPVerification": {
      return {
        ...state,
        loading: false,
        otploading: true,
        OtpuserMessage: "",
        otpmodelClose: false,
      };
    }
    case "OTPVerificationComplate": {
      return {
        ...state,
        loading: false,
        otploading: false,
        OtpuserMessage: "",
      };
    }
    case "OTPVerificationFailed": {
      return {
        ...state,
        otploading: false,
        OtpuserMessage: action?.payload?.error,
        otpmodelClose: Boolean(action?.payload?.otpmodelclose),
      };
    }
    case "OTPResendSuccess": {
      return {
        ...state,
        transactionID: action?.payload?.transactionID,
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthLoginController = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [loginState, dispath] = useReducer(reducer, inititalState);
  const [open, setOpen] = useState(false);
  const [openpwdreset, setOpenPwdReset] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const otpResendRef = useRef(1);
  const { t } = useTranslation();
  // let path = require("assets/sound/successSound.mp3").default;
  // let audio = new Audio(path);
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin-panel", { replace: true });
    }
  }, [navigate, isLoggedIn]);
  const verifyUsernamePassword = async (username, password) => {
    if (Boolean(username) && Boolean(password)) {
      dispath({ type: "inititatePasswordVerification" });
      const { status, data, message, responseType, access_token } =
        await veirfyUsernameandPassword(username, password);
      if (status === "0" && responseType === "S") {
        dispath({
          type: "passwordRotation",
          payload: {
            username: username,
            access_token: access_token?.access_token,
            token_type: access_token?.token_type,
          },
        });
        setOpenPwdReset(true);
      } else if (status === "0") {
        dispath({
          type: "passwordVerificationSuccessful",
          payload: {
            transactionID: data?.REQUEST_CD,
            username: username,
            access_token: access_token?.access_token,
            token_type: access_token?.token_type,
            auth_type: data?.AUTH_TYPE,
          },
        });
        setOpen(true);
      } else {
        dispath({
          type: "passwordVerificationFailure",
          payload: { error: message, errorPassword: message },
        });
      }
    } else if (!Boolean(username) && !Boolean(password)) {
      dispath({
        type: "usernameandpasswordrequired",
        payload: {
          error: t("UsernamenandPasswordisRequired"),
          errorUsername: t("UsernameisRequired"),
          errorPassword: t("PasswordisRequired"),
        },
      });
    } else if (!Boolean(username)) {
      dispath({
        type: "usernameVerificationFailure",
        payload: {
          error: t("UsernameisRequired"),
          errorUsername: t("UsernameisRequired"),
        },
      });
    } else {
      dispath({
        type: "passwordVerificationFailure",
        payload: {
          error: t("PasswordisRequired"),
          errorPassword: t("PasswordisRequired"),
        },
      });
    }
  };
  const VerifyOTP = async (OTPNumber) => {
    if (Boolean(OTPNumber) && OTPNumber.toString().length === 6) {
      dispath({ type: "inititateOTPVerification" });
      const { status, data, message, menuapierror } = await verifyOTP(
        loginState.transactionID,
        loginState.username,
        OTPNumber,
        loginState.access_token,
        loginState.token_type,
        loginState.auth_type
      );

      if (status === "0") {
        // try {
        //   audio.play();
        // } catch (error) {
        // }
        dispath({ type: "OTPVerificationComplate" });
        login(data);
      } else if (menuapierror) {
        navigate("/error", {
          replace: true,
          state: { status: status, message: message },
        });
      } else if (status === "999") {
        dispath({
          type: "OTPVerificationFailed",
          payload: { error: message, otpmodelclose: true },
        });
        enqueueSnackbar(message, { variant: "error" });
      } else {
        dispath({
          type: "OTPVerificationFailed",
          payload: { error: message, otpmodelclose: false },
        });
      }
    } else {
      dispath({
        type: "OTPVerificationFailed",
        payload: { error: "Please enter a 6 digit OTP number" },
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePasswordRotationClose = (flag) => {
    if (flag === "0") {
      dispath({
        type: "passwordRotationsuccess",
        payload: { otpmodelclose: true },
      });
    }
    setOpenPwdReset(false);
  };
  useEffect(() => {
    GeneralAPI.setDocumentName("Login");
  }, []);
  return (
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginLeft}
      >
        <img alt="Bank Logo" src={loginImg} className={classes.loginImg} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        <img
          src={`${new URL(window.location.href).origin}/bank-logo.jpg`}
          alt="Logo"
          width="180px"
          height="auto"
        />
        <h2>
          {openpwdreset
            ? "Password Rotation"
            : open
            ? "OTP Authentication"
            : t("Login")}
        </h2>

        {openpwdreset ? (
          <PasswordRotation
            classes={classes}
            open={openpwdreset}
            username={loginState.username}
            accessToken={loginState.access_token}
            tokenType={loginState.token_type}
            handleClose={handlePasswordRotationClose}
          />
        ) : open ? (
          <OTPModelForm
            key={"OTPForm"}
            classes={classes}
            handleClose={handleClose}
            loginState={loginState}
            VerifyOTP={VerifyOTP}
            OTPError={loginState?.OtpuserMessage ?? ""}
            setOTPError={(error) => {
              dispath({
                type: "OTPVerificationFailed",
                payload: { error: error },
              });
            }}
            resendFlag={"LOGIN"}
            setNewRequestID={(newRequestID) => {
              dispath({
                type: "OTPResendSuccess",
                payload: { transactionID: newRequestID },
              });
              otpResendRef.current = otpResendRef.current + 1;
            }}
            otpresendCount={otpResendRef.current}
          />
        ) : (
          <UsernamePasswordField
            key="username"
            classes={classes}
            loginState={loginState}
            verifyUsernamePassword={verifyUsernamePassword}
          />
        )}
      </Box>
    </Box>
  );
};
