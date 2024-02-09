import { GeneralAPI } from "registry/fns/functions";

export const WebReroutingFormMetaData = {
  form: {
    name: "WebRerouting",
    label: "Web Rerouting Configuration",
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
        componentType: "select",
      },
      name: "MENU_FLAG",
      label: "Action Menu",
      defaultOptionLabel: "Select Action Menu",
      defaultValue: "E",
      type: "text",
      options: () => GeneralAPI.GetMiscValue("WEB_REROUTING_MENU_FLAG"),
      _optionsKey: "GetMiscValue",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Image ID is required."] },
          { name: "IMAGE_ID", params: ["Please enter Image ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DESCRIPTION",
      label: "Description",
      placeholder: "Enter Discription",
      type: "text",
      maxLength: 100,
      showMaxLength: true,
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Description is required."] },
          { name: "DESCRIPTION", params: ["Please select Description."] },
        ],
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
      name: "LABEL_EN",
      label: "Label (English)",
      placeholder: "Enter English Language Label",
      type: "text",
      maxLength: 50,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Label (English) is required."] },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Label (English)."],
          },
        ],
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
      name: "LABEL_BN",
      label: "Label (Local Language)",
      placeholder: "Enter Local Language Label",
      type: "text",
      maxLength: 50,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Label (Local Language) is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Label (Local Language)."],
          },
        ],
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
      name: "DISPLAY_ORDER",
      label: "Display Order",
      placeholder: "Enter Display Order",
      type: "text",
      required: true,
      className: "textInputFromRight",
      FormatProps: {
        isAllowed: (values) => {
          if (values?.value?.length > 3) {
            return false;
          }
          return true;
        },
      },
      maxLength: 3,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Display Order is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Display Order."],
          },
        ],
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
      name: "URL",
      label: "URL",
      placeholder: "Enter URL",
      type: "text",
      maxLength: 500,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["URL is required."],
          },
          {
            name: "url",
            params: ["Please enter valid URL."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: { componentType: "spacer" },
      name: "ACTIVE",
      label: "Active",
      // defaultValue: true,
      isReadOnly: true,
      GridProps: { xs: 12, md: 6, sm: 6 },
      __EDIT__: { isReadOnly: false, render: { componentType: "checkbox" } },
      __VIEW__: { render: { componentType: "checkbox" } },
    },
    {
      render: { componentType: "checkbox" },
      defaultValue: false,
      name: "POPUP_STATUS",
      label: "Popup Status",
      GridProps: { xs: 12, md: 2, sm: 2 },
      postValidationSetCrossFieldValues: (
        currentField,
        dependentFieldsState,
        formState
      ) => {
        if (!Boolean(currentField?.value)) {
          return {
            POPUP_MSG_EN: { value: "" },
            POPUP_MSG_BN: { value: "" },
          };
        }
      },
    },
    // {
    //   render: { componentType: "spacer" },
    //   GridProps: { xs: 12, md: 4, sm: 4 },
    // },
    {
      render: {
        componentType: "textField",
      },
      name: "POPUP_MSG_EN",
      label: "Popup Message (English)",
      placeholder: "Enter English Language Popup Message",
      type: "text",
      defaultValue: "",
      maxLength: 1000,
      required: true,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      dependentFields: ["POPUP_STATUS"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.POPUP_STATUS?.value) {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Popup Message (English) is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Popup Message (English)."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 5,
        sm: 5,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "POPUP_MSG_BN",
      label: "Popup Message (Local Language)",
      placeholder: "Enter Local Language Popup Message",
      type: "text",
      defaultValue: "",
      maxLength: 1000,
      required: true,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      dependentFields: ["POPUP_STATUS"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.POPUP_STATUS?.value) {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Popup Message (Local Language) is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Popup Message (Local Language)."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 5,
        sm: 5,
      },
    },
    {
      render: { componentType: "checkbox" },
      name: "LOGIN_STATUS",
      label: "Login Status",
      defaultValue: false,
      GridProps: { xs: 12, md: 2, sm: 2 },
      postValidationSetCrossFieldValues: (
        currentField,
        dependentFieldsState,
        formState
      ) => {
        if (!currentField?.value) {
          return {
            API_USER_ID: { value: "" },
            API_PASSWORD: { value: "" },
            SERVICE_CODE: { value: "" },
          };
        }
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "API_USER_ID",
      label: "API User ID",
      placeholder: "Enter API User ID",
      type: "text",
      maxLength: 30,
      required: true,
      dependentFields: ["LOGIN_STATUS"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.LOGIN_STATUS?.value) {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["API User ID is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter API User ID."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "passwordField",
      },
      name: "API_PASSWORD",
      label: "API Password",
      placeholder: "Enter API Password",
      type: "text",
      maxLength: 30,
      fullWidth: true,
      required: true,
      autoComplete: "new-password",
      allowToggleVisiblity: true,
      dependentFields: ["LOGIN_STATUS"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.LOGIN_STATUS?.value) {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["API Password is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter API Password."],
          },
        ],
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
      name: "SERVICE_CODE",
      label: "Service Code",
      placeholder: "Enter Service Code",
      type: "text",
      maxLength: 30,
      required: true,
      dependentFields: ["LOGIN_STATUS"],

      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.LOGIN_STATUS?.value) {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Service Code is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Service Code."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    // {
    //   render: { componentType: "spacer" },
    //   name: "ACTIVE",
    //   label: "Active",
    //   // defaultValue: true,
    //   isReadOnly: true,
    //   GridProps: { xs: 12, md: 4, sm: 4 },
    //   __EDIT__: { isReadOnly: false, render: { componentType: "checkbox" } },
    //   __VIEW__: { render: { componentType: "checkbox" } },
    // },
  ],
};
