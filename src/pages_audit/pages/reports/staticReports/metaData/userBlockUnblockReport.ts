import { components } from "components/report";

export const userBlockUnblockReqMetaData = {
  title: "User Block Unblock Report",
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
      columnName: "Transaction Date",
      accessor: "TRAN_DT",
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
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["STATUS"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },

    {
      columnName: "Block Type",
      accessor: "BLOCK_TYPE",
      width: 150,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 370,
    },
  ],
};
