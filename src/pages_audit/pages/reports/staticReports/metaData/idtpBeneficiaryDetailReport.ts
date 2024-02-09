import { components } from "components/report";

export const idtpBeneficiaryDetailMetaData = {
  title: "IDTP Beneficiary Detail Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEUSERNMNOREQ",
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
      width: 140,
      type: "default",
    },
    {
      columnName: "Beneficiary VID",
      accessor: "BEN_VID",
      width: 150,
    },

    {
      columnName: "Beneficiary Name",
      accessor: "BEN_NAME",
      width: 150,
    },
    {
      columnName: "Nick Name",
      accessor: "NICK_NAME",
      width: 150,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
