import { GridMetaDataType } from "components/dataTableStatic";

export const ServiceMonitorGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Service Monitoring Master",
    rowIdColumn: "SR_CD",
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
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "SERVICE_ID",
      columnName: "Service ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DISP_STATUS",
      columnName: "Status",
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
      accessor: "SR_CD",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      isVisible: true,
      maxWidth: 100,
      isAutoSequence: true,
    },

    {
      accessor: "SERVICE_ID",
      columnName: "Service ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 200,
      isVisible: true,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "LAST_EXECUTION_DT",
      columnName: "Last Execution Date",
      sequence: 4,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "DISP_STATUS",
      columnName: "Status",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "STATUS",
      columnName: "Modified Date",
      sequence: 6,
      isVisible: false,
      alignment: "center",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};
