import { GridMetaDataType } from "components/dataTableStatic";

export const DailyLimitGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Effective Daily Limit",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [],
  columns: [
    {
      accessor: "_displaySequence",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "EFFECTIVE_DATE",
      columnName: "Effective Date",
      sequence: 6,
      alignment: "right",
      componentType: "editableDatetimePicker",
      placeholder: "0.00",
      width: 200,
      minWidth: 180,
      maxWidth: 250,
      className: "textInputFromRight",
      FormatProps: {
        thousandSeparator: true,
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 14) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
    },
    {
      accessor: "LIMIT_AMT",
      columnName: "Limit Amount",
      sequence: 6,
      alignment: "right",
      componentType: "editableNumberFormat",
      placeholder: "0.00",
      width: 200,
      minWidth: 180,
      maxWidth: 250,
      className: "textInputFromRight",
      FormatProps: {
        thousandSeparator: true,
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 14) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      columnName: "Action",
      componentType: "deleteRowCell",
      accessor: "_hidden",
      sequence: 11,
      width: 120,
      minWidth: 120,
      maxWidth: 120,
    },
  ],
};
