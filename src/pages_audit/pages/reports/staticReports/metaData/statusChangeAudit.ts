import { components } from "components/report";

export const statusChangAuditMetaData = {
  title: "User Status Change Audit Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEUSERNM",
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
      columnName: "Modified Date",
      accessor: "TRAN_DATE",
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
      columnName: "New Status",
      accessor: "STATUS",
      width: 170,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["STATUS"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
    {
      columnName: "Modified By",
      accessor: "ENTERED_BY",
      width: 170,
    },
    {
      columnName: "Machine Name",
      accessor: "MACHINE_NM",
      width: 170,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 170,
    },
  ],
};
