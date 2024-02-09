import { Fragment, useState, useMemo, useCallback, FC, useEffect } from "react";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useFilters,
  useGroupBy,
  useSortBy,
  usePagination,
  useAsyncDebounce,
} from "react-table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useSequenceColumn } from "../components/useSequence";
import { FilterComponent, TableFilterStatusBar } from "../filterComponent";
import { AmountSelect } from "../amountContext";
import { Tooltip } from "components/styledComponent/tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TablePagination } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { TablePaginationActions } from "components/dataTable/tablePaginationToolbar";
import { MyTableRow } from "components/dataTable/focusableTableRow";
import { TableFilterComponent } from "components/dataTable/tableFilterComponent";
import { makeStyles } from "@mui/styles";
import { TableFilterStatusBar as TableFilterStatusBarDataTable } from "components/dataTable/tableFilterStatusBar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: "var(--theme-color1)",
  },
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "2rem",
  },
}));

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  maxHeight: number;
  // initialState?: any;
  filterTypes?: any;
  title?: any;
  // options?: any;
  loading: boolean;
  hideFooter?: boolean;
  showSerialNoColumn?: boolean;
  onClose?: any;
  setQueryFilters?: any;
  filterMeta?: any;
  queryFilters?: any;
  hideAmountIn?: boolean;
  // retrievalType?: string;
  onButtonActionHandel?: any;
  isOpenRetrievalDefault?: boolean;
  printReferense?: any;
  hideHeader?: boolean;
  hideShowFiltersSwitch?: boolean;
  hideStatusBar?: boolean;
  refetchData?: any;
  onFetchData: any;
  pageSizes?: Array<any>;
  pageCount: number;
  totalRecords?: number;
  defaultPageSize?: any;
  defaultSortOrder?: any;
  defaultHiddenColumns?: any;
  enablePagination?: boolean;
}

const defaultMaxHeight = 300;
const defaultMaxHeightFilter = 450;

const RenderFooter = ({ footerGroup }) => {
  return (
    <TableRow {...footerGroup.getFooterGroupProps()} component="div">
      {footerGroup.headers.map((column) => {
        return (
          <TableCell
            {...column.getFooterProps([
              {
                style: {
                  textAlign: column?.alignment ?? "unset",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: "0px 20px 0px 10px",
                  lineHeight: "34px",
                  // backgroundColor: "rgb(239, 224, 224)",
                  backgroundColor: "var(--theme-color5)",
                  // color: myColor,
                },
              },
            ])}
            component="div"
          >
            {column.render("Footer")}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const GridTable: FC<GridTableType> = ({
  columns,
  defaultColumn,
  data,
  maxHeight = defaultMaxHeight,
  // initialState = {},
  filterTypes,
  title,
  // options,
  loading = false,
  hideFooter = false,
  showSerialNoColumn = false,
  onClose = null,
  setQueryFilters,
  filterMeta,
  queryFilters,
  hideAmountIn,
  // retrievalType,
  onButtonActionHandel,
  isOpenRetrievalDefault,
  hideHeader = false,
  hideShowFiltersSwitch,
  hideStatusBar,
  refetchData,
  pageSizes = [20, 30, 40],
  pageCount: controlledPageCount,
  totalRecords: controlledTotalRecords,
  onFetchData,
  defaultPageSize = 20,
  defaultSortOrder = [],
  defaultHiddenColumns = [],
  enablePagination = true,
}) => {
  const classes = useStyles();
  // const [filters, setAllFilters] = useState([])

  const tableProps = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // initialState,
      onButtonActionHandel,
      autoResetGlobalFilter: false,
      autoResetFilters: false,
      autoResetSortBy: false,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        hiddenColumns: defaultHiddenColumns,
        sortBy: defaultSortOrder,
        //filters: defaultFilter,
      },
      // ...options,
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
      disableGroupBy: true,
      manualFilters: true,
      // manualSortBy: true
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    useSequenceColumn(showSerialNoColumn),
    onButtonActionHandel,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setAllFilters,
    gotoPage,
    setPageSize,
    setSortBy,
    state: { filters, pageIndex, pageSize, sortBy },
  } = tableProps;
  // const RenderRows = useCallback(
  //   (props) => {
  //     let { index, style } = props;
  //     const row = rows[index];
  //     prepareRow(row);
  //     if (row?.isGrouped && row?.isExpanded) {
  //       style = {
  //         ...style,
  //         backgroundColor: "rgba(0, 0, 0, 0.04)",
  //       };
  //     }
  //     return (
  //       <TableRow {...row.getRowProps({ style })} component="div">
  //         {row.cells.map((cell, index) => {
  //           return cell.isAggregated
  //             ? cell.render("Aggregated")
  //             : cell.render("Cell", { index: index });
  //         })}
  //       </TableRow>
  //     );
  //   },
  //   [prepareRow, rows]
  // );
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 500);
  const rowCount = useMemo(() => {
    return rows.reduce((cnt, item) => {
      if (!(item?.original?._hidden ?? false)) {
        ++cnt;
      }
      return cnt;
    }, 0);
  }, [rows]);

  const handleChangePage = (_, newPage) => {
    gotoPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
  }, [onFetchDataDebounced, pageIndex, pageSize, sortBy, filters]);
  return (
    <Fragment>
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
          marginBottom: "8px",
          display: hideHeader ? "none" : "inherit",
        }}
        className="not-printed"
      >
        <Toolbar
          variant="dense"
          style={{
            backgroundColor: "var(--theme-color1)",
          }}
        >
          <Typography variant="h5" color="primary">
            {title.trim()}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {/* <FilterComponent
            setQueryFilters={setQueryFilters}
            filterMeta={filterMeta}
            filterData={queryFilters}
            retrievalType={retrievalType}
            isOpenRetrievalDefault={isOpenRetrievalDefault}
            setShowFilters={setShowFilters}
            setAllFilters={setAllFilters}
          /> */}

          {/* adding table filter component */}
          {filterMeta && filterMeta.length ? (
            <TableFilterComponent
              setAllFilters={setAllFilters}
              filters={filters}
              filterMeta={filterMeta}
              gotoPage={gotoPage}
              setSortBy={setSortBy}
              classes={classes}
            />
          ) : null}

          {/* {typeof refetchData === "function" ? ( */}
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            //@ts-ignore
            onClick={() =>
              onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters })
            }
            color="primary"
          >
            <RefreshIcon />
          </IconButton>
          {/* ) : null} */}

          {!Boolean(hideAmountIn) ? <AmountSelect /> : null}

          {typeof onClose === "function" ? (
            <Tooltip title={"Close"} arrow={true}>
              <IconButton onClick={onClose} size="small">
                <CloseIcon style={{ color: "var(--white)" }} />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>

        {!hideStatusBar ? (
          <TableFilterStatusBar
            dense={true}
            setAllFilters={setQueryFilters}
            filters={queryFilters}
          />
        ) : null}
        {/* adding filter status bar */}
        {filters.length ? (
          <TableFilterStatusBarDataTable
            dense={true}
            setAllFilters={setAllFilters}
            filters={filters}
            gotoPage={gotoPage}
            setSortBy={setSortBy}
          />
        ) : null}
      </Paper>
      {loading && <LinearProgress color="secondary" />}
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        tabIndex={0}
      >
        <TableContainer
          sx={{
            position: "relative",
            height: filters.length ? "67vh" : "73.5vh",
          }}
        >
          <Table {...getTableProps()} size="small" component="table">
            <TableHead component="thead">
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  component="tr"
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <TableCell
                        {...column.getHeaderProps([
                          {
                            style: {
                              display: "flex",
                              padding: "0px 10px",
                            },
                          },
                        ])}
                        component="th"
                        align={column.alignment}
                      >
                        {column.render("Header")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps({})} component="tbody">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()} id={row.id} tabIndex={0}>
                    {row.cells.map((cell) => {
                      const { key } = cell.getCellProps();
                      return cell.render("Cell", { key })
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
            {rows.length <= 0 && loading === false ? (
              <div
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(50%, 100%)",
                  fontStyle: "italic",
                  color: "rgba(133, 130, 130, 0.8)",
                }}
              >
                No data found..!
              </div>
            ) : null}
            {/* 
            {hideFooter ? null : (
              <TableHead
                component="div"
                style={{
                  boxShadow:
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                }}
              >

                <RenderFooter footerGroup={footerGroups[0]} />
              </TableHead>
            )} */}
          </Table>
        </TableContainer>
        {hideFooter ? null : enablePagination ? (
          <TablePagination
            sx={{
              display: "flex",
              "& .MuiToolbar-root": { display: "flex", alignItems: "baseline" },
            }}
            variant="body"
            component="div"
            rowsPerPageOptions={pageSizes}
            colSpan={3}
            count={Number(controlledTotalRecords)}
            rowsPerPage={Number(pageSize)}
            page={Number(pageIndex)}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        ) : (
          <TableCell
            style={{
              display: "flex",
              color: "var(--theme-color1)",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            Total No. of Records: {rowCount}
          </TableCell>
        )}
      </Paper>
    </Fragment>
  );
};
