import { GridMetaDataType } from "components/dataTableStatic";

export const MerchantMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Payment Gateway Merchant Master",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [20, 30, 40],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [
    {
      accessor: "id",
      columnName: "Sr. No.",
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
      accessor: "id1",
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
      accessor: "DESCRIPTION",
      columnName: "Payment Gateway Merchant Name*",
      sequence: 2,
      alignment: "left",
      componentType: "editableTextField",
      autoComplete: "off",
      placeholder: "Enter Payment Gateway Merchant Name",
      width: 300,
      minWidth: 200,
      maxWidth: 500,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
  ],
};
