import { components } from "components/report";

export const dailyServiceChanneletaData = {
  title: "Daily Service And Channel Wise MAU Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DAILYUSERWISECHANNEL",
  autoFetch: false,
  columns: [
    {
      columnName: "Date",
      accessor: "TRN_DATE",
      width: 160,
      Cell: components.DateCell,
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
      width: 200,
      isNumberTotal: true,
      alignment: "right",
    },
    {
      columnName: "Volume",
      accessor: "VOLUME",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Unique Customer",
      accessor: "UNIQUE_CUSTOMER",
      width: 180,
      isNumberTotal: true,
      alignment: "right",
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
