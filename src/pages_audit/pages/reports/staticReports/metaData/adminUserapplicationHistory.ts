import { components } from "components/report";

export const appUsageHistoryMetaData = {
  title: "Admin Panel User Application Usage History",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEAPUSERSLIST",
  groupBy: ["USERNAME"],
  autoFetch: false,
  columns: [
    {
      columnName: "Login ID",
      accessor: "USERNAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateCell,
      type: "default",
    },
    // {
    //   columnName: "Branch",
    //   accessor: "BRANCH_CD",
    //   width: 140,
    //   type: "default",
    // },
    {
      columnName: "System Code",
      accessor: "DOC_CD",
      width: 150,
    },

    {
      columnName: "Screen Name",
      accessor: "DOC_NM",
      // Filter: filters.SelectColumnFilter,
      width: 180,
    },
    {
      columnName: "Open Date And Time",
      accessor: "OPEN_TIME",
      Cell: components.DateTimeCell,
      width: 200,
    },
    {
      columnName: "Close Date And Time",
      accessor: "CLOSE_TIME",
      Cell: components.DateTimeCell,
      width: 200,
    },
    {
      columnName: "Machine Name",
      accessor: "MACHINE_NM",
      width: 200,
    },
  ],
};
