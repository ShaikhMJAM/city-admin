import Button from "@mui/material/Button";
import { CellWrapper } from "./cellWrapper";

export const DeleteRowButton = (props) => {
  const {
    row: { index },
    column: { id },
    updateGridData,
  } = props;

  const handleClick = (e) => {
    updateGridData(index, id, true, true, "");
  };
  return (
    <CellWrapper {...props}>
      <Button
        onClick={handleClick}
        fullWidth
        style={{
          height: "28px",
          background: "var(--theme-color1)",
          color: "var(--white)",
        }}
      >
        Delete
      </Button>
    </CellWrapper>
  );
};
