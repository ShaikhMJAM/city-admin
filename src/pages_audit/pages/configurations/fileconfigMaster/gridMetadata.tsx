import { GridMetaDataType } from "components/dataTableStatic";
export const FileconfigMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Guideline File Configuration",
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
      accessor: "USECASES",
      columnName: "Use Case",
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
      accessor: "TRAN_CD",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      isVisible: false,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "id",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },

    {
      accessor: "TRAN_DT",
      columnName: "Upload Date",
      sequence: 1,
      alignment: "left",
      width: 150,
      minWidth: 120,
      maxWidth: 300,
      componentType: "default",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      // dateFormat: "dd/MM/yyyy hh:mm a",
    },

    {
      accessor: "USECASES",
      columnName: "Use Case",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 120,
      maxWidth: 300,
    },
    {
      accessor: "PARAMETER_NO",
      columnName: "Use Case",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 150,
      isVisible: false,
      minWidth: 120,
      maxWidth: 300,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
      showTooltip: true,
    },
    {
      accessor: "FILE_NAME",
      columnName: "File Name",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "FILE_TYPE",
      columnName: "File Type",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 150,
    },
  ],
};
