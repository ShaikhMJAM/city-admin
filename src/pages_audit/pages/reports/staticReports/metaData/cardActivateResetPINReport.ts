import { components } from "components/report";

export const cardActiveResetPINMetaData = {
  title: "Card Activate/Reset Pin Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "CARDACTIVEPIN",
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
      columnName: "Type Of Tran.",
      accessor: "TYPE_OF_TRAN",
      width: 170,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["TYPE_OF_TRAN"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
    {
      columnName: "Card No.",
      accessor: "FROM_ACCT_NO",
      width: 170,
    },
    {
      columnName: "CB Number",
      accessor: "APP_CUSTOMER_ID",
      width: 170,
    },

    {
      columnName: "Old Status Of Card",
      accessor: "CARD_STATUS_CD",
      width: 180,
    },
    {
      columnName: "Old Status Of Card",
      accessor: "NEW_CARD_STATUS_CD",
      width: 180,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 150,
    },
    {
      columnName: "Change Reason",
      accessor: "PIN_CHANGE_REASON",
      width: 170,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["PIN_CHANGE_REASON"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
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
      columnName: "Mobile No.",
      accessor: "MOBILE_NO",
      width: 150,
    },
    {
      columnName: "Email ID",
      accessor: "EMAIL_ID",
      width: 150,
    },
    {
      columnName: "Response Code",
      accessor: "RESPONSE_CODE",
      width: 170,
    },
    {
      columnName: "Response Messsage",
      accessor: "RESPONSE_MSG",
      width: 180,
    },
  ],
};
