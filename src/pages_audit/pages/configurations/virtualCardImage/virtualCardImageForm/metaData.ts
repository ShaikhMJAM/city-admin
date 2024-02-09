export const CardImageEntryMetaData = {
  form: {
    name: "CardImageUpload",
    label: "Virtual Card Image Upload",
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
      label: "Transaction ID",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "IMAGE_ID",
      sequence: 1,
      label: "Image ID",
      placeholder: "Enter Image ID",
      type: "text",
      required: true,
      maxLength: 20,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Image ID is required."] },
          { name: "IMAGE_ID", params: ["Please enter Image ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "CACHE_ID",
      sequence: 2,
      label: "",
      placeholder: "",
      type: "text",
    },
    {
      render: { componentType: "hidden" },
      name: "ACTIVE",
      label: "Active",
      // defaultValue: true,
      isReadOnly: true,
      GridProps: { xs: 12, md: 4, sm: 4 },
      __EDIT__: { isReadOnly: false, render: { componentType: "checkbox" } },
      __VIEW__: { render: { componentType: "checkbox" } },
    },
  ],
};
