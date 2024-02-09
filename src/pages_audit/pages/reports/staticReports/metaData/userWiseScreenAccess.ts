export const userWiseScreenAccessMetaData = {
  title: "Admin Panel User Wise Screen Access Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  groupBy: ["USER_NAME", "USER_LAVEL"],
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
      columnName: "User Name",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "User Level",
      accessor: "USER_LAVEL",
      width: 140,
      type: "default",
    },
    {
      columnName: "Screen Code",
      accessor: "DOC_CD",
      width: 140,
      type: "default",
    },
    {
      columnName: "Screen Name",
      accessor: "DOC_NM",
      width: 210,
    },
  ],
};
