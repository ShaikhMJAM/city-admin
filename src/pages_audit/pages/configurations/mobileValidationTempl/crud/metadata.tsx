import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";

export const MobileValidationConfigDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "editMobileValidationTemplate",
      label: "Mobile Number Validation Template",
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
        render: { componentType: "textField" },
        name: "DESCRIPTION",
        label: "Description",
        placeholder: "Enter Description",
        required: true,
        maxLength: 100,
        showMaxLength: true,
        GridProps: { xs: 12, md: 12, sm: 12 },
        fullWidth: true,
        // validate: "getValidateValue",
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
        autoComplete: "off",
        //@ts-ignore
        isFieldFocused: true,
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
      gridLabel: "MobileValidationDetails",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      enablePagination: false,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_CD",
        columnName: "Sr. No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 70,
        maxWidth: 150,
        minWidth: 60,
        isAutoSequence: true,
      },
      {
        accessor: "MOBILE_NO_LENGTH",
        columnName: "Mobile No. Length*",
        sequence: 2,
        componentType: "editableNumberFormat",
        placeholder: "Enter Mobile No. Length",
        autoComplete: "off",
        width: 140,
        minWidth: 100,
        maxWidth: 200,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
        FormatProps: {
          allowNegative: false,
          decimalScale: 0,
          isAllowed: ({ value, floatValue }) =>
            !(value?.length > 2) && floatValue !== 0,
        },
      },
      {
        accessor: "MOBILE_NO_START",
        columnName: "Mobile No. Start From",
        sequence: 3,
        componentType: "editableNumberFormat",
        placeholder: "Enter Mobile No. Start From",
        autoComplete: "off",
        width: 160,
        minWidth: 150,
        maxWidth: 250,
        // schemaValidation: {
        //   type: "string",
        //   rules: [{ name: "required", params: ["This field is required"] }],
        // },
        FormatProps: {
          allowNegative: false,
          allowLeadingZeros: true,
          decimalScale: 0,
          isAllowed: ({ value, floatValue }) => {
            return !(value?.length > 13);
          },
        },
      },
      {
        accessor: "DESCRIPTION",
        columnName: "Description*",
        sequence: 4,
        componentType: "editableTextField",
        placeholder: "Enter Description",
        autoComplete: "off",
        width: 280,
        minWidth: 150,
        maxWidth: 400,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
      },

      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 12,
        width: 120,
        minWidth: 100,
        maxWidth: 150,
      },
    ],
  },
};
