import { components } from "components/report";

export const PasswordResetMetaData = {
  title: "Password Reset Through Admin Panel Report",
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
  // eslint-disable-next-line no-sparse-arrays
  columns: [
    {
      columnName: "Reqest. Date",
      accessor: "REQ_DT",
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
      accessor: "CONFIRMED",
      width: 170,
    },
    {
      columnName: "Maker",
      accessor: "MAKER_BY",
      width: 150,
    },
    {
      columnName: "Maker Date",
      accessor: "MAKER_DT",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Maker Machine",
      accessor: "MAKER_MACHINE_NM",
      width: 200,
    },
    {
      columnName: "Cheker",
      accessor: "CHECKER_BY",
      width: 150,
    },
    {
      columnName: "Cheker Date",
      accessor: "CHECKER_DT",
      Cell: components.DateTimeCell,
      width: 180,
    },

    {
      columnName: "Cheker Machine",
      accessor: "CHECKER_MACHINE_NM",
      width: 150,
    },
    {
      columnName: "Remark",
      accessor: "REMARKS",
      width: 120,
    },
  ],
};
