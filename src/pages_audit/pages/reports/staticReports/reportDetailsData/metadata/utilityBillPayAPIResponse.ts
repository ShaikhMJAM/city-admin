import { components } from "components/report";
export const utilityBillPayAPIResMetaData = {
  title: "API Response Details Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  columns: [
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Response Date",
      accessor: "REQ_DATE",
      width: 160,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Api Name",
      accessor: "API_NAME",
      width: 180,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "From A/C No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "To A/C No.",
      accessor: "TO_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Resp. Code",
      accessor: "RESPONSE_CODE",
      width: 150,
    },
    {
      columnName: "Ref.Tran.ID",
      accessor: "REF_TRAN_ID",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 180,
    },
  ],
};
