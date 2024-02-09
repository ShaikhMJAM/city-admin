import { useState, useCallback, useRef, useEffect } from "react";
import { TextField, TextFieldProps } from "components/common/textField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const PasswordField: React.FC<TextFieldProps> = ({
  allowToggleVisiblity,
  ...others
}) => {
  // const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [showPasswordTime, setShowPasswordTime] = useState(0);
  const passwordVisibility = Date.now() < showPasswordTime;
  const timerRef = useRef<any>(null);
  const [, forceUpdate] = useState<any | null>();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  // const handleVisibility = useCallback(() => {
  //   setPasswordVisibility((old) => !old);
  // }, [setPasswordVisibility]);
  return (
    <TextField
      {...others}
      type={passwordVisibility ? "text" : "password"}
      InputProps={{
        endAdornment: Boolean(allowToggleVisiblity) ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={handleVisibility}
              onClick={() => {
                if (!passwordVisibility) {
                  setShowPasswordTime(Date.now() + 5000);
                  timerRef.current = setTimeout(
                    () => forceUpdate(Date.now()),
                    5000
                  );
                } else if (passwordVisibility) setShowPasswordTime(0);
              }}
              // edge="end"
              // tabIndex={-1}
            >
              {passwordVisibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default PasswordField;
