import { components } from "components/report";

export const mobEmailUpdLogMetaData = {
  title: "Mobile/Email Updation From Citytouch Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATEUSERNMNOREQ",
  autoFetch: false,
  columns: [
    {
      columnName: "Reqest Date",
      accessor: "REQ_DATE",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Request Type",
      accessor: "REQ_TYPE",
      width: 140,
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 150,
      type: "default",
    },
    {
      columnName: "Process Date",
      accessor: "PROCESS_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 160,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 160,
    },
    {
      columnName: "Update Details",
      accessor: "API_RESPONSE",
      width: 160,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
