import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "&:focus-within": {
      border: "1px solid rgba(25, 118, 210, 0.5)",
    },
    borderLeft: "0.5px solid #BABABA",
    borderRight: "0.5px solid #BABABA",
  },
});

export const CellWrapper = ({
  children,
  showBorder,
  positionRelative,
  ...others
}) => {
  const {
    value,
    cell,
    column: {
      color = "initial",
      TableCellProps,
      isVisibleField = (data) => {
        return true;
      },
    },
    row,
  } = others;

  const classes = useStyles();
  let myColor = typeof color === "function" ? color(value, row) : color;
  let result = children;
  let isVisibleData = isVisibleField(row?.original);
  if (cell?.isGrouped) {
    result = (
      <>
        <IconButton
          {...row.getToggleRowExpandedProps([{ style: { padding: 0 } }])}
        >
          {row.isExpanded ? (
            <ArrowDropDownSharpIcon />
          ) : (
            <ArrowRightSharpIcon />
          )}
        </IconButton>
        {children}
        <i>({row.subRows.length})</i>
      </>
    );
  } else if (cell?.isPlaceholder) {
    result = null;
  }

  return (
    <TableCell
      component="div"
      variant="head"
      className={showBorder ? classes.root : ""}
      {...cell.getCellProps([
        { ...(TableCellProps ?? {}) },
        {
          style: {
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            padding: "0px 10px",
            lineHeight: "34px",
            color: myColor,
            position: positionRelative ? "relative" : "static",
          },
        },
      ])}
    >
      {isVisibleData ? result : null}
    </TableCell>
  );
};
