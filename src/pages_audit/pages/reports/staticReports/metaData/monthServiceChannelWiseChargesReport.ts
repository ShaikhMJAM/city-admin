export const monthlyServiceChanneChargesMetaData = {
  title: "Monthly Service And Channel Wise Charges Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATESERVICECHANNEL",
  autoFetch: false,
  columns: [
    {
      columnName: "Month",
      accessor: "TRN_DATE",
      width: 140,
      type: "default",
    },
    {
      columnName: "Service",
      accessor: "SERVICE",
      width: 150,
    },

    {
      columnName: "Transaction",
      accessor: "TRANSACTION_CNT",
      width: 150,
    },
    {
      columnName: "Volume",
      accessor: "VOLUME",
      width: 150,
    },
    {
      columnName: "Unique Customer",
      accessor: "UNIQUE_CUSTOMER",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
