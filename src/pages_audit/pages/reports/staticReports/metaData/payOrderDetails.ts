import { components } from "components/report";

export const payOrderDetailsMetaData = {
  title: "Pay Order Details Report",
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
      width: 200,
      Cell: components.DateCell,
      type: "default",
    },
    {
      columnName: "Transaction Time",
      accessor: "TRAN_DATE",
      Cell: components.DateTimeCell,
      width: 140,
      format: "HH:mm:ss",
    },
    {
      columnName: "Type Of FundTransfer",
      accessor: "TRN_TYPE",
      width: 190,
    },
    {
      columnName: "From Account",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Delivery Branch Name",
      accessor: "DELIVERY_LOC",
      width: 170,
    },
    {
      columnName: "Bank Name",
      accessor: "BANK_NAME",
      width: 170,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 110,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Beneficiary Name",
      accessor: "BENE_NAME",
      width: 150,
    },
    {
      columnName: "Customer ID",
      accessor: "USER_NAME",
      width: 140,
    },
    {
      columnName: "Transfer Ref Number",
      accessor: "REF_TRAN_ID",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 130,
    },
  ],
};
