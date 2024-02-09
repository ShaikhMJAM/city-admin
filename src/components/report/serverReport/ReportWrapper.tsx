import React, { useCallback, useRef, useState } from "react";
import { ReportGrid } from "./serverGridParent";
import { useMutation } from "react-query";
import { formatFilterBy, formatSortBy } from "../utils";

type TReportWrapper = {
  reportID: string;
  reportName: string;
  metaData: any;
  getAPIFn: any;
  otherAPIRequestPara: any;
  maxHeight: number;
  onClickActionEvent: Function;
};

type TApiResponse = {
  data?: {
    rows: any;
    total_count?: number;
  };
};

const ReportWrapper: React.FC<TReportWrapper> = ({
  reportID,
  reportName,
  metaData,
  getAPIFn,
  otherAPIRequestPara,
  maxHeight,
  onClickActionEvent,
}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchOptions = useRef<any>(null);

  const mutation: any = useMutation<TApiResponse, any>(getAPIFn, {
    onError: (error: any) => {
      setError(error);
    },
    onSuccess: (result) => {
      setData(result.data?.rows);
      setPageCount(
        Math.ceil(
          Number(result?.data?.total_count ?? 1) /
          Number(fetchOptions.current?.pageSize ?? 20)
        )
      );
      setTotalRecords(Number(result?.data?.total_count ?? 1));
    },
  });

  const fetchData = useCallback(
    ({ pageSize, pageIndex, filters, sortBy }) => {
      const startRow = Number(pageSize) * Number(pageIndex) + 1;
      const endRow = Number(startRow) + Number(pageSize) - 1;
      let childFilter = formatFilterBy(filters);
      let childSortBy = formatSortBy(sortBy);

      const requestPara = {
        reportID,
        APIRequestPara: {
          from_row: startRow,
          to_row: endRow,
          filter_conditions: childFilter,
          orderby_columns: childSortBy,
          enablePagination: true,
          // ...otherAPIRequestPara,
        },
      };
      fetchOptions.current = { pageSize };
      mutation.mutate(requestPara);
    },
    [setTotalRecords, setData]
  );
  return (
    <ReportGrid
      metaData={metaData}
      maxHeight={maxHeight}
      reportName={reportName}
      title={metaData.title}
      hideFooter={metaData.hideFooter}
      hideAmountIn={metaData.hideAmountIn}
      // removing retrievalType for server side pagination
      // retrievalType={metaData.retrievalType}
      onClickActionEvent={onClickActionEvent}
      // removing option for groupBy for server side pagination
      // initialState={{
      //   groupBy: metaData?.groupBy ?? [],
      // }}
      // options={{
      //   disableGroupBy: metaData.disableGroupBy,
      // }}
      // autoFetch={metaData?.autoFetch ?? true}
      autoFetch={true} // setting autoFetch true since we are not using retrieval box for server side pagination
      data={data}
      loading={mutation.isLoading}
      isError={mutation.isError}
      error={error}
      pageCount={pageCount}
      totalRecords={totalRecords}
      pageSizes={metaData?.pageSize ?? [10, 25, 50]}
      defaultPageSize={metaData.defaultPageSize ?? 25}
      onFetchData={fetchData}
    />
  );
};

export default ReportWrapper;
