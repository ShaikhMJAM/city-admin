import { components } from "components/report";

export const qrGeneratedMetaData = {
  title: "QR Generated Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "QRGENERATE",
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
      columnName: "Description",
      accessor: "TRN_DESC",
      width: 170,
    },
    {
      columnName: "QR ID",
      accessor: "QRID",
      width: 130,
    },
    {
      columnName: "Account Number",
      accessor: "ACCT_NO",
      width: 170,
    },
    {
      columnName: "Source",
      accessor: "APP_INDICATOR",
      width: 150,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 130,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT",
      accessor: "VAT_CHARGE",
      width: 130,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "Process Status",
      accessor: "PROCESS_STATUS",
      width: 150,
    },
    {
      columnName: "Currency",
      accessor: "CURRENCY_CODE",
      width: 150,
    },
    {
      columnName: "Ref.Tran.ID",
      accessor: "REF_TRAN_ID",
      width: 150,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 170,
    },
  ],
};
