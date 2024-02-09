import { components } from "components/report";

export const monthlyUserwiseChanneletaData = {
  title: "Monthly User And Channel Wise MAU Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATESERVICECHANNEL",
  autoFetch: false,
  columns: [
    {
      columnName: "Month",
      accessor: "TRN_MONTH",
      width: 140,
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
      columnName: "Number Of Service",
      accessor: "UNIQUE_TRN_TYPE",
      width: 170,
      isNumberTotal: true,
      alignment: "right",
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 200,
    },
  ],
};
