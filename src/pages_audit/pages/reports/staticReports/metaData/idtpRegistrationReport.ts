import { components } from "components/report";

export const idtpRegistrationMetaData = {
  title: "IDTP Registration Report",
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
      columnName: "Reg. Date",
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
      columnName: "VID",
      accessor: "USER_VID",
      width: 150,
    },
    {
      columnName: "Defualt Debit Account",
      accessor: "ACCT_NO",
      width: 200,
    },
    {
      columnName: "Account Name",
      accessor: "ACCT_NM",
      width: 150,
    },
    {
      columnName: "Address",
      accessor: "ADDRESS1",
      width: 150,
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 180,
    },
    {
      columnName: "Email ID",
      accessor: "EMAIL_ID",
      width: 180,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
    {
      columnName: "NID",
      accessor: "NID",
      width: 150,
    },
    {
      columnName: "TIN",
      accessor: "TIN",
      width: 150,
    },
    {
      columnName: "Birth Date",
      accessor: "BIRTH_DATE",
      width: 170,
      Cell: components.DateCell,
    },
    {
      columnName: "Defualt Credit Account",
      accessor: "DEFAULT_CR_ACCT",
      width: 200,
    },
    {
      columnName: "Defualt RTP Account",
      accessor: "DEFAULT_RTP_ACCT",
      width: 200,
    },
    {
      columnName: "Registration Type",
      accessor: "REGISTRATION_FLAG",
      width: 180,
    },
  ],
};
