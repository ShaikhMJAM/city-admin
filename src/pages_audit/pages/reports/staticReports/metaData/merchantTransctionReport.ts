import { components } from "components/report";

export const merchantTransctionMetaData = {
  title: "Merchant Transaction Report",
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
      columnName: "Unique ID",
      accessor: "REF_NO",
      width: 150,
    },
    {
      columnName: "Bank Ref ID",
      accessor: "REF_TRAN_ID",
      width: 150,
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
      width: 140,
    },
    {
      columnName: "Token No",
      accessor: "TOKEN_NO",
      width: 150,
    },
    {
      columnName: "Service Type",
      accessor: "SERVICE_TYPE",
      width: 150,
    },
    {
      columnName: "Service ID",
      accessor: "SERVICE_ID",
      width: 150,
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
      columnName: "Vat",
      accessor: "VAT",
      width: 150,
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
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Process Date",
      accessor: "PROCESS_DT",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Email",
      accessor: "OTP_EMAIL",
      width: 170,
    },
    {
      columnName: "Mobile No",
      accessor: "MOBILE_NO",
      width: 170,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 130,
    },
    {
      columnName: "Reverse Status",
      accessor: "REVRS_STATUS",
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
