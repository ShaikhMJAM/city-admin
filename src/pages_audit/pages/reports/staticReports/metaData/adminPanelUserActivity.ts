import { components } from "components/report";

export const adminUserActivityMetaData = {
  title: "Admin Panel User Activity Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  groupBy: ["USERNAME"],
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
    // {
    //   columnName: "Request Date and Time",
    //   accessor: "TRAN_DT",
    //   width: 200,
    //   Cell: components.DateTimeCell,
    //   type: "default",
    // },
    {
      columnName: "User Name",
      accessor: "USERNAME",
      width: 160,
      type: "default",
    },
    {
      columnName: "Log Description",
      accessor: "DESCRIPTION",
      width: 160,
      type: "default",
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 170,
    },
    {
      columnName: "Login Date Time",
      accessor: "LOGIN_DT",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Logout Date Time",
      accessor: "LOGOUT_DT",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Login Ip Address",
      accessor: "IP_ADDR",
      width: 170,
    },
    {
      columnName: "Terminal",
      accessor: "TERMINAL",
      width: 170,
    },
    {
      columnName: "Released By",
      accessor: "RELEASED_USER_NAME",
      width: 170,
    },
    {
      columnName: "Released Date",
      accessor: "RELEASED_DT",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Released Ip Address",
      accessor: "RELEASED_IP_ADDR",
      width: 200,
    },
  ],
};
