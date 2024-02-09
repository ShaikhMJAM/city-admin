import { components } from "components/report";
export const virtualSubDetailsMetaData = {
  title: "API Response Details Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  hideShowFiltersSwitch: true,

  // retrievalType: "FUNDTRAN",
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
      columnName: "From A/C No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "To A/C No.",
      accessor: "TO_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Response Date",
      accessor: "REQ_DATE",
      width: 160,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Api Name",
      accessor: "API_NAME",
      width: 150,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },

    {
      columnName: "Resp. Code",
      accessor: "RESPONSE_CODE",
      width: 150,
    },
    {
      columnName: "Ref.Tran.ID",
      accessor: "REF_TRAN_ID",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 180,
    },
  ],
};
