import { components } from "components/report";

export const topupRetrivalMetaData = {
  title: "Topup Reversal Report",
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
      accessor: "REQ_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Topup Tran Code",
      accessor: "TRAN_CD",
      width: 140,
      type: "default",
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 170,
    },
    {
      columnName: "Merechant Ref. ID",
      accessor: "MERCHANT_REF_ID",
      width: 170,
    },
    {
      columnName: "Amount Status",
      accessor: "AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
    {
      columnName: "Request IP",
      accessor: "REQUEST_IP",
      width: 170,
    },
    {
      columnName: "Ref. Tran. ID",
      accessor: "REF_TRAN_CD",
      width: 170,
    },
    {
      columnName: "From Source",
      accessor: "FROM_SOURCE",
      width: 170,
    },
    {
      columnName: "Operator Name",
      accessor: "OPERATOR_NAME",
      width: 170,
    },
    {
      columnName: "Recharge date",
      accessor: "EXECUTION_DT",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 170,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSE_MSG",
      width: 170,
    },
  ],
};
