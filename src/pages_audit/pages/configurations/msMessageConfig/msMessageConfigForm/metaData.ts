export const MsMessageConfigMetadata = {
  form: {
    name: "MsMessageConfig",
    label: "MS Service Message Configuration",
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
      name: "KEY_NM",
      label: "Key Name",
      placeholder: "Enter Key Name",
      fullWidth: true,
      required: true,
      maxLength: 150,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Key Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Key Name."] },
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
      name: "DESCRIPTION",
      label: "Description",
      placeholder: "Enter Description",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Description is required."] }],
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
      name: "MESSAGE_EN",
      label: "Default Message",
      placeholder: "Enter Default Message",
      type: "text",
      required: true,
      multiline: true,
      minRows: 6,
      maxRows: 6,
      maxLength: 4000,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Default Message is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Default Message."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MESSAGE_BN",
      label: "Local Language Message",
      placeholder: "Enter Local Language Message",
      type: "text",
      required: false,
      multiline: true,
      minRows: 6,
      maxRows: 6,
      maxLength: 4000,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    // {
    //   render: {
    //     componentType: "numberFormat",
    //   },
    //   name: "ORDER_BY",
    //   label: "Order By",
    //   placeholder: "",
    //   type: "text",
    //   required: false,
    //   maxLength: 100,
    //   showMaxLength: true,

    //   GridProps: {
    //     xs: 12,
    //     md: 12,
    //     sm: 12,
    //   },
    // },
    // {
    //   render: {
    //     componentType: "textField",
    //   },
    //   name: "COMMENTS",
    //   label: "Comments",
    //   placeholder: "",
    //   type: "text",
    //   multiline: true,
    //   required: false,
    //   maxLength: 2000,
    //   showMaxLength: true,
    //   GridProps: {
    //     xs: 12,
    //     md: 12,
    //     sm: 12,
    //   },
    // },
  ],
};
