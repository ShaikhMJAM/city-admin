import { GridMetaDataType } from "components/dataTableStatic";
export const ScreenNoteGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Screen Note Configuration",
    rowIdColumn: "SCREEN_ID",
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
      accessor: "SCREEN_ID",
      columnName: "Screen ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "SCREEN_NM",
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
      accessor: "sr_no",
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
      accessor: "SCREEN_ID",
      columnName: "Screen ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "SCREEN_NM",
      columnName: "Description",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 180,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "SCREEN_MSG",
      columnName: "English Note",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 350,
      minWidth: 200,
      maxWidth: 600,
      showTooltip: true,
    },
    {
      accessor: "SCREEN_MSG_BN",
      columnName: "Bangla Note",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 350,
      minWidth: 200,
      maxWidth: 600,
      showTooltip: true,
    },
  ],
};
