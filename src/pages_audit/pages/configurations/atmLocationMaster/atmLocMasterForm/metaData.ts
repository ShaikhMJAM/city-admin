export const AtmLocMasterFormMetadata = {
  form: {
    name: "ATMLocForm",
    label: "ATM Locator Master",
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
        componentType: "textField",
      },
      name: "TERMINAL_ID",
      label: "Terminal ID",
      placeholder: "Enter Terminal ID",
      type: "text",
      maxLength: 20,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Terminal ID is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Terminal ID."] },
        ],
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
      name: "ATM_NM",
      label: "ATM Location",
      placeholder: "Enter ATM Location",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["ATM Location is required."] },
          { name: "DATATYPE_CD", params: ["Please enter ATM Location."] },
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
        componentType: "textField",
      },
      name: "ADD1",
      label: "Address 1",
      placeholder: "Enter Address 1",
      maxLength: 100,
      type: "text",
      required: true,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Address 1 is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Address 1."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ADD2",
      label: "Address 2",
      placeholder: "Enter Address 2",
      type: "text",
      required: false,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ADD3",
      label: "Address 3",
      placeholder: "Enter Address 3",
      type: "text",
      required: false,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DIST_CD",
      label: "District Code",
      placeholder: "Enter District Code",
      maxLength: 4,
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["District Code is required"] }],
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
      name: "POSTAL_CODE",
      label: "Postal Code",
      placeholder: "Enter Postal Code",
      type: "text",
      maxLength: 10,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      FormatProps: {
        thousandSeparator: false,
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 10) {
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
      render: {
        componentType: "numberFormat",
      },
      name: "LATITUDE",
      label: "Latitude",
      placeholder: "Enter Latitude",
      type: "text",
      maxLength: 15,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Latitude is required"] }],
      },
      // validate: (currentField, value) => {
      //   if (/\s/.test(currentField?.value)) {
      //     return "Spaces are not allowed in the Latitude field.";
      //   }
      //   return "";
      // },
      FormatProps: {
        thousandSeparator: false,
        allowNegative: true,
        allowLeadingZeros: false,
        decimalScale: 10,
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
      name: "LONGITUDE",
      label: "Longitude",
      placeholder: "Enter Longitude",
      type: "text",
      maxLength: 15,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Longitude is required"] }],
      },
      // validate: (currentField, value) => {
      //   if (/\s/.test(currentField?.value)) {
      //     return "Spaces are not allowed in the Longitude field.";
      //   }
      //   return "";
      // },
      FormatProps: {
        thousandSeparator: false,
        allowNegative: true,
        allowLeadingZeros: false,
        decimalScale: 10,
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
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "ACTIVE",
      label: "Active",
      // defaultValue: true,
      __EDIT__: { render: { componentType: "checkbox" } },
      GridProps: { xs: 10, md: 2, sm: 2 },
    },
  ],
};
