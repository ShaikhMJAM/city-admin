export const CardBinImageEntryMetaData = {
  form: {
    name: "CardBinImage",
    label: "Card Bin Image Upload",
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
      name: "CARD_BIN",
      sequence: 1,
      label: "Card Bin Number",
      placeholder: "Enter Card Bin Number",
      type: "text",
      required: true,
      maxLength: 20,
      showMaxLength: true,
      autoComplete: "off",
      isFieldFocused: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Card Bin Number is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Card Bin Number."] },
        ],
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 20) {
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
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "IS_BANGLA_QR",
      label: "Allow Bangla QR",
      GridProps: { xs: 12, md: 6, sm: 6 },
    },
  ],
};
