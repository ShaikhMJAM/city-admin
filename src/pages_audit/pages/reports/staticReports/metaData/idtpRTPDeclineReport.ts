import { components } from "components/report";

export const idtpRtpDeclineMetaData = {
  title: "IDTP RTP Decline Report",
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
      columnName: "Reqest. Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Virtual ID",
      accessor: "USER_VID",
      width: 150,
    },
    {
      columnName: "Sender Virtual ID",
      accessor: "SENDER_VID",
      width: 190,
    },
    {
      columnName: "Sender Name",
      accessor: "SENDER_NAME",
      width: 150,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 170,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
    {
      columnName: "Mobile Number",
      accessor: "MOBILE_NO",
      width: 180,
    },
    {
      columnName: "RTP ID",
      accessor: "RTPID",
      width: 120,
    },
    {
      columnName: "Referance Number",
      accessor: "REF_NO",
      width: 190,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },
    {
      columnName: "Responce Code",
      accessor: "RESPONSECODE",
      width: 150,
    },
    {
      columnName: "Responce Message",
      accessor: "RESPONSEMSG",
      width: 180,
    },
  ],
};
