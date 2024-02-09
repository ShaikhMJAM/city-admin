import { components } from "components/report";

export const deviceChangeMetaData = {
  title: "Device Change Report ",
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
      columnName: "Request Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 170,
    },
    {
      columnName: "Device OS",
      accessor: "DEVICE_OS",
      width: 170,
    },
    {
      columnName: "Device Name",
      accessor: "DEVICE_NM",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
  ],
};
