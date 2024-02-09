import { components } from "components/report";

export const mobileRechargeDetailMetaData = {
  title: "Mobile Recharge Details Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEUSERNMNOREQ",
  autoFetch: false,
  columns: [
    {
      columnName: "Transaction Date",
      accessor: "TRAN_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Reference No.",
      accessor: "REF_NO",
      width: 140,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 170,
    },
    {
      columnName: "Operator Name",
      accessor: "OPERATOR_NAME",
      width: 170,
    },
    {
      columnName: "Connection Type",
      accessor: "CONNECTION_TYPE",
      width: 170,
    },
    {
      columnName: "From Source",
      accessor: "FROM_SOURCE",
      width: 170,
    },
    {
      columnName: "From A/c No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 170,
    },
    {
      columnName: "To Source",
      accessor: "TO_SOURCE",
      width: 170,
    },
    {
      columnName: "To A/c No.",
      accessor: "TO_ACCT_NO",
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
      columnName: " Charge Amount",
      accessor: "SERVICE_CHARGE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT Amount",
      accessor: "VAT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 170,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 170,
    },
    {
      columnName: "OTP Mobile Number",
      accessor: "OTP_MOBILE",
      width: 170,
    },
    {
      columnName: "OTP Email ID",
      accessor: "OTP_EMAIL",
      width: 170,
    },
    {
      columnName: "Ref. Tran. ID",
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
      accessor: "RESPONSE_DESC",
      width: 170,
    },
  ],
};
