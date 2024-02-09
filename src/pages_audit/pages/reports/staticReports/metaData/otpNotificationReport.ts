import { components } from "components/report";

export const otpNotificationReportMetaData = {
  title: "OTP Notification Report",
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
      columnName: "Description",
      accessor: "DESCRIPTION",
      width: 180,
      type: "default",
    },
    {
      columnName: "Mobile No./Email ID",
      accessor: "MOBILE_EMAIL",
      width: 180,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },

    {
      columnName: "Sent Time",
      accessor: "SENT_TIME",
      Cell: components.DateTimeCell,
      width: 160,
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
