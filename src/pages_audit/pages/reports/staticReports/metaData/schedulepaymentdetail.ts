import { components, filters } from "components/report";

export const schedulePaymentMetaData = {
  title: "Schedule Payment Details",
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
      columnName: "Login ID",
      accessor: "CUSTOM_USER_NM",
      width: 160,
      type: "default",
    },
    {
      columnName: "Request Type",
      accessor: "TRN_TYPE",
      width: 140,
      type: "default",
    },
    {
      columnName: "Request Date",
      accessor: "TRAN_DT",
      width: 170,
      type: "default",
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Last Process Date",
      accessor: "LAST_PROCESS_DT",
      width: 170,
      type: "default",
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 140,
      type: "default",
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["STATUS"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
    {
      columnName: "Deactive Date",
      accessor: "DEACTIVE_DT",
      width: 170,
      type: "default",
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Service Charge",
      accessor: "SERVICE_CHARGE",
      width: 150,
      type: "default",
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT",
      accessor: "VAT_CHARGE",
      width: 140,
      type: "default",
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 140,
      type: "default",
    },
    {
      columnName: "Deactive Channel",
      accessor: "DEACTIVE_CHANNEL",
      width: 140,
      type: "default",
    },
    {
      columnName: "Payment Type",
      accessor: "PAYMENT_TYPE",
      width: 140,
      type: "default",
    },
    {
      columnName: "Frequency",
      accessor: "PAYMENT_FREQUENCY",
      width: 140,
      type: "default",
    },
    {
      columnName: "No. of Payments",
      accessor: "NO_OF_PAYMENT",
      width: 160,
      type: "default",
    },
    {
      columnName: "Policy Number",
      accessor: "POLICY_NUMBER",
      width: 140,
      type: "default",
    },
    {
      columnName: "Policy Holder Name",
      accessor: "POLICY_HOLDER_NAME",
      width: 170,
      type: "default",
    },
    {
      columnName: "Policy Paid Type",
      accessor: "POLICY_PAID_TYPE",
      width: 160,
      type: "default",
    },
    {
      columnName: "Schedule Response",
      accessor: "SCHEDULE_RESPONSE",
      width: 180,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
