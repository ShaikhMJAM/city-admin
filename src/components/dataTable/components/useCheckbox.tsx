import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";

export const useCheckboxColumn = (visible) => (hooks) => {
  if (Boolean(visible)) {
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

/*

*/

const CheckboxCellRenderer = ({ row, cell }) => {
  return (
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
      <Checkbox
        size="small"
        {...row.getToggleRowSelectedProps([
          {
            style: {
              padding: 0,
              position: "sticky",
              background: "white",
              left: 0,
              zIndex: 1,
            },
          },
        ])}
      />
    </TableCell>
  );
};

const CheckboxHeaderRenderer = ({ getToggleAllPageRowsSelectedProps }) => {
  return (
    <Checkbox
      size="small"
      {...getToggleAllPageRowsSelectedProps([
        {
          style: {
            padding: 0,
            position: "sticky",
            background: "white",
            left: 0,
            zIndex: 1,
          },
        },
      ])}
    />
  );
};
