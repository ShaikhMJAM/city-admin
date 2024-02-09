export const mobEmailUpdLogDetailsMetaData = {
  title: "Update Details",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  hideShowFiltersSwitch: true,
  columns: [
    {
      columnName: "Source",
      accessor: "APP_INDICATOR",
      width: 150,
      type: "default",
    },
    {
      columnName: "Customer ID",
      accessor: "APP_CUSTOMER_ID",
      width: 150,
      type: "default",
    },
    {
      columnName: "Old Value",
      accessor: "OLD_VAL",
      width: 150,
      type: "default",
    },
    {
      columnName: "New Value",
      accessor: "NEW_VAL",
      width: 150,
      type: "default",
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CD",
      width: 150,
      type: "default",
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 200,
      type: "default",
    },
  ],
};
