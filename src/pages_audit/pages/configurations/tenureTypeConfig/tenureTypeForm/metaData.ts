import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GeneralAPI } from "registry/fns/functions";
import { GridMetaDataType } from "components/dataTableStatic";

export const TenureTypeConfigMetadata: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "tenureTypeConfigForm",
      label: "Tenure Type Configuration",
      resetFieldOnUnmount: false,
      validationRun: "onBlur",
      render: {
        ordering: "auto",
        renderType: "simple",
        gridConfig: {
          item: {
            xs: 12,
            sm: 4,
            md: 4,
          },
          container: {
            direction: "row",
            spacing: 1,
          },
        },
      },
    },
    fields: [
      {
        render: { componentType: "select" },
        name: "TRN_TYPE",
        label: "Transaction Type",
        placeholder: "Please select Transaction Type",
        defaultOptionLabel: "Select Transaction Type",
        options: [
          { label: "Fixed Deposit", value: "FD" },
          { label: "Deposit Pension Scheme", value: "DPS" },
        ],
        enableDefaultOption: true,
        _optionsKey: "defualt",
        defaultValue: "FD",
        required: true,
        GridProps: { xs: 12, md: 4, sm: 4 },
        fullWidth: true,
        validate: "getValidateValue",
        autoComplete: "off",
        //@ts-ignore
        isFieldFocused: true,
      },
      {
        render: { componentType: "select" },
        name: "ACCT_TYPE",
        label: "Account Type",
        type: "text",
        fullWidth: true,
        required: true,
        enableDefaultOption: true,
        placeholder: "Please select Account Type",
        defaultOptionLabel: "Select Account Type",
        options: (value) => {
          if (value?.TRN_TYPE?.value?.trim()) {
            return GeneralAPI.GetMiscValue(value?.TRN_TYPE?.value);
          }
          return [];
        },
        _optionsKey: "GetMiscValue",
        dependentFields: ["TRN_TYPE"],
        disableCaching: true,
        GridProps: { xs: 12, md: 4, sm: 4 },
        validate: "getValidateValue",
        autoComplete: "off",
      },

      {
        render: { componentType: "hidden" },
        name: "TRAN_CD",
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "TenureMasterDetails",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      // enablePagination: true,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_CD",
        columnName: "Sr.No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 80,
        maxWidth: 150,
        minWidth: 40,
        isAutoSequence: true,
      },
      {
        accessor: "TENURE_TYPE",
        columnName: "Tenure Type*",
        componentType: "editableSelect",
        defaultOptionLabel: "Select Tenure Type",
        options: [
          { label: "MONTHS", value: "Months" },
          { label: "DAYS", value: "Days" },
        ],
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This is a required field";
          } else {
            let response = "";
            prev?.forEach((item) => {
              if (item.TENURE_TYPE && item.TENURE_TYPE === value) {
                response = "This Value already exists.";
                return;
              }
            });
            return response;
          }
        },

        sequence: 8,
        alignment: "left",
        width: 150,
        maxWidth: 250,
        minWidth: 150,
      },
      {
        columnName: "",
        componentType: "buttonRowCell",
        accessor: "TENURES",
        sequence: 11,
        buttonLabel: "Tenures",
        isVisible: false,
        __EDIT__: { isVisible: true },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 12,
      },
    ],
  },
};

export const TenuresGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: " Numbers",
    rowIdColumn: "LINE_ID",
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
      accessor: "SR.NO",
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
      accessor: "TENURE",
      columnName: "Tenure*",
      sequence: 6,
      alignment: "right",
      componentType: "editableNumberFormat",
      placeholder: "",
      width: 200,
      minWidth: 180,
      maxWidth: 250,
      className: "textInputFromRight",
      isAutoFocus: true,
      FormatProps: {
        thousandSeparator: true,
        thousandsGroupStyle: "",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 6) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      validation: (value, data, prev) => {
        if (!Boolean(value)) {
          return "This is a required field";
        } else {
          let response = "";
          prev?.forEach((item) => {
            if (item.TENURE && item.TENURE === value) {
              response = "This Value already exists.";
              return;
            }
          });
          return response;
        }
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
