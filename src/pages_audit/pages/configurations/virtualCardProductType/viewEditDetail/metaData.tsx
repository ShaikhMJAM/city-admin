import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GeneralAPI } from "registry/fns/functions";

export const vCardProdTypeMasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "addViewEditDetail",
      label: "Virtual Card Product Type Configuration",
      resetFieldOnUnmount: false,
      validationRun: "all",
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
        name: "PRODUCT_TYPE",
        label: "Product Type",
        defaultOptionLabel: "Select Product Type",
        required: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        defaultValue: "DEBIT CARD",
        options: [
          { label: "DEBIT CARD", value: "DEBIT CARD" },
          { label: "PREPAID CARD", value: "PREPAID CARD" },
        ],
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
        runExternalFunction: true,
        isFieldFocused: true,
      },
      {
        render: { componentType: "textField" },
        name: "CARD_PRODUCT_BIN",
        label: "Card Product BIN",
        placeholder: "Enter Card Product BIN",
        required: true,
        maxLength: 20,
        showMaxLength: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "textField" },
        name: "PRODUCT_ID",
        label: "Product ID",
        placeholder: "Enter Product ID",
        required: true,
        maxLength: 50,
        showMaxLength: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "textField" },
        name: "PRODUCT_NAME",
        label: "Product Name",
        placeholder: "Enter Product Name",
        required: true,
        maxLength: 100,
        showMaxLength: true,
        GridProps: { xs: 12, md: 4, sm: 4 },
        fullWidth: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
        __EDIT__: { GridProps: { xs: 12, md: 3, sm: 3 } },
        __VIEW__: { GridProps: { xs: 12, md: 3, sm: 3 } },
      },
      {
        render: { componentType: "textField" },
        name: "IMAGE_ID",
        label: "Image ID",
        placeholder: "Enter Image ID",
        maxLength: 20,
        showMaxLength: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        autoComplete: "off",
        required: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "hidden" },
        name: "ACTIVE",
        label: "Active",
        GridProps: { xs: 12, md: 1, sm: 1 },
        __EDIT__: { render: { componentType: "checkbox" } },
        __VIEW__: { render: { componentType: "checkbox" } },
      },
      {
        render: { componentType: "amountField" },
        name: "CHARGE_AMT",
        label: "Charge Amount",
        defaultValue: 0,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        autoComplete: "off",
      },
      {
        render: { componentType: "Percentage" },
        name: "VAT_PERC",
        label: "VAT Percentage",
        placeholder: "0.00",
        defaultValue: 0,
        maxLength: 3,
        showMaxLength: true,
        GridProps: { xs: 12, md: 1, sm: 1 },
        fullWidth: true,
        autoComplete: "off",
      },
      {
        render: { componentType: "numberFormat" },
        name: "ALLOW_CARD_LIMIT",
        label: "Card Limit",
        placeholder: "Enter Card Limit",
        defaultValue: 0,
        maxLength: 5,
        FormatProps: {
          allowNegative: false,
          isAllowed: (values) => {
            if (values?.value?.length > 5) {
              return false;
            }
            return true;
          },
        },
        showMaxLength: true,
        GridProps: { xs: 12, md: 1, sm: 1 },
        fullWidth: true,
        autoComplete: "off",
        validate: "getValidateValue",
        required: true,
      },
      {
        render: { componentType: "textField" },
        name: "FINANCIAL_PROFILE",
        label: "Financial Profile",
        placeholder: "Enter Financial Profile",
        maxLength: 15,
        showMaxLength: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        autoComplete: "off",
        required: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "select" },
        name: "LIMIT_CURRENCY",
        label: "Limit Currency",
        placeholder: "",
        defaultOptionLabel: "Select Limit Currency",
        GridProps: { xs: 12, md: 1, sm: 1 },
        fullWidth: true,
        disableCaching: true,
        options: () => GeneralAPI.GetMiscValue("LIMIT_CURRENCY"),
        _optionsKey: "GetMiscValue",
        required: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "textField" },
        name: "LIMIT_GROUP",
        label: "Limit Group",
        placeholder: "Enter Limit Group",
        maxLength: 5,
        showMaxLength: true,
        GridProps: { xs: 12, md: 1, sm: 1 },
        fullWidth: true,
        autoComplete: "off",
        required: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "textField" },
        name: "RM_CODE",
        label: "RM Code",
        placeholder: "Enter RM Code",
        maxLength: 20,
        showMaxLength: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
        fullWidth: true,
        autoComplete: "off",
        required: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required."] }],
        },
      },
      {
        render: { componentType: "checkbox" },
        name: "ALLOW_IN_INTRO",
        label: "Allow In Introduction Page",
        defaultValue: true,
        GridProps: { xs: 12, md: 2, sm: 2 },
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
      gridLabel: "Virtual Card Product Type Details",
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
        columnName: "Serial No",
        componentType: "default",
        sequence: 1,
        isVisible: false,
      },
      {
        accessor: "id",
        columnName: "Serial No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 100,
        maxWidth: 150,
        minWidth: 70,
        isAutoSequence: true,
      },
      {
        accessor: "PRODUCT_CODE",
        columnName: "Scheme Code*",
        componentType: "editableTextField",
        autoComplete: "off",
        placeholder: "Enter scheme code",
        sequence: 2,
        width: 200,
        maxWidth: 250,
        minWidth: 120,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
        validation: (value, data, prev) => {
          if (Array.isArray(prev)) {
            if (Array.isArray(prev)) {
              let line = 0;
              const hasDuplicateRow = prev.some((element, index) => {
                line = index + 1;
                return (
                  element.PRODUCT_CODE === value &&
                  element.CONSTITUTION === data.CONSTITUTION
                );
              });

              if (hasDuplicateRow)
                return (
                  "Scheme code and Constitution already exists at line " + line
                );
            }
          }
          return "";
        },
      },
      {
        accessor: "CONSTITUTION",
        columnName: "Constitution*",
        componentType: "editableTextField",
        sequence: 3,
        placeholder: "Enter constitution",
        autoComplete: "off",
        width: 200,
        maxWidth: 300,
        minWidth: 100,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
        validation: (value, data, prev) => {
          let line = 0;
          if (Array.isArray(prev)) {
            const hasDuplicateRow = prev.some((element, index) => {
              line = index + 1;
              return (
                element.PRODUCT_CODE === data.PRODUCT_CODE &&
                element.CONSTITUTION === value
              );
            });

            if (hasDuplicateRow)
              return (
                "Scheme code and Constitution already exists at line " + line
              );
          }
          return "";
        },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 11,
      },
    ],
  },
};
