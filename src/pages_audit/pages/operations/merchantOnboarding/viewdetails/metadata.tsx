import { GeneralAPI } from "registry/fns/functions";
export const MerchantOnboardingMetadata = {
  form: {
    name: "merchantOnboarding",
    label: "Merchant Onboarding Configuration",
    resetFieldOnUnmount: false,
    validationRun: "onChange",
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
    },
    {
      render: {
        componentType: "select",
      },
      name: "MERCHANT_ID",
      label: "Merchant ID",
      placeholder: "",
      defaultOptionLabel: "Select Merchant ID",
      type: "text",
      options: () => GeneralAPI.GetPGWMerchantList(),
      _optionsKey: "GetPGWMerchantList",
      __EDIT__: { isReadOnly: true },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          // { name: "MERCHANT_ID", params: ["Please Enter Merchant ID."] },
        ],
      },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "select",
      },
      name: "TERMINAL_ID",
      label: "Terminal ID",
      placeholder: "",
      defaultOptionLabel: "Select Terminal ID",
      type: "text",
      options: () => GeneralAPI.GetPGWMerchantList(),
      _optionsKey: "GetPGWMerchantList",
      __EDIT__: { isReadOnly: true },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          // { name: "TERMINAL_ID", params: ["Please Enter Terminal ID."] },
        ],
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "PID",
      label: "Gateway Username",
      placeholder: "Enter Gateway Username",
      type: "text",
      autoComplete: "off",
      maxLength: 20,
      defaultValue: "",
      __EDIT__: { isReadOnly: true },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          // { name: "PID", params: ["Please Enter Gateway Username."] },
        ],
      },
    },
    {
      render: {
        componentType: "passwordField",
      },
      name: "PID_KEY",
      label: "Gateway Password",
      placeholder: "Enter Gateway Password",
      defaultValue: "",
      type: "password",

      allowToggleVisiblity: true,
      maxLength: 10,
      required: true,
      fullWidth: true,
      autoComplete: "off",

      validate: (currentField, value) => {
        if (!Boolean(currentField?.value)) {
          return "This field is required";
        }
        if (
          currentField?.value !== "00000000" &&
          !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/.test(
            currentField?.value
          )
        ) {
          return "Gateway Password should be alphanumeric and have at least one special character, one lowercase character, one uppercase character without any space in between.";
        }
        return "";
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "PID_DESCRIPTION",
      label: "Description",
      placeholder: "Enter Description",
      autoComplete: "off",
      type: "text",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "amountField",
      },
      name: "TRAN_LIMIT",
      label: "Per Transaction Limit",
      autoComplete: "off",
      placeholder: "Enter Per Transaction Limit",
      type: "text",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          // { name: "TRAN_LIMIT", params: ["Please Enter Per Transaction Limit."] },
        ],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TO_EMAIL",
      label: "Gateway Email",
      autoComplete: "off",
      placeholder: "Enter Gateway Email",
      type: "text",
      required: true,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      maxLength: 300,
      showmaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          { name: "email", params: ["Invalid Mail Gateway Email."] },
        ],
      },
    },
    {
      render: {
        componentType: "Percentage",
      },
      name: "VAT_PER",
      label: "Percentage of VAT",
      autoComplete: "off",
      placeholder: "Enter Percentage of VAT",
      type: "text",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "TO_ACCT_NO",
      label: "To Account Number",
      placeholder: "Enter To Account Number",
      autoComplete: "off",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          // { name: "TO_ACCT_NO", params: ["Please Enter To Account Number."] },
        ],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "URL_PATH",
      label: "URL",
      placeholder: "Enter URL",
      autoComplete: "off",
      type: "text",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      maxLength: 200,
      showmaxLength: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          { name: "url", params: ["Please Enter URL."] },
        ],
      },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "ACTIVE",
      label: "Active",
      __EDIT__: { render: { componentType: "checkbox" } },
      GridProps: { xs: 10, md: 1, sm: 1 },
    },
  ],
};
