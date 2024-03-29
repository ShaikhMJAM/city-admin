import { GridMetaDataType } from "components/dataTableStatic";
export const BillerFieldsGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Field Options",
    rowIdColumn: "SR_CD",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    disableGroupBy: true,
    disableSorting: true,
    hideHeader: true,
    containerHeight: { min: "62vh", max: "62vh" },
    allowRowSelection: false,
  },
  columns: [
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "SR_CD",
      sequence: 0,
      alignment: "left",
      width: 100,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      columnName: "Field Name",
      componentType: "default",
      accessor: "FIELD_NAME",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Field Type",
      componentType: "default",
      accessor: "FIELD_TYPE",
      sequence: 2,
      alignment: "left",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      columnName: "Required",
      componentType: "default",
      accessor: "FIELD_REQUIRED",
      sequence: 3,
      alignment: "left",
      width: 100,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      columnName: "Datatype",
      componentType: "default",
      accessor: "FIELD_DATATYPE",
      sequence: 4,
      alignment: "left",
      width: 120,
      minWidth: 100,
      maxWidth: 170,
    },
    {
      columnName: "Minimum Value",
      componentType: "default",
      accessor: "FIELD_MIN_VALUE",
      sequence: 5,
      alignment: "left",
      width: 130,
      minWidth: 100,
      maxWidth: 170,
    },
    {
      columnName: "Maximum Value",
      componentType: "default",
      accessor: "FIELD_MAX_VALUE",
      sequence: 6,
      alignment: "left",
      width: 130,
      minWidth: 100,
      maxWidth: 170,
    },
    {
      columnName: "Label English",
      componentType: "default",
      accessor: "FIELD_LABEL_EN",
      sequence: 7,
      alignment: "left",
      width: 170,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      columnName: "Label Bangla",
      componentType: "default",
      accessor: "FIELD_LABEL_BN",
      sequence: 8,
      alignment: "left",
      width: 170,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      columnName: "Default Value",
      componentType: "default",
      accessor: "DEFAULT_VALUE",
      sequence: 9,
      alignment: "left",
    },
    {
      columnName: "Text Align",
      componentType: "default",
      accessor: "TEXT_ALIGN",
      sequence: 10,
      alignment: "left",
      width: 100,
      minWidth: 80,
      maxWidth: 130,
    },
    {
      columnName: "Placeholder",
      componentType: "default",
      accessor: "PLACEHOLDER",
      sequence: 11,
      alignment: "left",
    },
    {
      columnName: "Validation Regex",
      componentType: "default",
      accessor: "VALIDATION_REGEX",
      sequence: 12,
      alignment: "left",
    },
    {
      columnName: "Is Beneficiary Field",
      componentType: "default",
      accessor: "IS_BENEFICIARY_FIELD",
      sequence: 13,
      alignment: "left",
    },
    {
      columnName: "Require For Bill Info",
      componentType: "default",
      accessor: "REQUIRE_FOR_BILL_INFO",
      sequence: 14,
      alignment: "left",
    },
    {
      columnName: "Display Sequence",
      componentType: "default",
      accessor: "DISPLAY_ORDER",
      sequence: 15,
      alignment: "left",
    },
    {
      columnName: "Is payable Amount",
      componentType: "default",
      accessor: "IS_PAYABLE_AMT",
      sequence: 15,
      alignment: "left",
    },
    {
      columnName: "Is Bill Number",
      componentType: "default",
      accessor: "IS_BILL_NUMBER",
      sequence: 15,
      alignment: "left",
    },
    {
      columnName: "Is From Account Field",
      componentType: "default",
      accessor: "IS_FROMACCOUNT_FIELD",
      sequence: 16,
      alignment: "left",
    },
    {
      columnName: "Is Readonly Field",
      componentType: "default",
      accessor: "IS_READONLY_FIELD",
      sequence: 17,
      alignment: "left",
    },
  ],
};
