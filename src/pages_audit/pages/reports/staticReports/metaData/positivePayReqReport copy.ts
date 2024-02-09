import { components } from "components/report";

export const positivePayReqMetaData = {
  title: "Positive Pay Request Report",
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
      columnName: "Account Number",
      accessor: "ACCT_NO",
      width: 180,
    },
    {
      columnName: "Beneficiary Name",
      accessor: "BENEFICIARY_NAME",
      width: 170,
    },
    {
      columnName: "Cheque Date",
      accessor: "CHEQUE_DT",
      width: 150,
    },
    {
      columnName: "Cheque Number",
      accessor: "CHEQUE_NO",
      width: 180,
    },
    {
      columnName: "Cheque Book Number",
      accessor: "CHQ_BOOK_NO",
      width: 180,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 170,
      isDisplayTotal: true,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
    {
      columnName: "Accept Status",
      accessor: "CONFIRMED",
      width: 170,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 170,
    },
    {
      columnName: "Ref.Tran. ID",
      accessor: "REF_TRAN_ID",
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
