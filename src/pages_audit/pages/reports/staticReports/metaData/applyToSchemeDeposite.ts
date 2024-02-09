import { components } from "components/report";

export const applypensionSchemeMetaData = {
  title: "Apply For Deposit Pension Scheme Report",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Transaction Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "A/C No.",
      accessor: "ACCT_NO",
      width: 170,
    },
    {
      columnName: "Account Title",
      accessor: "ACCOUNT_TITLE",
      width: 170,
    },
    {
      columnName: "Avil Balance",
      accessor: "AVIL_BALANCE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Tenure Type",
      accessor: "TENURE_TYPE",
      width: 170,
    },
    {
      columnName: "Type Of Account",
      accessor: "ACCT_TYPE",
      width: 170,
    },
    {
      columnName: "Tenure",
      accessor: "TENURE",
      width: 170,
    },
    {
      columnName: "Install Start Date",
      accessor: "INST_START_DT",
      Cell: components.DateCell,
      width: 170,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Interest Rate",
      accessor: "INTEREST_RATE",
      width: 170,
    },
    {
      columnName: "Collection Branch",
      accessor: "COLLECTION_BRANCH",
      width: 170,
    },
    {
      columnName: "Scheme Code",
      accessor: "SCHEME_CODE",
      width: 150,
    },
    {
      columnName: "Email ID",
      accessor: "EMAIL_ID",
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
      columnName: "API Response",
      accessor: "API_RESPONSE",
      width: 150,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
