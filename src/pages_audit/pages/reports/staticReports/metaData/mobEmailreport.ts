import { components } from "components/report";

export const mobEmailReportMetaData = {
  title: "Mobile/Email Notification Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "SMSEMAIL",
  autoFetch: false,
  columns: [
    {
      columnName: "TRN Code",
      accessor: "TRAN_CD",
      width: 140,
      type: "default",
    },
    {
      columnName: "Transaction Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Message Type",
      accessor: "OTP_TYPE",
      width: 140,
      type: "default",
    },
    {
      columnName: "Mobile No./Email ID",
      accessor: "MOBILE_EMAIL",
      width: 200,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },

    {
      columnName: "Sent Time",
      accessor: "SENT_TIME",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Message Description",
      accessor: "MSG_DESC",
      width: 180,
    },
    {
      columnName: "Api Resp",
      accessor: "API_RESP",
      width: 160,
    },
  ],
};
