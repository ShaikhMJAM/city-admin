import { components } from "components/report";

export const dailySeriveChargesMetaData = {
  title: "Daily Service And Channel Wise Charges report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DAILYUSERWISECHANNEL",
  autoFetch: false,
  columns: [
    {
      columnName: "Date",
      accessor: "TRN_DATE",
      width: 150,
      Cell: components.DateCell,
      type: "default",
    },
    {
      columnName: "Service",
      accessor: "SERVICE",
      width: 190,
      type: "default",
    },
    {
      columnName: "Transaction",
      accessor: "TRANSACTION_CNT",
      width: 140,
    },

    {
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 150,
    },
    {
      columnName: "VAT",
      accessor: "VAT_CHARGE",
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
