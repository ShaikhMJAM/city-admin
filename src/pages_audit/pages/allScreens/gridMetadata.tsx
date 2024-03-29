import { GridMetaDataType } from "components/dataTableStatic";
export const AllScreensGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "All Screens",
    rowIdColumn: "system_code",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [15, 30, 50],
    defaultPageSize: 15,
    containerHeight: {
      min: "63vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "label",
      columnName: "Screen Name",
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
      accessor: "label",
      columnName: "Screen Name",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 500,
      minWidth: 400,
      maxWidth: 700,
    },
    {
      accessor: "user_code",
      columnName: "User Code",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "system_code",
      columnName: "System Code",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 120,
      maxWidth: 200,
    },
  ],
};
