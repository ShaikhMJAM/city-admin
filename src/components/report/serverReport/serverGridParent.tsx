import { FC, useMemo, Fragment, useState, useCallback } from "react";
import { HeaderColumnCell } from "../components/headerCell";
import { DefaultCell } from "../components/defaultCell";
import { FooterCell } from "../components/footerCell";
import { DefaultColumnFilter } from "../filter/defaultColumnFilter";
import { GridTable } from "./serverGridTable";
import {
  fuzzyTextFilterFn,
  customText,
  filterGreaterThan,
  customInclude,
} from "../filters";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { attachFilterComponentToMetaData, formatFilterBy } from "../utils";
import { AmountProvider } from "../amountContext";

export const ReportGrid: FC<any> = ({
  metaData,
  maxHeight,
  initialState,
  title,
  // options,
  hideFooter,
  showSerialNoColumn = false,
  onClose = null,
  reportName,
  dataTransformer = (data) => data,
  autoFetch = true,
  hideAmountIn = false,
  retrievalType,
  onClickActionEvent = () => {},
  hideHeader = false,
  hideShowFiltersSwitch = false,
  defaultFilter = [],
  hideStatusBar = false,
  data,
  loading,
  isError,
  error,
  pageCount,
  totalRecords,
  pageSizes,
  defaultPageSize,
  onFetchData,
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const memoizedColumns = useMemo(() => {
    return [
      {
        columnName: "Sr. No.",
        accessor: "SRNO",
        width: 100,
        type: "default",
      },
      ...metaData.columns,
    ];
  }, []);

  const memoizedFilters = useMemo(
    () => attachFilterComponentToMetaData(metaData.filters),
    []
  );

  const [autoFetcher, setAutoFetcher] = useState(autoFetch);
  const [queryFilters, setQueryFilters] = useState<any>([...defaultFilter]);

  const setQueryFilterWrapper = useCallback(
    (args) => {
      setQueryFilters(args);
      setAutoFetcher(true);
    },
    [setAutoFetcher, setQueryFilters]
  );

  const defaultColumn = useMemo(
    () => ({
      Header: HeaderColumnCell,
      Cell: DefaultCell,
      Footer: FooterCell,
      Filter: DefaultColumnFilter,
      Aggregated: DefaultCell,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      customText: customText,
      filterGreaterThan: filterGreaterThan,
      customInclude: customInclude,
    }),
    []
  );

  // const { data, isFetching, isLoading, isError, error, refetch } = useQuery<
  //   any,
  //   any,
  //   any
  // >(
  //   [dataFetcher, reportID, queryFilters, otherAPIRequestPara],
  //   () => dataFetcher(reportID, queryFilters, otherAPIRequestPara),
  //   {
  //     cacheTime: 0,
  //     enabled: autoFetcher,
  //   }
  // );

  let rows = [];
  if (data) {
    rows = data.map((row, index) => ({ SRNO: index + 1, ...row }));
  }

  const onButtonActionHandel = useCallback(
    (index, id) => {
      // console.log(">>onButtonActionHandel");
      if (!loading && !isError && autoFetcher) {
        onClickActionEvent(index, id, data[index]);
      }
    },
    [data]
  );

  return (
    <Fragment>
      {isError && (
        <Alert
          severity="error"
          errorMsg={error?.error_msg ?? "Unknown Error occured"}
          errorDetail={error?.error_detail}
        />
      )}
      <AmountProvider>
        <GridTable
          columns={memoizedColumns}
          defaultColumn={defaultColumn}
          data={rows}
          // data={dataTransformer(data) ?? []}
          maxHeight={maxHeight ?? 450}
          // initialState={initialState}  // removing initialState for groupBy and others
          filterTypes={filterTypes}
          title={title + " "}
          // options={options}  // disabling options like groupby and others for server side pagination
          loading={loading}
          hideFooter={
            typeof hideFooter === "string" && hideFooter === "N"
              ? false
              : Boolean(hideFooter)
          }
          showSerialNoColumn={showSerialNoColumn}
          onClose={onClose}
          setQueryFilters={setQueryFilterWrapper}
          // filterMeta={metaData.filters}
          filterMeta={memoizedFilters}
          queryFilters={queryFilters}
          hideStatusBar={hideStatusBar}
          hideAmountIn={hideAmountIn}
          // retrievalType={retrievalType}
          onButtonActionHandel={onButtonActionHandel}
          isOpenRetrievalDefault={!autoFetch}
          hideHeader={hideHeader}
          hideShowFiltersSwitch={hideShowFiltersSwitch}
          onFetchData={onFetchData}
          totalRecords={totalRecords}
          pageSizes={pageSizes}
          pageCount={pageCount}
          defaultPageSize={defaultPageSize}
        />
      </AmountProvider>
    </Fragment>
  );
};
