import { components } from "components/report";

export const untagCardAccountMetaData = {
  title: "Untag Credit Card And Account Number Details",
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
      columnName: "Transaction Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Request Type",
      accessor: "REQ_TYPE",
      width: 180,
    },
    {
      columnName: "A/c. Or Card No.",
      accessor: "ACCT_NO",
      width: 170,
    },
    {
      columnName: "Source",
      accessor: "APP_INDICATOR",
      width: 150,
    },
    {
      columnName: "CB Number",
      accessor: "CB_NUMBER",
      width: 150,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 150,
    },
    {
      columnName: "From Contact No.",
      accessor: "MOBILE_NO",
      width: 180,
    },
    {
      columnName: "From Email ID",
      accessor: "EMAIL_ID",
      width: 160,
    },
  ],
};
