import { components } from "components/report";

export const merchantTranReversalMetaData = {
  title: "Merchant Transaction Reversal Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "MERCHANTRAN",
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
    // {
    //   columnName: "Sr. No.",
    //   accessor: "SR_NO",
    //   width: 90,
    //   type: "default",
    // },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 150,
    },
    {
      columnName: "Request Date Time",
      accessor: "TRAN_DT",
      width: 190,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Source",
      accessor: "FROM_SOURCE",
      width: 130,
    },
    {
      columnName: "Merchant Reference ID",
      accessor: "MERCHANT_REF_ID",
      width: 190,
    },
    {
      columnName: "From Account",
      accessor: "FROM_ACCT_NO",
      width: 160,
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
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Reverse Status",
      accessor: "REVERSE_STATUS",
      width: 150,
    },
    {
      columnName: "Vat",
      accessor: "VAT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Accept Status",
      accessor: "ACCEPT_STATUS",
      width: 150,
    },
    {
      columnName: "Reversed By",
      accessor: "REVERSE_BY",
      width: 150,
    },
    {
      columnName: "Accepted By",
      accessor: "REV_VERIFIED_BY",
      width: 150,
    },
    {
      columnName: "Reversed Date Time",
      accessor: "REVERSE_DATE",
      width: 180,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Accepted Date Time",
      accessor: "REV_VERIFIED_DATE",
      width: 180,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Reversed Machine Name",
      accessor: "REVERSE_MACHINE_NM",
      width: 200,
    },
    {
      columnName: "Accepted Machine Name",
      accessor: "REV_VERIFIED_MACHINE_NM",
      width: 200,
    },
    // {
    //   columnName: "Api Response",
    //   accessor: "API_RESPONSE",
    //   width: 160,
    //   Cell: components.ButtonRowCell,
    //   type: "default",
    // },
  ],
};
