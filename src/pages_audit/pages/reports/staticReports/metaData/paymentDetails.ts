import { components } from "components/report";

export const paymentDetailsMetaData = {
  title: "Payment Details",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "PAYMENTDETAILS",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Payment Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },

    {
      columnName: "From Source",
      accessor: "FROM_SOURCE",
      width: 150,
    },
    {
      columnName: "To Source",
      accessor: "TO_SOURCE",
      width: 150,
    },

    {
      columnName: "From A/C No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },

    {
      columnName: "To A/C No.",
      accessor: "TO_ACCT_NO",
      width: 170,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 120,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },

    {
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 150,
    },
    {
      columnName: "Vat",
      accessor: "VAT",
      width: 120,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 120,
    },

    {
      columnName: "Mobile",
      accessor: "OTP_MOBILE",
      width: 180,
    },
    {
      columnName: "Email",
      accessor: "OTP_EMAIL",
      width: 160,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 150,
    },

    {
      columnName: "Response Desc.",
      accessor: "RESPONSE_DESC",
      width: 190,
    },
    {
      columnName: "Ref.Transaction ID",
      accessor: "REF_TRAN_ID",
      width: 180,
    },
    {
      columnName: "Trn. Particulars",
      accessor: "TRN_PARTICULARS",
      width: 160,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
