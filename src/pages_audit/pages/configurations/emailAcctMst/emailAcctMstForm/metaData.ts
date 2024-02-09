export const EmailAcctMstFormMetadata = {
  form: {
    name: "EmailAcctForm",
    label: "Email Account Setup",
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
      label: "tranCd",
      placeholder: "",
      type: "text",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "CONFIG_NM",
      label: "Sent By Name",
      placeholder: "Enter Sent By Name",
      type: "text",
      maxLength: 100,
      required: true,
      autoComplete: "off",
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Sent By Name is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Sent By Name."],
          },
        ],
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
        componentType: "textField",
      },
      name: "SMTP_SERVER",
      label: "SMTP Server",
      placeholder: "Enter SMTP Server",
      type: "text",
      autoComplete: "off",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["SMTP Server is required."] },
          { name: "DATATYPE_CD", params: ["Please enter SMTP Server."] },
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
        componentType: "numberFormat",
      },
      name: "PORT_NO",
      label: "Port No",
      placeholder: "Enter Port No",
      maxLength: 8,
      type: "text",
      autoComplete: "off",
      required: true,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        isAllowed: (values) => {
          if (values?.value?.length > 8) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Port No. is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Port No."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "USER_NM",
      label: "User Name",
      placeholder: "Enter User Name",
      maxLength: 50,
      type: "text",
      autoComplete: "off",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["User Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter User Name"] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "passwordField",
      },
      name: "PASSWORD",
      label: "Password",
      placeholder: "Enter Password",
      type: "text",
      allowToggleVisiblity: true,
      maxLength: 50,
      required: true,
      fullWidth: true,
      autoComplete: "off",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Password is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Password"] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      validate: (currentField, value) => {
        if (!Boolean(currentField?.value)) {
          return "Password is Required";
        }
        return "";
      },
    },
    {
      render: { componentType: "checkbox" },
      name: "SSL",
      label: "SSL Enabled",
      defaultValue: false,
      GridProps: { xs: 12, md: 3, sm: 3 },
      // __EDIT__: { render: { componentType: "checkbox" } },
    },
    {
      render: { componentType: "checkbox" },
      name: "SPA",
      label: "Secure Password Authentication Enabled",
      defaultValue: false,
      GridProps: { xs: 12, md: 5, sm: 5 },
      // __EDIT__: { render: { componentType: "checkbox" } },
    },
    {
      render: { componentType: "checkbox" },
      name: "SMTP_PASS_AUTH",
      label: "Pass Auth",
      defaultValue: false,
      GridProps: { xs: 12, md: 3, sm: 3 },
      // __EDIT__: { render: { componentType: "checkbox" } },
    },
    {
      render: { componentType: "typography" },
      name: "AAAA",
      label: "Note :- Please ensure your E-Mail Account Enable for SMTP.",
      gridconfig: { xs: 12, sm: 12 },
    },
  ],
};
