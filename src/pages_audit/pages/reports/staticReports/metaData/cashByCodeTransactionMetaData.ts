import { components } from "components/report";

export const CashByCodeTransactionMetaData = {
  title: "Cash By Code Transaction Details",
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
      accessor: "VAT",
      width: 120,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "From Source",
      accessor: "APP_INDICATOR",
      width: 180,
    },
    {
      columnName: "From Card Number",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Linked A/C No.",
      accessor: "FROM_LINK_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "Code View By",
      accessor: "CASH_BY_CODE_FLG",
      width: 150,
    },
    {
      columnName: "Cash By Code",
      accessor: "CASH_BY_CODE",
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
    {
      columnName: "Ben. Conatct No.",
      accessor: "BENEFICIARY_MOBILE_NO",
      width: 180,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESP_MSG",
      width: 160,
    },
  ],
};
