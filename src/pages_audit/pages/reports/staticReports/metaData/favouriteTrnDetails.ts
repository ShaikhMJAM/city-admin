import { components } from "components/report";

export const favouriteTransactionMetaData = {
  title: "Favourite Transaction Details",
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
      columnName: "Transaction Date",
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
      columnName: "Transaction Type",
      accessor: "TRN_TYPE",
      width: 180,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
    {
      columnName: "Fav. Type",
      accessor: "FAV_TRAN_TYPE",
      width: 150,
    },
    {
      columnName: "Ref.No.",
      accessor: "FAV_REF_TRAN_CD",
      width: 180,
    },
    {
      columnName: "Fav. Tran. name",
      accessor: "FAV_TRAN_NAME",
      width: 170,
    },
  ],
};
