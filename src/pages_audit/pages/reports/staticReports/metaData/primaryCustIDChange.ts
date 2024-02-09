import { components } from "components/report";

export const primaryChangeMetaData = {
  title: "Primary Identifier Change Report",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Old Source",
      accessor: "OLD_PRIMARY_SOURCE",
      width: 170,
    },
    {
      columnName: "New Source",
      accessor: "PRIMARY_APP_SOURCE",
      width: 170,
    },
    {
      columnName: "Old CB Number",
      accessor: "OLD_PRIMARY_CBNUMBER",
      width: 170,
    },
    {
      columnName: "New CB Number",
      accessor: "PRIMARY_CBNUMBER",
      width: 170,
    },
    {
      columnName: "Old Card/account No.",
      accessor: "OLD_REG_CARD_ACCT_NO",
      width: 180,
    },
    {
      columnName: "New Card/account No.",
      accessor: "REG_CARD_ACCT_NO",
      width: 180,
    },
    {
      columnName: "Status",
      accessor: "CONFIRMED",
      width: 170,
    },
    {
      columnName: "Changed By",
      accessor: "ENTERED_BY",
      width: 170,
    },
    {
      columnName: "Changed Date",
      accessor: "ENTERED_DATE",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Verified By",
      accessor: "VERIFIED_BY",
      width: 170,
    },
    {
      columnName: "Verified Date",
      accessor: "VERIFIED_DATE",
      width: 170,
      Cell: components.DateTimeCell,
    },
  ],
};
