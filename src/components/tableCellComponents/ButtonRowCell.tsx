import Button from "@mui/material/Button";
import { useMemo } from "react";
import { CellWrapper } from "./cellWrapper";

export const ButtonRowCell = (props) => {
  const {
    row: {
      index,
      original: { _isNewRow },
    },
    column: { id, buttonLabel, columnName, isVisible, isVisibleInNew = false },
    updateGridData,
    onButtonActionHandel,
  } = props;
  const is_Visible = useMemo(
    () => (Boolean(_isNewRow) ? isVisibleInNew : isVisible),
    [isVisible, _isNewRow]
  );
  const handleClick = (e) => {
    //updateGridData(index, id, true, true, "");
    //console.log(onButtonActionHandel, props);
    if (typeof onButtonActionHandel === "function") {
      onButtonActionHandel(index, id);
    }
  };
  return (
    <CellWrapper {...props}>
      {is_Visible ? (
        <Button
          onClick={handleClick}
          fullWidth
          style={{
            height: "28px",
            background: "var(--theme-color1)",
            color: "var(--white)",
          }}
        >
          {Boolean(buttonLabel) ? buttonLabel : columnName}
        </Button>
      ) : null}
    </CellWrapper>
  );
};
