import { components } from "components/report";

export const monthlyServiceChanneletaData = {
  title: "Monthly Service And Channel Wise MAU Report",
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
      alignment: "right",
      isNumberTotal: true,
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
      width: 170,
      alignment: "right",
      isNumberTotal: true,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
