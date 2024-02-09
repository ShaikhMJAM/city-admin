import { GridMetaDataType } from "components/dataTableStatic";
export const PGWGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "PGW Merchant User",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
  },
  filters: [
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
    {
      accessor: "GETWAY_NAME",
      columnName: "Gateway Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "IP_ADDRESS",
      columnName: "IP Address",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
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
      accessor: "MOBILE_NO",
      columnName: "Mobile No",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "USER_ROLE",
      columnName: "User role",
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
      isAutoSequence: true,
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 70,
      maxWidth: 120,
    },
    {
      accessor: "TRAN_CD",
      columnName: "",
      sequence: 3,
      isVisible: false,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "USER_NAME",
      columnName: "Login ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "GETWAY_NAME",
      columnName: "Gateway Name",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "USER_ROLE",
      columnName: "User role",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      accessor: "USER_STATUS_1",
      columnName: "User Status",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "USER_STATUS",
      columnName: "User Status",
      sequence: 7,
      alignment: "left",
      isVisible: false,
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile No",
      sequence: 8,
      isVisible: false,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "CONFIRMED",
      columnName: "Mobile No",
      sequence: 9,
      isVisible: false,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "MOBILE_DESC",
      columnName: "Mobile No",
      sequence: 10,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "IP_ADDRESS",
      columnName: "IP Address",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "CONFIRM_STATUS",
      columnName: "Confirm Status",
      sequence: 13,
      alignment: "center",
      componentType: "default",
      color: (val, data) => {
        let confirmed = data?.original?.CONFIRMED ?? "";
        return confirmed === "N"
          ? "red"
          : confirmed === "R"
          ? "rgb(128, 0, 0)"
          : "inherit";
      },
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Modified By",
      sequence: 14,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Modified Date",
      sequence: 15,
      alignment: "center",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};

export const PGWConfirmGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "PGW Merchant Users Confirmation",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
  },
  filters: [
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
    {
      accessor: "GETWAY_NAME",
      columnName: "Gateway Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "IP_ADDRESS",
      columnName: "IP Address",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
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
      accessor: "MOBILE_NO",
      columnName: "Mobile No",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "USER_ROLE",
      columnName: "User role",
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
      isAutoSequence: true,
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 70,
      maxWidth: 120,
    },
    {
      accessor: "ENTERED_DATE",
      columnName: "Entered Date",
      sequence: 2,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 170,
      maxWidth: 200,
    },
    {
      accessor: "USER_NAME",
      columnName: "Login ID",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "USER_ROLE",
      columnName: "User role",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      accessor: "GETWAY_NAME",
      columnName: "Gateway Name",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "ENTERED_BY",
      columnName: "Entered By",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 170,
      maxWidth: 200,
    },
    {
      accessor: "CONFIRM_STATUS",
      columnName: "Confirmation Status",
      sequence: 7,
      alignment: "center",
      componentType: "default",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};
