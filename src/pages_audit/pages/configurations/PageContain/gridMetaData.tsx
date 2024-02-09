import { GridMetaDataType } from "components/dataTableStatic";
export const PageContainGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Page Content Configuration",
    rowIdColumn: "SR_NO",
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
      accessor: "CATEGORY_CD",
      columnName: "Category Code",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DETAIL_ID",
      columnName: "Details ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "LANGUAGE_CD",
      columnName: "Language Code",
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
      accessor: "CATEGORY_CD",
      columnName: "Category Code",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "DETAIL_ID",
      columnName: "Details ID",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 180,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "LANGUAGE_CD",
      columnName: "Language Code",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "CHANNEL",
      columnName: "Channel",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
      isVisible: false,
    },
    {
      accessor: "DISP_CHANNEL",
      columnName: "Channel",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "ENTERED_BY",
      columnName: "Entered By",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "ENTERED_DATE",
      columnName: "Entered Date",
      sequence: 5,
      alignment: "left",
      componentType: "date",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Last Modified By",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Last Modified Date",
      sequence: 5,
      alignment: "left",
      componentType: "date",
      width: 180,
      minWidth: 150,
      maxWidth: 250,
    },
  ],
};
