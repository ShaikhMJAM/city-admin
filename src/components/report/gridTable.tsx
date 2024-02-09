import { Fragment, useState, useMemo, useCallback, FC } from "react";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  useGlobalFilter,
} from "react-table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import { FixedSizeList } from "react-window";
import { useSequenceColumn } from "./components/useSequence";
import { GlobalFilter } from "./filter/globalFilter";
import { FilterComponent, TableFilterStatusBar } from "./filterComponent";
import { AmountSelect } from "./amountContext";
import { Tooltip } from "components/styledComponent/tooltip";
import ReportExportScreen from "pages_audit/pages/reports/dynamicReports/ReportExportScreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TablePagination } from "@mui/material";
import { TablePaginationActions } from "components/dataTable/tablePaginationToolbar";

interface GridTableType {
  columns: any;
  defaultColumn: any;
  data: any;
  maxHeight: number;
  initialState?: any;
  filterTypes?: any;
  title?: any;
  options?: any;
  loading: boolean;
  hideFooter?: boolean;
  showSerialNoColumn?: boolean;
  onClose?: any;
  setQueryFilters?: any;
  filterMeta?: any;
  queryFilters?: any;
  hideAmountIn?: boolean;
  retrievalType?: string;
  onButtonActionHandel?: any;
  isOpenRetrievalDefault?: boolean;
  printReferense?: any;
  hideHeader?: boolean;
  hideShowFiltersSwitch?: boolean;
  hideStatusBar?: boolean;
  refetchData?: any;
  pageSizes?: Array<any>;
  totalRecords?: number;
  defaultPageSize?: any;
  defaultSortOrder?: any;
  defaultHiddenColumns?: any;
  enablePagination?: boolean;
}

const defaultMaxHeight = 300;
const defaultMaxHeightFilter = 450;

const RenderFilters = ({ headerGroup }) => {
  return (
    <TableHead component="div">
      <TableRow {...headerGroup.getHeaderGroupProps()} component="div">
        {headerGroup.headers.map((column) => {
          return (
            <TableCell {...column.getHeaderProps()} component="div">
              {column.canFilter ? column.render("Filter") : ""}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

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

const RenderFooter1 = ({ footerGroup }) => {
  return (
    <div style={{ backgroundColor: "var(--theme-color5)" }}>
      <TableRow {...footerGroup.getFooterGroupProps()}>
        <div>
          {footerGroup.headers.map((column) => {
            return (
              <span
                key={column.id}
                style={{
                  textAlign: column?.alignment ?? "unset",
                  display: "flex",
                  gap: "3rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: "34px",
                  marginLeft: "10px",
                }}
              >
                {column.render("Footer1")}
              </span>
            );
          })}
        </div>
      </TableRow>
    </div>
  );
};

export const GridTable: FC<GridTableType> = ({
  columns,
  defaultColumn,
  data,
  maxHeight = defaultMaxHeight,
  initialState = {},
  filterTypes,
  title,
  options,
  loading = false,
  hideFooter = false,
  showSerialNoColumn = false,
  onClose = null,
  setQueryFilters,
  filterMeta,
  queryFilters,
  hideAmountIn,
  retrievalType,
  onButtonActionHandel,
  isOpenRetrievalDefault,
  hideHeader = false,
  hideShowFiltersSwitch,
  hideStatusBar,
  refetchData,
  pageSizes = [20, 30, 40],
  totalRecords: controlledTotalRecords = 0,
  defaultPageSize = 20,
  defaultSortOrder = [],
  defaultHiddenColumns = [],
  enablePagination = false,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [isOpenExport, setOpenExport] = useState(false);

  const handleFilterChange = useCallback(() => {
    setShowFilters((old) => !old);
    if (!showFilters) setAllFilters([]);
  }, [setShowFilters]);
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
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        hiddenColumns: defaultHiddenColumns,
        sortBy: defaultSortOrder,
        //filters: defaultFilter,
      },
      ...options,
    },
    useGlobalFilter,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useResizeColumns,
    useBlockLayout,
    useSequenceColumn(showSerialNoColumn),
    onButtonActionHandel
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    toggleAllRowsExpanded,
    isAllRowsExpanded,
    setAllFilters,
    setGlobalFilter,
    preGlobalFilteredRows,
    gotoPage,
    setPageSize,
    state: { filters, globalFilter, pageIndex, pageSize, sortBy },
  } = tableProps;

  const RenderRows = useCallback(
    (props) => {
      let { index, style } = props;
      const row = rows[index];
      prepareRow(row);
      if (row?.isGrouped && row?.isExpanded) {
        style = {
          ...style,
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        };
      }
      return (
        <TableRow {...row.getRowProps({ style })} component="div">
          {row.cells.map((cell, index) => {
            return cell.isAggregated
              ? cell.render("Aggregated")
              : cell.render("Cell", { index: index });
          })}
        </TableRow>
      );
    },
    [prepareRow, rows]
  );

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
          <FilterComponent
            setQueryFilters={setQueryFilters}
            filterMeta={filterMeta}
            filterData={queryFilters}
            retrievalType={retrievalType}
            isOpenRetrievalDefault={isOpenRetrievalDefault}
            setShowFilters={setShowFilters}
            setAllFilters={setAllFilters}
          />
          {showFilters && filters.length > 0 && (
            <Button
              onClick={() => setAllFilters([])}
              style={{ marginRight: "8px", color: "white" }}
            >
              Clear Filter
            </Button>
          )}
          {typeof refetchData === "function" ? (
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              //@ts-ignore
              onClick={() => refetchData()}
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          ) : null}
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />
          {!Boolean(hideAmountIn) ? <AmountSelect /> : null}
          {rows?.length > 0 ? (
            <>
              {!Boolean(hideShowFiltersSwitch) ? (
                <FormControlLabel
                  control={
                    <Switch
                      checked={showFilters}
                      onChange={handleFilterChange}
                      name="filters"
                      size="small"
                      color="primary"
                    />
                  }
                  style={{ color: "var(--white)" }}
                  label="show Filters"
                />
              ) : null}
              {headerGroups.some((header) =>
                header.headers.some((column) => column.isGrouped === true)
              ) ? (
                <FormControlLabel
                  control={
                    <Switch
                      onChange={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
                      checked={isAllRowsExpanded}
                      name="filters"
                      size="small"
                      color="primary"
                    />
                  }
                  style={{ color: "var(--white)" }}
                  label="Expand Rows"
                />
              ) : (
                <FormControlLabel
                  control={
                    <Tooltip title={"Show export options"} arrow={true}>
                      <Button
                        onClick={() => {
                          setOpenExport(true);
                        }}
                        style={{ marginTop: "0px", color: "white" }}
                      >
                        Export <GetAppIcon />
                      </Button>
                      {/* <IconButton
                      onClick={() => {
                        createNewWorkbook({
                          data: data,
                          title: title.substring(0, title.lastIndexOf(" ", 30)),
                        });
                      }}
                      size="small"
                      color="primary"
                    >
                      <GetAppIcon />
                    </IconButton> */}
                    </Tooltip>
                  }
                  style={{ color: "var(--white)" }}
                  label=""
                // label="Download"   //Commented By Raju Unjiya on 09/06/2023
                />
              )}
            </>
          ) : null}
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
      </Paper>
      {loading && <LinearProgress color="secondary" />}
      <Paper
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        tabIndex={0}
      >
        <TableContainer>
          <Table {...getTableProps()} size="small" component="div">
            <TableHead component="div">
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  component="div"
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
                        component="div"
                        align={column.alignment}
                      >
                        {column.render("Header")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            {showFilters ? (
              <RenderFilters
                headerGroup={headerGroups[headerGroups.length - 1]}
              />
            ) : null}
            <TableBody {...getTableBodyProps({})} component="div">
              <FixedSizeList
                height={showFilters ? defaultMaxHeightFilter : maxHeight}
                itemCount={rows.length}
                itemSize={35}
                width={totalColumnsWidth + 10}
                overscanCount={10}
              >
                {RenderRows}
              </FixedSizeList>
            </TableBody>
            {rows.length <= 0 && loading === false ? (
              <div
                style={{
                  // height: "auto",
                  // display: "flex",
                  // margin: "-250px",
                  justifyContent: "center",
                  fontStyle: "italic",
                  color: "rgba(133, 130, 130, 0.8)",
                  margin: "-241px 0px 0px 575px",
                }}
              >
                No data found..!
              </div>
            ) : null}

            {hideFooter ? null : (
              <TableHead
                component="div"
                style={{
                  boxShadow:
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                }}
              >
                <RenderFooter footerGroup={footerGroups[0]} />
                <RenderFooter1 footerGroup={footerGroups[0]} />
              </TableHead>
            )}
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
            count={controlledTotalRecords}
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
      {isOpenExport ? (
        <ReportExportScreen
          globalFilter={globalFilter}
          filters={filters}
          queryFilters={queryFilters}
          title={title.trim()}
          rows={rows}
          columns={columns}
          onClose={() => {
            setOpenExport(false);
          }}
        />
      ) : null}
    </Fragment>
  );
};
