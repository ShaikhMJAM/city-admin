import { components } from "components/report";

export const dailyUserwiseChanneletaData = {
  title: "Daily User And Channel Wise MAU Report",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Primary Source",
      accessor: "PRIMARY_SOURCE",
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
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Number Of Service",
      accessor: "UNIQUE_TRN_TYPE",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
