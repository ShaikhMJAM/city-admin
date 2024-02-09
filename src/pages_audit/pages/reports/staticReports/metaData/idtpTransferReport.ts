import { components } from "components/report";

export const idtpTransferMetaData = {
  title: "IDTP Transfer Report",
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
      columnName: "Transaction Date",
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
      columnName: "Sender VID",
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
      columnName: "Defualt Debit Account",
      accessor: "ACCT_NO",
      width: 200,
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
      columnName: "VAT",
      accessor: "PVAT_AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },

    {
      columnName: "InterOperable Fee",
      accessor: "IFEE_AMOUNT",
      width: 180,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Platform Fee",
      accessor: "PFEE_AMOUNT",
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
      width: 180,
    },
    {
      columnName: "Status",
      accessor: "TRN_STATUS",
      width: 170,
    },
    {
      columnName: "Transfer Type",
      accessor: "REQ_TYPE",
      width: 170,
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 180,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 150,
    },
    {
      columnName: "OTP Mobile No.",
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
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
    {
      columnName: "RTP ID",
      accessor: "RTPID",
      width: 120,
    },
    {
      columnName: "Swift Code",
      accessor: "SWIFTCODE",
      width: 170,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSECODE",
      width: 150,
    },
    {
      columnName: "SDK Response Code",
      accessor: "WEB_SDK_RESPONSE_CD",
      width: 200,
    },
    {
      columnName: "Reqest ID",
      accessor: "REQUEST_ID",
      width: 170,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSEMESSAGE",
      width: 200,
    },
    {
      columnName: "Referance Number",
      accessor: "REF_NO",
      width: 190,
    },
    {
      columnName: "Ref.No. Sending PSP",
      accessor: "REFNO_SENDINGPSP",
      width: 200,
    },
    {
      columnName: "Ref.No. Receiving PSP",
      accessor: "REFNO_RECEIVINGPSP",
      width: 200,
    },
    {
      columnName: "Ref.No.Receiving Bank",
      accessor: "REFNO_RECEIVINGBANK",
      width: 200,
    },
    {
      columnName: "Ref.No. IDTP",
      accessor: "REFNO_IDTP",
      width: 180,
    },
  ],
};
