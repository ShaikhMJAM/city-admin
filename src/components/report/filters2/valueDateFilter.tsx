import { useState } from "react";
import { KeyboardDatePicker } from "components/styledComponent/datetime";
import Grid from "@mui/material/Grid";
import { TextField } from "components/styledComponent/textfield";

export const ValueDateFilter = ({
  filterValue,
  id,
  columnName,
  gridProps,
  dispatch,
}) => {
  const [value, setValue] = useState(filterValue?.value ?? "");

  const handleChange = (value) => {
    setValue(value);
    if (!isNaN(value)) {
      dispatch({
        type: "setValue",
        payload: {
          condition: "equal",
          value: value,
          id,
          columnName,
        },
      });
    } else {
      dispatch({
        type: "removeValue",
        payload: {
          id,
        },
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={6} {...gridProps}>
      <KeyboardDatePicker
        label={columnName}
        value={value === "" ? null : new Date(value)} //make sure to pass null when input is empty string
        onChange={handleChange}
        sx={{ width: "100%" }}
        slots={{
          textField: TextField,
        }}
        slotProps={{
          textField: {
            variant: "standard",
            InputLabelProps: {
              shrink: true,
            },
          },
          actionBar: {
            actions: ["today", "cancel"],
          },
        }}
      />
    </Grid>
  );
};
