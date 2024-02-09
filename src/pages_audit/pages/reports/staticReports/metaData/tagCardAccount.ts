import { components } from "components/report";

export const tagCardAccountMetaData = {
  title: "Tag Credit Card And Account Number Details",
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
      width: 150,
    },
    {
      columnName: "Old CB Number",
      accessor: "OLD_CB_NUMBER",
      width: 150,
    },
    {
      columnName: "New CB Number",
      accessor: "NEW_CB_NUMBER",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "Accept Status",
      accessor: "CONFIRMED",
      width: 180,
    },
    {
      columnName: "Accept By",
      accessor: "VERIFIED_BY",
      width: 170,
    },
    {
      columnName: "Accept Date",
      accessor: "VERIFIED_DATE",
      width: 170,
      Cell: components.DateTimeCell,
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

    {
      columnName: "Acceptance Remarks",
      accessor: "REMARKS",
      width: 180,
    },
  ],
};
