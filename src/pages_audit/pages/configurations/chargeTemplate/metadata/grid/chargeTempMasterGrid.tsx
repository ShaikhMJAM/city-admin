import { GridMetaDataType } from "components/dataTableStatic";

export const chargeTempMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Service Charge Template",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "68vh", max: "68vh" },
    pageSizes: [15, 20, 30],
    defaultPageSize: 15,
    isCusrsorFocused: true,
    allowFilter: true,
  },
  filters: [
    {
      columnName: "Effective Date",
      accessor: "EFFECTIVE_DT",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      columnName: "Description",
      accessor: "DESCRIPTION",
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
      columnName: "Sr. No.",
      componentType: "default",
      accessor: "id",
      sequence: 1,
      alignment: "left",
      width: 100,
      maxWidth: 150,
      minWidth: 50,
      isAutoSequence: true,
    },
    {
      columnName: "Effective Date",
      accessor: "EFFECTIVE_DT",
      sequence: 2,
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
    },
    {
      columnName: "Description",
      componentType: "default",
      accessor: "DESCRIPTION",
      sequence: 3,
      alignment: "left",
      width: 200,
      maxWidth: 400,
      minWidth: 150,
    },
    {
      columnName: "Confirm Status",
      componentType: "default",
      accessor: "CONFIRM_STATUS",
      sequence: 4,
      alignment: "left",
    },
    {
      accessor: "ENTERED_BY",
      columnName: "Entered By",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 110,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "ENTERED_DATE",
      columnName: "Entered Date",
      sequence: 6,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy hh:mm a",
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Last Entered By",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 130,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Last Modified Date",
      sequence: 8,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy hh:mm a",
    },
  ],
};
export const chargeTempMasterConfirmationGridMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Service Charge Template Confirmation",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "68vh", max: "68vh" },
    pageSizes: [15, 20, 30],
    defaultPageSize: 15,
    allowRowSelection: true,
    allowFilter: true,
  },
  filters: [
    {
      accessor: "EFFECTIVE_DT",
      columnName: "Effective Date",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
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
      columnName: "Sr. No.",
      componentType: "default",
      accessor: "id",
      sequence: 1,
      alignment: "left",
      width: 100,
      maxWidth: 150,
      minWidth: 90,
      isAutoSequence: true,
    },
    {
      columnName: "Effective Date",
      accessor: "EFFECTIVE_DT",
      sequence: 2,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy hh:mm a",
    },
    {
      columnName: "Description",
      componentType: "default",
      accessor: "DESCRIPTION",
      sequence: 3,
      alignment: "left",
      width: 200,
      maxWidth: 400,
      minWidth: 150,
    },
    {
      columnName: "Confirm Status",
      componentType: "default",
      accessor: "CONFIRM_STATUS",
      sequence: 4,
      alignment: "left",
    },
    {
      accessor: "ENTERED_BY",
      columnName: "Entered By",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 110,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "ENTERED_DATE",
      columnName: "Entered Date",
      sequence: 6,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy hh:mm a",
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Last Entered By",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 130,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Last Modified Date",
      sequence: 8,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy hh:mm a",
    },
  ],
};
