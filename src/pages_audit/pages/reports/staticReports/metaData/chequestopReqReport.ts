import { components } from "components/report";

export const chequeStopReqMetaData = {
  title: "Cheque Stop Request Report",
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
      columnName: "Account Number",
      accessor: "ACCT_NO",
      width: 170,
    },
    {
      columnName: "Begin Cheque No.",
      accessor: "BEGIN_CHEQUE_NO",
      width: 170,
    },
    {
      columnName: "Cheque No.",
      accessor: "CHEQUE_NO",
      width: 170,
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
      columnName: "Contact No.",
      accessor: "MOBILE_NO",
      width: 150,
    },
    {
      columnName: "Email ID",
      accessor: "EMAIL_ID",
      width: 150,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },
  ],
};
