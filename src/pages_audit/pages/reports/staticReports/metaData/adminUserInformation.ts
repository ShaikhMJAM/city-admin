import { components } from "components/report";

export const adminUserInfoMetaData = {
  title: "Admin Panel User Information Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  // retrievalType: "DATE",
  autoFetch: true,
  columns: [
    {
      columnName: "User Name",
      accessor: "DESCRIPTION",
      width: 140,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 170,
    },
    {
      columnName: "User Level",
      accessor: "USER_LEVEL",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "ACTIVE_FLAG",
      width: 140,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["ACTIVE_FLAG"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
    {
      columnName: "Creation Date",
      accessor: "ENTERED_DATE",
      width: 170,
      Cell: components.DateCell,
    },
    {
      columnName: "Inactive Date",
      accessor: "INACTIVE_DATE",
      width: 170,
      Cell: components.DateCell,
    },
    {
      columnName: "Last Login Date",
      accessor: "LAST_LOGIN_DT",
      width: 170,
      Cell: components.DateTimeCell,
    },
  ],
};
