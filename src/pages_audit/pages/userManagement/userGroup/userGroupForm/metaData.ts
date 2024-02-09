export const UserGroupFormMetadata = {
  form: {
    name: "userGroupForm",
    label: "Admin User Group Maintenance",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    submitAction: "home",

    render: {
      ordering: "sequence",
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
      name: "USER_NAME",
      sequence: 1,
      label: "User Name",
      placeholder: "Enter User Group Name",
      type: "text",
      defaultValue: "1",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "GROUP_NAME",
      sequence: 1,
      label: "User Group Name",
      placeholder: "Enter User Group Name",
      type: "text",
      autoComplete: "off",
      required: true,
      maxLength: 16,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["User Group Name is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "RECENT_DOC_NO",
      sequence: 2,
      autoComplete: "off",
      label: "No. of Screens under Recent Option",
      placeholder: "Enter No. of Screens under Recent Option",
      type: "text",
      required: true,
      maxLength: 5,
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 5 || values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["No. of Screens under Recent Option is required."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "PWD_DAYS",
      sequence: 3,
      autoComplete: "off",
      label: "Login Password Force Expiry Days",
      placeholder: "Enter Login Password Force Expiry Days",
      type: "text",
      required: true,
      maxLength: 5,
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 5 || values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Login Password Force Expiry Days is required."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};
