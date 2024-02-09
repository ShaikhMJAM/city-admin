import { useState } from "react";
import { TextField } from "components/styledComponent/textfield";
import { SelectRenderOnly } from "components/common/select/render";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";

const options = [
  { label: "starts with", value: "startsWith" },
  { label: "ends with", value: "endsWith" },
  { label: "equal", value: "equal" },
  { label: "contains", value: "contains" },
];

export const ValueFilter = ({
  filterValue,
  id,
  columnName,
  gridProps,
  dispatch,
  maxLength,
  showMaxLength,
}) => {
  const [text, setText] = useState(filterValue?.value ?? "");
  const [condition, setCondition] = useState(filterValue?.condition ?? "equal");
  const handleBlur = () => {
    if (Boolean(text)) {
      dispatch({
        type: "setValue",
        payload: {
          condition: condition,
          value: text,
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
  // console.log(">>others", others)
  return (
    <Grid item xs={12} sm={6} md={6} {...gridProps}>
      <TextField
        label={columnName}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => {
          if (
            maxLength !== maxLength ||
            e.target.value.length <= (maxLength ?? 20)
          ) {
            setText(e.target.value);
          }
        }}
        helperText={
          <div style={{ display: "flex" }}>
            {maxLength > 0 && Boolean(showMaxLength) ? (
              <FormHelperText
                error={false}
                // disabled={isSubmitting}
                style={{
                  flex: 1,
                  textAlign: "right",
                  margin: "5px 15px 0 0",
                }}
              >
                {text.length}/{maxLength}
              </FormHelperText>
            ) : null}
          </div>
        }
        onBlur={handleBlur}
        fullWidth
        value={text}
        InputProps={{
          endAdornment: (
            <SelectRenderOnly
              size="small"
              style={{ width: "50%" }}
              touched={true}
              error={""}
              multiple={false}
              handleChange={(e) => {
                setCondition(e.target.value);
              }}
              handleBlur={handleBlur}
              options={options}
              disableCaching={false}
              value={condition}
              selectVariant="andornment"
            />
          ),
        }}
      />
    </Grid>
  );
};
