import { components } from "components/report";

export const chequeBookReqMetaData = {
  title: "Cheque Book Request Report",
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
      width: 140,
      type: "default",
    },
    {
      columnName: "A/C No.",
      accessor: "ACCT_NO",
      width: 170,
    },
    {
      columnName: "No. Of Leaf",
      accessor: "NO_OF_LEAF",
      width: 150,
    },
    {
      columnName: "Delivery Branch",
      accessor: "BRANCH_NM",
      width: 170,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },

    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "Accept Status",
      accessor: "CONFIRMED",
      width: 150,
    },
    {
      columnName: "Accept By",
      accessor: "VERIFIED_BY",
      width: 150,
    },
    {
      columnName: "Accept Date",
      accessor: "VERIFIED_DATE",
      width: 150,
      Cell: components.DateTimeCell,
    },
  ],
};
