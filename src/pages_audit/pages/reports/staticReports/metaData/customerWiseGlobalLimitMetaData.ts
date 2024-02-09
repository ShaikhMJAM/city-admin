export const CustomerGlobalLimitMetaData = {
  title: "Customer Wise Global Limit Usage Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "CUSTOMERLIMIT",
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
      columnName: "Login ID",
      accessor: "CUSTOM_USER_NM",
      width: 140,
      type: "default",
    },
    {
      columnName: "Global Limit",
      accessor: "GLOBAL_LIMIT",
      width: 180,
    },
    {
      columnName: "Transaction Count",
      accessor: "TOTAL_TRN",
      width: 170,
    },
    {
      columnName: "MFS volume",
      accessor: "MFS_TRF_LIMIT",
      width: 150,
    },
    {
      columnName: "Within Bank Volume",
      accessor: "OTHER_TRF_LIMIT",
      width: 180,
    },
    {
      columnName: "Other Bank Volume",
      accessor: "OTHER_BANK_TRF_LIMIT",
      width: 180,
    },
    {
      columnName: "Payment Volume",
      accessor: "PAYMENT_LIMIT",
      width: 170,
    },
  ],
};
