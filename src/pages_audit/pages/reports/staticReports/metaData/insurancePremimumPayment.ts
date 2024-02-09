import { components } from "components/report";

export const insurancePrePaymentMetaData = {
  title: "Insurance Premium Payment Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "From Source",
      accessor: "FROM_SOURCE",
      width: 170,
    },
    {
      columnName: "From Account Number",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Company Name",
      accessor: "INSU_COMP_NM",
      width: 170,
    },
    {
      columnName: "Policy Number",
      accessor: "POLICY_NUMBER",
      width: 170,
    },
    {
      columnName: "Policy Holder Name",
      accessor: "POLICY_HOLDER_NAME",
      width: 170,
    },
    {
      columnName: "Policy Paid Type",
      accessor: "POLICY_PAID_TYPE",
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
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Vat",
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
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 170,
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 170,
    },
    {
      columnName: "Email",
      accessor: "OTP_EMAIL",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 170,
    },
    {
      columnName: "Transfer Type",
      accessor: "TRF_TYPE",
      width: 170,
    },
    {
      columnName: "API Response",
      accessor: "API_RESPONSE",
      width: 150,
      Cell: components.ButtonRowCell,
      type: "default",
    },
    {
      columnName: "Trn. Particulars",
      accessor: "TRN_PARTICULARS",
      width: 160,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
