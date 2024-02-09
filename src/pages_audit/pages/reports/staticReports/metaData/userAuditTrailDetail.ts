export const auditTrailDetailsMetaData = {
  title: "Admin Panel User Audit Trail Detail",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  groupBy: ["USER_NAME"],
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
      columnName: "Action",
      accessor: "ACTION",
      width: 140,
      type: "default",
    },
    {
      columnName: "User Name",
      accessor: "USER_NAME",
      width: 170,
    },
    {
      columnName: "Old Value",
      accessor: "OLD_VALUE",
      width: 170,
    },
    {
      columnName: "New Value",
      accessor: "NEW_VALUE",
      width: 170,
    },
    {
      columnName: "Modified By",
      accessor: "MODIFIED_BY",
      width: 170,
    },
    {
      columnName: "Action Date & Time",
      accessor: "MODIFIED_DATE",
      width: 170,
    },
  ],
};
