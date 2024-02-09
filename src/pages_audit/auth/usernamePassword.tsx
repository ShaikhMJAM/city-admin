import { Fragment, useState, useEffect, useRef } from "react";
import { TextField } from "components/styledComponent/textfield";
import CircularProgress from "@mui/material/CircularProgress";
import { GradientButton } from "components/styledComponent/button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
// import { useSnackbar } from "notistack";

export const UsernamePasswordField = ({
  classes,
  loginState,
  verifyUsernamePassword,
}) => {
  const [input, setInput] = useState({ userName: "", password: "" });
  const [showPasswordTime, setShowPasswordTime] = useState(0);
  const showPassword = Date.now() < showPasswordTime;
  const [, forceUpdate] = useState<any | null>();
  const timerRef = useRef<any>(null);
  const { t } = useTranslation();
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "userName" && value) {
      loginState.isUsernameError = false;
    }
    if (name === "password" && value) {
      loginState.isPasswordError = false;
    }
    setInput((values) => ({ ...values, [name]: value }));
  };
  const inputRef = useRef<any>(null);
  const inputPassRef = useRef<any>(null);
  const inputButtonRef = useRef<any>(null);
  useEffect(() => {
    let timeoutCd;
    if (loginState.isUsernameError) {
      timeoutCd = setTimeout(() => {
        inputRef?.current?.focus?.();
      }, 1000);
    } else if (loginState.isPasswordError) {
      timeoutCd = setTimeout(() => {
        inputPassRef?.current?.focus?.();
      }, 1000);
    }
    return () => {
      if (timeoutCd) {
        clearTimeout(timeoutCd);
      }
    };
  }, [loginState.isUsernameError, loginState.isPasswordError]);
  useEffect(() => {
    let timeoutCd;
    if (loginState?.otpmodelClose ?? false) {
      setInput((values) => ({ ...values, password: "" }));
      timeoutCd = setTimeout(() => {
        inputPassRef?.current?.focus?.();
      }, 1500);
    }
    return () => {
      if (timeoutCd) {
        clearTimeout(timeoutCd);
      }
    };
  }, [loginState.otpmodelClose]);
  return (
    <Fragment>
      <div className="text">
        {t("LoginWithUsernameandPassword")}
        {/* {Login with your Username and Password} */}
      </div>
      <div className={classes.formWrap}>
        <TextField
          autoFocus={true}
          label={t("Username")}
          placeholder={String(t("EnterUsername"))}
          fullWidth
          type={"text"}
          name="userName"
          value={input.userName.trimStart() || ""}
          onChange={handleChange}
          error={loginState.isUsernameError}
          helperText={
            loginState.isUsernameError ? loginState.userMessageforusername : ""
          }
          InputLabelProps={{ shrink: true }}
          disabled={loginState.loading}
          autoComplete="off"
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              inputButtonRef?.current?.click?.();
            }
          }}
          inputProps={{ maxLength: "16" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "8px",
          }}
        >
          <TextField
            key="employee"
            label={t("Password")}
            placeholder={String(t("EnterPassword"))}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            onChange={handleChange}
            error={loginState.isPasswordError}
            helperText={
              loginState.isPasswordError
                ? loginState.userMessageforpassword
                : ""
            }
            disabled={loginState.loading}
            ref={inputPassRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                inputButtonRef?.current?.click?.();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
                    disabled={loginState.loading}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: "16" }}
          />
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <div style={{ flex: "auto" }}>
            <a href="forgotpassword">{t("ForgotPassword")}</a>
          </div>
          <div style={{ flex: "auto", textAlign: "end" }}>
            <GradientButton
              disabled={loginState.loading}
              endIcon={
                loginState.loading ? <CircularProgress size={20} /> : null
              }
              onClick={() =>
                verifyUsernamePassword(
                  (input.userName || "").toLowerCase(),
                  input.password
                )
              }
              ref={inputButtonRef}
              className={"glow-on-hover"}
            >
              {t("Login")}
            </GradientButton>
            {/* <GradientButton
              disabled={loginState.loading}
              endIcon={
                loginState.loading ? <CircularProgress size={20} /> : null
              }
              onClick={() => {
                enqueueSnackbar("This is Test", { persist: true, style: { right: 10, bottom: 10 } });
              }
              }
              ref={inputButtonRef}
              className={"glow-on-hover"}
            >
              {t("Testing")}
            </GradientButton> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
