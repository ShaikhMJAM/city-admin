import { useRef, Fragment } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useDrag, useDrop } from "react-dnd";

export const DefaultHeaderColumnRenderer = ({
  column,
  visibleColumns,
  setColumnOrder,
  allowColumnReordering,
}) => {
  const [{ isDragging }, drag] = useDrag({
    // item: { type: "Column" },
    type: "Column",
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    end: (_, monitor: any) => {
      if (monitor.didDrop()) {
        const { id } = monitor.getDropResult();
        const columns = visibleColumns.map((one) => one.id);
        const toIndex = columns.indexOf(id);
        const fromIndex = columns.indexOf(column.id);
        var b = columns[toIndex];
        columns[toIndex] = columns[fromIndex];
        columns[fromIndex] = b;
        setColumnOrder(columns);
      }
    },
    canDrag: () => {
      return allowColumnReordering;
    },
  });
  const [{ isOver }, drop] = useDrop({
    accept: "Column",
    drop: () => ({ id: column.id }),
    collect: (monitor) => ({
      isOver: allowColumnReordering && !!monitor.isOver(),
    }),
    canDrop: () => {
      return allowColumnReordering;
    },
  });
  const dragDropRef = useRef(null);
  drag(drop(dragDropRef));
  return (
    <Fragment>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
        hideSortIcon={true}
        ref={dragDropRef}
        {...column.getSortByToggleProps([
          {
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              color: "#0063a3",
              fontSize: "1 rem",
              fontWeight: "600",
              opacity: isDragging || isOver ? 0.5 : 1,
              cursor: isDragging ? "move" : "default",
            },
          },
        ])}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingRight: "10px",
          }}
        >
          {column.columnName}
        </span>
      </TableSortLabel>
      <div
        {...column.getResizerProps([
          {
            style: {
              minHeight: "34px",
              opacity: 1,
              color: "rgba(224, 224, 224, 1)",
              right: "0px",
              display: "flex",
              zIndex: 100,
              position: "absolute",
              flexDirection: "column",
              justifyContent: "center",
            },
          },
        ])}
      >
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-testid="SeparatorIcon"
          style={{
            color: "inherit",
            userSelect: "none",
            width: "1em",
            height: "1em",
            display: "inline-block",
            fill: "currentColor",
            flexShrink: 0,
            transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontSize: "20px",
          }}
        >
          <path d="M11 19V5h2v14z"></path>
        </svg>
      </div>
    </Fragment>
  );
};
