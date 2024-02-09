import { components } from "components/report";
export const InsurancePrimiDetailMetaData = {
  title: "API Response Details Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  hideShowFiltersSwitch: true,

  columns: [
    {
      columnName: "Responce Date",
      accessor: "REQ_DATE",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "API Name",
      accessor: "API_NAME",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 160,
    },
    {
      columnName: "From Account",
      accessor: "FROM_ACCT_NO",
      width: 150,
    },
    {
      columnName: "To Account",
      accessor: "TO_ACCT_NO",
      width: 150,
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
