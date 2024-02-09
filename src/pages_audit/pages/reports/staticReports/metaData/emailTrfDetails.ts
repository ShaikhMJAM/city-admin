import { components } from "components/report";

export const emailTrfDetailsMetaData = {
  title: "Email Transfer Transaction Details",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "EMAILTRAN",
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
      columnName: "Transaction Type",
      accessor: "TRN_TYPE",
      width: 180,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Charge Amount",
      accessor: "SERVICE_CHARGE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT Amount",
      accessor: "VAT_CHARGE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "From Source",
      accessor: "FROM_SOURCE",
      width: 180,
    },
    {
      columnName: "CB Number",
      accessor: "FROM_CBNUMBER",
      width: 180,
    },
    {
      columnName: "From A/C No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "To A/C No.",
      accessor: "TO_ACCT_NO",
      width: 170,
    },
    {
      columnName: "To IFSC Code",
      accessor: "TO_IFSCCODE",
      width: 170,
    },
    {
      columnName: "To A/C Name.",
      accessor: "TO_ACCT_NM",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "TRN_STATUS",
      width: 150,
    },
    {
      columnName: "Accept Status",
      accessor: "REQ_ACCEPT",
      width: 150,
    },

    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 150,
    },
    {
      columnName: "From Contact No.",
      accessor: "FROM_MOBILE_NO",
      width: 180,
    },
    {
      columnName: "From Email ID",
      accessor: "FROM_EMAIL_ID",
      width: 160,
    },
    {
      columnName: "To Contact No.",
      accessor: "TO_CONTACT_NO",
      width: 180,
    },
    {
      columnName: "To Email ID",
      accessor: "TO_EMAIL_ID",
      width: 160,
    },
    {
      columnName: "Request Type",
      accessor: "REQ_TYPE",
      width: 200,
    },
    {
      columnName: "Resent Count",
      accessor: "RESENT_CNT",
      width: 200,
    },
    {
      columnName: "Nick Name",
      accessor: "NICK_NAME",
      width: 120,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },
    {
      columnName: "Cancel Reason",
      accessor: "CANCEL_REMARKS",
      width: 150,
    },
  ],
};
