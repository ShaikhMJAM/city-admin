export const EmiscMasterFormMetadata = {
  form: {
    name: "EmiscForm",
    label: "Miscellaneous Master",
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
      name: "CATEGORY_CD",
      label: "Category Code",
      placeholder: "Enter Category Code",
      type: "text",
      maxLength: 50,
      required: true,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Category Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Category Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DATA_VALUE",
      label: "Data Value",
      placeholder: "Enter Data Value",
      type: "text",
      required: true,
      maxLength: 50,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Data Value is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Data Value."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DISPLAY_VALUE",
      label: "Display Value",
      placeholder: "Enter Display Value",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Display Value is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Display Value."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "REMARKS",
      label: "Remark",
      placeholder: "Enter Remark",
      maxLength: 100,
      type: "text",
      required: false,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "spacer",
      },

      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
