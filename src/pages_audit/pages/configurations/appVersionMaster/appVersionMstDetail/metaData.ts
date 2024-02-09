import { MetaDataType } from "components/dynamicForm";
import { GetMiscValue } from "../api";

export const AppVersionMasterMetadata: MetaDataType = {
  form: {
    name: "appVersionMaster",
    label: "Application Version Master",
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
        componentType: "select",
      },
      name: "DEVICE_OS",
      label: "Device O.S.",
      defaultOptionLabel: "Select Device O.S.",
      options: () => GetMiscValue(),
      _optionsKey: "GetMiscValue-DEVICE_OS",
      defaultValue: "",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Device O.S. is required."] },
          { name: "DEVICE_OS", params: ["Please select Device O.S."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isReadOnly: true },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "VERSION_NO",
      label: "Version",
      placeholder: "Enter Version",
      type: "text",
      fullWidth: true,
      required: true,
      maxLength: 30,
      showMaxLength: true,
      validate: (currentField, value) => {
        if (!Boolean(currentField?.value)) {
          return "Version is Required";
        } else if (/^[ ]/.test(currentField?.value)) {
          return "Space at the beginning is not allowed.";
        } else if (/[~`!@#$%^&*()-+={}:"<>?,_]/g.test(currentField?.value)) {
          return "Enter a proper Version.";
        } else if (!/^\d+(\.\d+)+$/.test(currentField?.value)) {
          return "Enter a proper Version.";
        }
        return "";
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isReadOnly: true },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "IS_POPUP",
      label: "Popup Message",
      defaultValue: false,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      __EDIT__: { render: { componentType: "checkbox" } },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "IS_FORCE_UPDATE",
      label: "Force Update",
      defaultValue: false,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      __EDIT__: { render: { componentType: "checkbox" } },
    },
  ],
};
