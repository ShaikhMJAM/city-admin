import { GridMetaDataType } from "components/dataTableStatic";
export const UpdateGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Confirmation Column Details",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [20, 30, 50],
    defaultPageSize: 20,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    hiddenFlag: "_hidden",
  },

  filters: [
    {
      accessor: "USER_NAME",
      columnName: "User Name",
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
      accessor: "DISP_ACTION",
      columnName: "Action",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 80,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      accessor: "COLUMN_LABEL",
      columnName: "Label Name",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 160,
      minWidth: 100,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "OLD_VALUE",
      columnName: "Old Value",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 210,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "NEW_VALUE",
      columnName: "New Value",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 210,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "MODIFIED_BY",
      columnName: "Maker",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "MODIFIED_DATE",
      columnName: "Maker Date",
      sequence: 9,
      alignment: "center",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 120,
      maxWidth: 200,
    },
  ],
};
