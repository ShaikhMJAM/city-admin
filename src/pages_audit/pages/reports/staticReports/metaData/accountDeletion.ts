import { components, filters } from "components/report";

export const accountDeletionMetaData = {
  title: "Account Deletion Request Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  columns: [
    {
      columnName: "Request Date",
      accessor: "REQ_DT",
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
      columnName: "Primary CB/CID",
      accessor: "PRIMARY_CBNUMBER",
      width: 150,
    },
    {
      columnName: "Accept Status",
      accessor: "CONFIRMED",
      Filter: filters.SelectColumnFilter,
      width: 150,
    },
    {
      columnName: "Deletion Reason",
      accessor: "DELETION_REASON",
      width: 250,
    },
    {
      columnName: "Maker",
      accessor: "MAKER_BY",
      width: 140,
    },
    {
      columnName: "Maker Date",
      accessor: "MAKER_DT",
      Cell: components.DateTimeCell,
      width: 160,
    },
    {
      columnName: "Maker Remark",
      accessor: "MAKER_REMARKS",
      width: 200,
    },
    {
      columnName: "Checker",
      accessor: "CHECKER_BY",
      width: 140,
    },
    {
      columnName: "Checker Date",
      accessor: "CHECKER_DT",
      Cell: components.DateTimeCell,
      width: 160,
    },
    {
      columnName: "Checker Remark",
      accessor: "CHECKER_REMARKS",
      width: 200,
    },
  ],
};
