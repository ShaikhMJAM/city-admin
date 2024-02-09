import { GridMetaDataType } from "components/dataTableStatic";

export const EmailAcctMstGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Email Account Setup",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [20, 30, 50],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: true,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "CONFIG_NM",
      columnName: "Sent By Name ",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "SMTP_SERVER",
      columnName: "Email SMTP Server",
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
      accessor: "SR_NO",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "TRAN_CD",
      columnName: "",
      isVisible: false,
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "COMP_CD",
      columnName: "",
      isVisible: false,
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "CONFIG_NM",
      columnName: "Sent By Name ",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 170,
      minWidth: 150,
      maxWidth: 300,
      showTooltip: true,
    },

    {
      accessor: "SMTP_SERVER",
      columnName: "SMTP Serve IP",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 250,
      showTooltip: true,
    },
    {
      accessor: "PORT_NO",
      columnName: "Port",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 60,
      minWidth: 40,
      maxWidth: 80,
      showTooltip: true,
    },
    {
      accessor: "SSL",
      columnName: "SSL Enabled",
      sequence: 6,
      alignment: "left",
      transform: (value) => {
        if (value === true) {
          return "Yes";
        } else if (value === false) {
          return "No";
        } else {
          return value;
        }
      },
      componentType: "default",
      width: 110,
      minWidth: 100,
      maxWidth: 250,
      showTooltip: true,
    },
    {
      accessor: "SPA",
      columnName: "Secure Password Authentication",
      sequence: 7,
      alignment: "left",
      transform: (value) => {
        if (value === true) {
          return "Yes";
        } else if (value === false) {
          return "No";
        } else {
          return value;
        }
      },
      componentType: "default",
      width: 220,
      minWidth: 100,
      maxWidth: 250,
      showTooltip: true,
    },
    {
      accessor: "SMTP_PASS_AUTH",
      columnName: "Pass Auth",
      sequence: 8,
      alignment: "left",
      transform: (value) => {
        if (value === true) {
          return "Yes";
        } else if (value === false) {
          return "No";
        } else {
          return value;
        }
      },
      componentType: "default",
      width: 90,
      minWidth: 90,
      maxWidth: 300,
      showTooltip: true,
    },
    {
      accessor: "USER_NM",
      columnName: "User Name",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 250,
      minWidth: 150,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "PASSWORD",
      columnName: "Password",
      isVisible: false,
      sequence: 10,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
      showTooltip: true,
    },
  ],
};
