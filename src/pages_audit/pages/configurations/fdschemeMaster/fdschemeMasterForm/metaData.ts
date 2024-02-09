export const FdschemeMasterFormMetadata = {
  form: {
    name: "FdschemeForm",
    label: "FD Scheme Configuration",
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
        componentType: "hidden",
      },
      name: "TRAN_CD",
      label: "Transaction Code",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "NATURE_OF_ACCOUNT",
      label: "Nature of Account",
      placeholder: "Enter the Nature of Account",
      type: "text",
      maxLength: 20,
      required: true,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Nature of Account is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Nature of Account."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "FDR_ACCT_TYPE",
      label: "Fd Account Type",
      placeholder: "Enter the Fd Account Type",
      type: "text",
      required: true,
      maxLength: 20,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Fd Account Type is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Fd Account Type."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "SCHEME_CODE",
      label: "Scheme Code",
      placeholder: "Enter the Scheme Code",
      type: "text",
      required: true,
      maxLength: 10,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Scheme Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Scheme Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },

    {
      render: {
        componentType: "select",
      },
      name: "TENOR_TYPE_FINACLE",
      label: "Tenure Type Finacle",
      placeholder: "Enter the Tenure Type Finacle",
      defaultOptionLabel: "Select Tenure Type Finacle",
      type: "text",
      required: true,
      maxLength: 20,
      showMaxLength: true,
      options: [
        { label: "Days", value: "Days" },
        { label: "Months", value: "Months" },
      ],
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Tenure Type Finacle is required."] },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Tenure Type Finacle."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "TENOR",
      label: "Tenure",
      placeholder: "Enter the Tenure",
      type: "text",
      required: true,
      maxLength: 10,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Tenure is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Tenure."] },
        ],
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
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
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "select",
      },
      name: "RENEWAL",
      label: "Renewal",
      placeholder: "Enter the Renewal",
      defaultOptionLabel: "Select Renewal",
      type: "text",
      required: true,
      maxLength: 10,
      showMaxLength: true,
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Renewal is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Renewal."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MATURITY_INST",
      label: "Maturity Inst.",
      placeholder: "Enter the Maturity Inst",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Maturity Inst. is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Maturity Inst.."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "SCHEME_DESC",
      label: "Scheme Description",
      placeholder: "Enter the Scheme Description",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Scheme Description is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Scheme Description."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "CURRENCY",
      label: "CCY",
      placeholder: "Enter the CCY",
      type: "text",
      required: true,
      maxLength: 10,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["CCY is required."] },
          { name: "DATATYPE_CD", params: ["Please enter CCY."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TENOR_TYPE_RATE",
      label: "Tenure Type Rate",
      placeholder: "Enter the Tenure Type Rate",
      type: "text",
      // required: true,
      maxLength: 20,
      showMaxLength: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "required", params: ["Tenure Type Rate is required."] },
      //     { name: "DATATYPE_CD", params: ["Please enter Tenure Type Rate."] },
      //   ],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "amountField",
      },
      name: "TD_MOD_AMT",
      label: "TD Mod Amount",
      placeholder: "Enter the TD Mod Amount",
      type: "text",
      // required: true,
      // maxLength: 12,
      // showMaxLength: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "required", params: ["TD Mod Amount is required."] },
      //     { name: "DATATYPE_CD", params: ["Please enter TD Mod Amount."] },
      //   ],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      // __EDIT__: { isFieldFocused: true },
    },
  ],
};
