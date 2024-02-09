import { GridMetaDataType } from "components/dataTableStatic";

export const BeneresMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Beneficiary Restriction Master",
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
      accessor: "BEN_LABEL_DESC",
      columnName: "Restriction Type",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "BEN_VALUE",
      columnName: "Value",
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
      // isVisible: false,
      maxWidth: 100,
      isAutoSequence: true,
    },

    {
      accessor: "BEN_LABEL_DESC",
      columnName: "Restriction Type",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "BEN_LABEL",
      columnName: "Beneficiary Label",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 200,
      isVisible: false,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "BEN_VALUE",
      columnName: "Value",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Modified By",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Modified Date",
      sequence: 10,
      alignment: "center",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};
