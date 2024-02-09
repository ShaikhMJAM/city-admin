import { components } from "components/report";

export const idtpForgotPinMetaData = {
  title: "IDTP Forgot PIN Report",
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
      columnName: "Virtual ID",
      accessor: "USER_VID",
      width: 150,
    },
    {
      columnName: "A/c. Or Card Number",
      accessor: "ACCT_NO",
      width: 210,
    },
    {
      columnName: "NID",
      accessor: "NID",
      width: 150,
    },
    {
      columnName: "Mobile Number",
      accessor: "MOBILE_NO",
      width: 180,
    },
    {
      columnName: "Birth Date",
      accessor: "BIRTH_DATE",
      width: 170,
      Cell: components.DateCell,
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
      columnName: "Response Code",
      accessor: "RESPONSECODE",
      width: 170,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSEMESSAGE",
      width: 200,
    },
  ],
};
