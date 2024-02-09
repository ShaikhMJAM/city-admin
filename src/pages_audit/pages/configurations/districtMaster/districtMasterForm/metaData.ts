export const DistMasterFormMetadata = {
  form: {
    name: "distMSTForm",
    label: "District Master",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    submitAction: "home",
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
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
      datetimePicker: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "numberFormat",
      },
      name: "NEW_DIST_CD",
      label: "District Code",
      placeholder: "Enter District Code",
      type: "text",
      maxLength: 4,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["District Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter District Code."] },
        ],
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 4) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DIST_NM",
      label: "District Name",
      placeholder: "Enter District Name",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: false,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["District Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter District Name."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "DIVISION_CD",
      label: "Division Code",
      placeholder: "Enter Division Code",
      maxLength: 4,
      type: "text",
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 4) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DIVISION_NM",
      label: "Division Name",
      placeholder: "Enter Division Name",
      type: "text",
      maxLength: 100,
      showMaxLength: false,
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "GEOCODE",
      label: "Geo Code",
      placeholder: "Enter Geo Code",
      maxLength: 4,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 4) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "DIST_CD",
      label: "Dist.CD.",
      placeholder: "Enter Dist.CD.",
      type: "text",
      maxLength: 4,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["New District Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter New District Code."] },
        ],
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 4) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false },
    },
  ],
};
