import { components, filters } from "components/report";

export const registrationCustomerMetaData = {
  title: "Customer Registration Report",
  disableGroupBy: "",
  hideFooter: false,
  hideAmountIn: "False",
  retrievalType: "DATE",
  enableServerSidePagination: true,
  autoFetch: false,
  filters: [
    {
      accessor: "USER_NAME",
      columnName: "Login ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "CUST_NAME",
      columnName: "Customer Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "PRIMARY_APP_SOURCE",
      columnName: "Source",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
  columns: [
    {
      columnName: "Reg. Date",
      accessor: "ENTERED_DATE",
      width: 150,
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
      columnName: "Customer Name",
      accessor: "CUST_NAME",
      width: 250,
      type: "default",
    },
    {
      columnName: "Reg. With",
      accessor: "REG_WITH",
      width: 120,
    },
    {
      columnName: "Reg. Account/Card Number",
      accessor: "REG_ACCT_NO",
      width: 200,
    },
    {
      columnName: "Source",
      accessor: "PRIMARY_APP_SOURCE",
      width: 120,
      isDisplayValueTotal: true,
      alignment: "right",
      DisplayValueLabel: {
        FINACLE: "Finacle Reg.",
        TRANZWARE: "Tranzware Reg.",
        ABABIL: "Ababil Reg.",
      },
    },
    {
      columnName: "CB Number",
      accessor: "PRIMARY_CBNUMBER",
      width: 130,
    },
    {
      columnName: "Auth. With",
      accessor: "AUTH_FLAG",
      width: 150,
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      Filter: filters.SelectColumnFilter,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["STATUS"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
      width: 100,
    },
    {
      columnName: "Mobile Number",
      accessor: "MOBILE_NO",
      width: 140,
    },
    {
      columnName: "Email ID",
      accessor: "EMAIL_ID",
      width: 200,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 120,
    },
    {
      columnName: "Maker",
      accessor: "ENTERED_BY",
      width: 120,
    },
    {
      columnName: "Checker",
      accessor: "VERIFIED_BY",
      width: 120,
    },
    {
      columnName: "Last Pass. Change",
      accessor: "LOGIN_PASS_DT",
      width: 150,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Remarks",
      accessor: "REMARKS",
      width: 200,
    },
  ],
};
