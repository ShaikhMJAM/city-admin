import { components } from "components/report";

export const mfsTranDetailMetaData = {
  title: "MFS Transfer Transation Details",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "MFSTRAN",
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
      columnName: "Transation Date",
      accessor: "TRAN_DT",
      width: 200,
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
      columnName: "Transation Type",
      accessor: "TRN_TYPE",
      width: 170,
    },
    {
      columnName: "Amount",
      accessor: "AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Charge Amount",
      accessor: "SERVICE_CHARGE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT Amount",
      accessor: "VAT_CHARGE",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "From Source",
      accessor: "APP_INDICATOR",
      width: 170,
    },
    {
      columnName: "CB Number",
      accessor: "APP_CUSTOMER_ID",
      width: 170,
    },
    {
      columnName: "From A/c No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "From A/c Name.",
      accessor: "FROM_ACCT_NM",
      width: 170,
    },
    {
      columnName: "To A/c No.",
      accessor: "TO_ACCT_NO",
      width: 170,
    },
    // FROM_ACCT_NM
    {
      columnName: "To IFSC Code",
      accessor: "TO_IFSCCODE",
      width: 170,
    },
    {
      columnName: "Bank Name",
      accessor: "BANK_NM",
      width: 170,
    },
    {
      columnName: "Branch Name",
      accessor: "BRANCH_NM",
      width: 170,
    },
    {
      columnName: "To A/c Name",
      accessor: "TO_ACCT_NM",
      width: 170,
    },
    {
      columnName: "Status",
      accessor: "TRN_STATUS",
      width: 170,
    },
    {
      columnName: "Process Date",
      accessor: "PROCESS_DT",
      width: 170,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Ref. No.",
      accessor: "REF_NO",
      width: 170,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 170,
    },
    {
      columnName: "From Contact No.",
      accessor: "MOBILE_NO",
      width: 170,
    },
    {
      columnName: "From Email ID",
      accessor: "EMAIL_ID",
      width: 170,
    },
    {
      columnName: "To Contact No.",
      accessor: "TO_CONTACT_NO",
      width: 170,
    },
    {
      columnName: "To Email ID",
      accessor: "TO_EMAIL_ID",
      width: 170,
    },
    {
      columnName: "Trans. Flow",
      accessor: "REQ_TYPE",
      width: 170,
    },
    {
      columnName: "Nick Name",
      accessor: "NICK_NAME",
      width: 170,
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 170,
    },
    {
      columnName: "API Response",
      accessor: "API_RESPONSE",
      width: 150,
      Cell: components.ButtonRowCell,
      type: "default",
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
