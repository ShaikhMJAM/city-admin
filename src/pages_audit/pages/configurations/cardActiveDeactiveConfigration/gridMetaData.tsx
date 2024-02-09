import { GridMetaDataType } from "components/dataTableStatic";

export const cardacticedeactive: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Card Activate/Deactivate Status Configuration",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
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
      accessor: "CARD_STATUS",
      columnName: "Card Status",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "TYPE_OF_TRAN",
      columnName: "Operation Type",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "STATUS_VALUE",
      columnName: "Status Value",
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
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 90,
      minWidth: 60,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "CARD_STATUS",
      columnName: "Card Status",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 110,
      maxWidth: 130,
    },
    {
      accessor: "STATUS_VALUE",
      columnName: "Status Value",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 110,
      maxWidth: 130,
    },
    {
      accessor: "TYPE_OF_TRAN",
      columnName: "Operation Type",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 130,
      minWidth: 120,
      maxWidth: 140,
    },
    {
      accessor: "CONFIRMED_STATUS",
      columnName: "Confirmed_Status",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 170,
      minWidth: 150,
      maxWidth: 180,
    },
    {
      accessor: "ENTERED_BY",
      columnName: "Modified By",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 110,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Last Entered Date",
      sequence: 7,
      alignment: "left",
      componentType: "date",
      placeholder: "",
      width: 150,
      minWidth: 120,
      maxWidth: 200,
      dateFormat: "dd/MM/yyyy HH:mm:ss",
    },
  ],
};
