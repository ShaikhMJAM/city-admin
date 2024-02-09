import { components } from "components/report";

export const CurrentlyLoginCustomerDetailsMetaData = {
  title: "Currently Login Customer Details Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  autoFetch: true,
  // retrievalType: "CUSTOMERLIMIT",
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
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
    {
      columnName: "Last Login DateTime",
      accessor: "LAST_LOGIN_DT",
      width: 190,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Last Activity DateTime",
      accessor: "LAST_ACTIVITY",
      width: 190,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Inactive Time",
      accessor: "INACTIVE_TIME",
      // Cell: components.DateTimeCell,
      // format: "HH:mm:ss",
      width: 150,
    },
    {
      columnName: "TTL",
      accessor: "TTL",
      width: 180,
    },
    {
      columnName: "Last Activity Type",
      accessor: "LAST_ACTIVITY_TYPE",
      width: 190,
    },
    {
      columnName: "Last Activity Description",
      accessor: "LAST_ACTIVITY_DESC",
      width: 200,
    },
  ],
};
