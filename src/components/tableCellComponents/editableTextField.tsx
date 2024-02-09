import { useState, useEffect, useRef } from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { CellWrapper } from "./cellWrapper";

export const EditableTextField = (props) => {
  const {
    value: initialValue,
    rows,
    row: { index, original },
    column: {
      id,
      validation,
      isPassword,
      TableCellProps,
      isDisabledOnBlurEvent,
      maxLength,
      placeholder,
      autoComplete,
    },
    updateGridData,
    hiddenFlag,
    loading,
  } = props;
  const prevRows = rows
    .slice(0, index)
    .map((one) => one?.original)
    .filter((one) => Boolean(one[hiddenFlag]) !== true);
  const nextRows = rows
    .slice(index + 1)
    .map((one) => one?.original)
    .filter((one) => Boolean(one[hiddenFlag]) !== true);
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";
  const isPasswordFieldRef = useRef(Boolean(isPassword));
  const [inputType, setInputType] = useState(
    Boolean(isPassword) ? "password" : "text"
  );
  const toggleInputType = () =>
    setInputType((old) => (old === "password" ? "text" : "password"));
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loadingCall, setLoadingCall] = useState(false);
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    if (e.target.value.length <= (maxLength ?? 200)) {
      setValue(e.target.value);
    }
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (!Boolean(isDisabledOnBlurEvent)) {
      onBlurEvent();
    }
  };
  const onFocus = (e) => {
    e.target.select();
  };

  const onBlurEvent = () => {
    setLoadingCall(true);
    validation(value, original, prevRows, nextRows).then((result) => {
      setLoadingCall(false);
      updateGridData(index, id, value, true, result);
    });
  };
  useEffect(() => {
    if (Boolean(isDisabledOnBlurEvent)) {
      onBlurEvent();
    }
  }, [value]);
  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <CellWrapper showBorder {...props}>
      <Input
        name={id}
        value={typeof value === "string" ? value.trimStart() : value}
        onChange={onChange}
        onFocus={onFocus}
        type={inputType}
        onBlur={onBlur}
        margin="none"
        fullWidth
        error={Boolean(externalTouched) && Boolean(externalError)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        endAdornment={
          isPasswordFieldRef.current ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleInputType}
                onMouseDown={handleMouseDownPassword}
              >
                {inputType === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        style={{
          marginTop: "0px",
          direction: TableCellProps?.align === "right" ? "rtl" : "ltr",
        }}
        disableUnderline
        disabled={loading || loadingCall}
      />
      {Boolean(externalTouched) && Boolean(externalError) ? (
        <FormHelperText style={{ whiteSpace: "break-spaces" }} error={true}>
          {externalError}
        </FormHelperText>
      ) : null}
      {/* {maxLength ?? 0 > 0 ? (
        <FormHelperText
          error={false}
          style={{
            flex: 1,
            textAlign: "right",
            margin: "5px 15px 0 0",
          }}
        >
          {value.length}/{maxLength}
        </FormHelperText>
      ) : null} */}
    </CellWrapper>
  );
};
