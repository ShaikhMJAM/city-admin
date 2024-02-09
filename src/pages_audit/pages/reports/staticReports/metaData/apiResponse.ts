import { components } from "components/report";

export const apiResponseMetaData = {
  title: "API Response Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  // filters: [
  //   {
  //     accessor: "FROM_DT",
  //     columnName: "From Date",
  //     filterComponentType: "valueDateFilter",
  //     gridProps: {
  //       xs: 12,
  //       md: 12,
  //       sm: 12,
  //     },
  //   },
  //   {
  //     accessor: "TO_DT",
  //     columnName: "To Date",
  //     filterComponentType: "valueDateFilter",
  //     gridProps: {
  //       xs: 12,
  //       md: 12,
  //       sm: 12,
  //     },
  //   },
  // ],
  columns: [
    {
      columnName: "Request Date",
      accessor: "REQ_DATE",
      width: 140,
      Cell: components.DateCell,
      type: "default",
    },
    {
      columnName: "API Name",
      accessor: "API_NAME",
      width: 170,
      type: "default",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "API Call Count",
      accessor: "API_COUNT",
      width: 170,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 170,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 170,
    },
  ],
};
