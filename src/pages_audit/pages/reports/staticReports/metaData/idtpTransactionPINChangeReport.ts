import { components } from "components/report";

export const idtpTrnPinChangeMetaData = {
  title: "IDTP Transaction PIN Change Report",
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
      columnName: "User VID",
      accessor: "USER_VID",
      width: 150,
    },
    {
      columnName: "Account Number",
      accessor: "ACCT_NO",
      width: 200,
    },
    {
      columnName: "NID",
      accessor: "NID",
      width: 150,
    },

    {
      columnName: "Birth Date",
      accessor: "BIRTH_DATE",
      width: 170,
      Cell: components.DateCell,
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
      columnName: "Reqest ID",
      accessor: "REQUIEST_ID",
      width: 120,
    },
    {
      columnName: "Swift Code",
      accessor: "SWIFTCODE",
      width: 170,
    },
    {
      columnName: "SDK Response Code",
      accessor: "WEB_SDK_RESPONSE_CD",
      width: 200,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSECODE",
      width: 150,
    },
    {
      columnName: "Response Message",
      accessor: "RESPONSEMESSAGE",
      width: 200,
    },
  ],
};
