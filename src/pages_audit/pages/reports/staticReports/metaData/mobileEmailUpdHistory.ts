import { components } from "components/report";

export const mobileEmailUpdHistoryMetaData = {
  title: "Mobile/Email Updation From Core Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
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
      accessor: "LAST_MODIFIED_DATE",
      width: 150,
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
      columnName: "Customer Name",
      accessor: "CUST_NAME",
      width: 250,
      type: "default",
    },
    {
      columnName: "Updated Field",
      accessor: "UPD_FIELD",
      width: 120,
    },
    {
      columnName: "Old Value",
      accessor: "OLD_VALUE",
      width: 200,
    },
    {
      columnName: "New Value",
      accessor: "NEW_VALUE",
      width: 120,
    },

    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 120,
    },
  ],
};
