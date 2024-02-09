import { components } from "components/report";

export const idtpCreateRTPMetaData = {
  title: "IDTP Create RTP Report",
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
      columnName: "Request Date",
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
      columnName: "User VID",
      accessor: "USER_VID",
      width: 150,
    },
    {
      columnName: "Receiver VID",
      accessor: "RECEIVER_VID",
      width: 150,
    },
    {
      columnName: "Receiver Name",
      accessor: "RECEIVER_NAME",
      width: 150,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 180,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Mobile Number",
      accessor: "MOBILE_NO",
      width: 180,
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
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 150,
    },
    {
      columnName: "OTP Mobile Number",
      accessor: "OTP_MOBILE_NO",
      width: 180,
    },
    {
      columnName: "OTP Email ID",
      accessor: "OTP_EMAIL_ID",
      width: 170,
    },

    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 150,
    },
    {
      columnName: "Referance Number",
      accessor: "REF_NO",
      width: 190,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSECODE",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSEMSG",
      width: 200,
    },
  ],
};
