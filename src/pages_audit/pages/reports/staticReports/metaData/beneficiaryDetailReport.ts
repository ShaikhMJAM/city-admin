import { components } from "components/report";

export const beneficiaryDetailMetaData = {
  title: "Beneficiary Detail Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEUSERNM",
  autoFetch: false,
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
    },
    {
      columnName: "Beneficiary Type",
      accessor: "BEN_TYPE",
      width: 150,
    },
    {
      columnName: "Routing Number",
      accessor: "TO_ROUTING_NO",
      width: 150,
    },
    {
      columnName: "Account Number",
      accessor: "TO_ACCT_NO",
      width: 150,
    },
    {
      columnName: "Account Name",
      accessor: "TO_ACCT_NM",
      width: 150,
    },
    {
      columnName: "Status",
      accessor: "CONFIRMED",
      width: 120,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 120,
    },
    {
      columnName: "Limit Amount",
      accessor: "LIMIT_AMT",
      width: 120,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Nick Name",
      accessor: "NICK_NAME",
      width: 120,
    },
    {
      columnName: "Mobile Number",
      accessor: "TO_CONTACT_NO",
      width: 140,
    },
    {
      columnName: "Email ID",
      accessor: "TO_EMAIL_ID",
      width: 200,
    },
  ],
};
