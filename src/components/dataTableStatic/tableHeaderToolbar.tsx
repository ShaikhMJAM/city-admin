import { forwardRef, useImperativeHandle, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { GlobalFilter } from "./components/filters";
import { RenderActions } from "components/dataTable/tableActionToolbar";
import { useAutoRefresh } from "../utils/autoRefresh";
import { CircularProgressWithLabel } from "../utils/circularProgressWithLabel";
import { TableFilterComponent } from "../dataTable/tableFilterComponent";
import { ColumnVisibility } from "../dataTable/columnVisibility";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: "var(--theme-color1)",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  title: {
    // flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
  refreshiconhover: {
    // "&:hover": {
    //   backgroundColor: "var(--theme-color2)",
    //   color: "var(--theme-color1)",
    // },
  },
}));

export const TableHeaderToolbar = forwardRef<any, any>(
  (
    {
      dense,
      label,
      preGlobalFilteredRows,
      globalFilter,
      setGlobalFilter,
      alwaysAvailableAction,
      setGridAction,
      selectedFlatRows,
      disableGlobalFilter,
      refetchData,
      autoRefreshInterval,
      gotoPage,
      setSortBy,
      allowFilter,
      filters,
      setAllFilters,
      filterMeta,
      visibleColumns,
      defaultHiddenColumns,
      allowColumnHiding,
      loading = false,
    },
    ref
  ) => {
    const { progress, enabled, intervalElapsed, pause, resume } =
      useAutoRefresh(refetchData, autoRefreshInterval);
    const classes = useStyles();
    const newselectedRows = useMemo(
      () =>
        selectedFlatRows.map((one) => {
          return {
            data: one.original,
            id: one.id,
          };
        }),
      [selectedFlatRows]
    );
    useImperativeHandle(ref, () => ({
      pause: pause,
      resume: resume,
    }));
    return (
      <Toolbar className={classes.root} variant={dense ? "dense" : "regular"}>
        <Typography
          className={classes.title}
          color="inherit"
          variant={"h6"}
          component="div"
        >
          {label}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          {allowFilter ? (
            <TableFilterComponent
              setAllFilters={setAllFilters}
              filters={filters}
              filterMeta={filterMeta}
              gotoPage={gotoPage}
              setSortBy={setSortBy}
              classes={classes}
            />
          ) : null}
          {typeof refetchData === "function" ? (
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              //@ts-ignore
              onClick={refetchData}
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          ) : null}
          {enabled ? (
            <CircularProgressWithLabel
              variant="determinate"
              value={progress}
              interval={intervalElapsed}
              pause={pause}
              resume={resume}
            />
          ) : null}
          {allowColumnHiding ? (
            <ColumnVisibility
              visibleColumns={visibleColumns}
              defaultHiddenColumns={defaultHiddenColumns}
              classes={classes}
            />
          ) : null}
          {disableGlobalFilter ? null : (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )}
          {loading ? null : (
            <RenderActions
              key="alwaysRender"
              selectedRows={newselectedRows}
              setAction={setGridAction}
              actions={alwaysAvailableAction ?? []}
            />
          )}
        </div>
      </Toolbar>
    );
  }
);
