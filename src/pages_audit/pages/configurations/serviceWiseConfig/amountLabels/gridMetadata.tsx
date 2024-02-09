import { GridMetaDataType } from "components/dataTableStatic";
export const AmountLabelsGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Amount Label Mapping",
    rowIdColumn: "SR_CD",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: true,
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
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "AMOUNT",
      columnName: "Amount Label*",
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
        decimalScale: 2,
        fixedDecimalScale: true,
        isAllowed: (values) => {
          if (values?.value?.length > 15) {
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
      validation: (value, data, prev) => {
        if (Array.isArray(prev)) {
          let lb_error = false;
          let ls_msg = "";
          prev.forEach((item, index) => {
            if (value === item?.AMOUNT) {
              lb_error = true;
              ls_msg = "Amount Label is Already entered at Line " + (index + 1);
              return ls_msg;
            }
          });
          if (lb_error) {
            return ls_msg;
          }
        }
        return "";
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
