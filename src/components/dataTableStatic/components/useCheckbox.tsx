import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const StyledCheckbox = withStyles((theme: Theme) => ({
  root: {
    "&.Mui-checked": {
      color: "var(--theme-color1)",
    },
    "&.MuiCheckbox-indeterminate": {
      color: theme.palette.text.secondary,
    },
  },
  checked: {},
}))(Checkbox);

export const useCheckboxColumn = (allowRowSelection) => (hooks) => {
  if (Boolean(allowRowSelection)) {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selectionCheckbox",
        Header: CheckboxHeaderRenderer,
        Cell: CheckboxCellRenderer,
        minWidth: 40,
        width: 40,
        maxWidth: 40,
        //sticky: true,
      },
      ...columns,
    ]);
  }
};

const CheckboxCellRenderer = ({ row, cell }) => {
  return (
    <>
      <TableCell
        component="div"
        variant="head"
        {...cell.getCellProps([
          {
            style: {
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              padding: "0px 10px",
              lineHeight: "34px",
            },
          },
        ])}
      >
        {Boolean(row?.original?.__isRowSelection ?? true) ? (
          <StyledCheckbox
            size="small"
            {...row.getToggleRowSelectedProps([
              {
                style: {
                  padding: 0,
                  // color: "var(--theme-color1)"
                },
              },
            ])}
          />
        ) : null}
      </TableCell>
    </>
  );
};

const CheckboxHeaderRenderer = ({ getToggleAllRowsSelectedProps }) => {
  return (
    <StyledCheckbox
      size="small"
      {...getToggleAllRowsSelectedProps([
        {
          style: {
            padding: 0,
            // color: "var(--theme-color1)"
          },
        },
      ])}
    />
  );
};
