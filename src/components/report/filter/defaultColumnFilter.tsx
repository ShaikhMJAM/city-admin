import TextField from "@mui/material/TextField";

export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;
  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => {
        if (e.target.value.length <= 100) {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }
      }}
      fullWidth
      size="small"
      variant="outlined"
      placeholder={`Search ${count} records...`}
    />
  );
};
