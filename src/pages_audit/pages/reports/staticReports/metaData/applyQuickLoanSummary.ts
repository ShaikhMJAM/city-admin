import { components } from "components/report";

export const applyQuickLoanSummaryMetaData = {
  title: "Apply for Quick Loan Summary Report",
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
      columnName: "Request Date and Time",
      accessor: "TRAN_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "CUSTOM_NM",
      width: 140,
      type: "default",
    },
    {
      columnName: "Status",
      accessor: "CONF_STATUS",
      width: 170,
    },
    {
      columnName: "Applicant Name",
      accessor: "FATHER_NAME",
      width: 170,
    },
    {
      columnName: "FD Account",
      accessor: "FD_ACCOUNT",
      width: 170,
    },
    {
      columnName: "Loan Amount",
      accessor: "LOAN_AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "EMI Account",
      accessor: "EMI_ACCOUNT",
      width: 170,
    },
    {
      columnName: "EMI Amount",
      accessor: "EMI_AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Tenure",
      accessor: "LOAN_TENURE",
      width: 100,
    },
    {
      columnName: "Int.Rate",
      accessor: "INT_RATE",
      width: 130,
    },
  ],
};
