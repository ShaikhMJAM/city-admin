import { MetaDataType } from "components/dynamicForm";

export const MarqueeMessageDetailsMetaData: MetaDataType = {
  form: {
    name: "Marquee Message",
    label: "Service Active/Deactive Configuration",
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
      name: "TRN_TYPE",
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "CONFIG_TYPE",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DESCRIPTION",
      label: "Service Name",
      required: true,
      isReadOnly: true,
      GridProps: { xs: 12, md: 4, sm: 4 },
    },
    {
      render: {
        componentType: "select",
      },
      name: "ACTIVE",
      label: "Status",
      placeholder: "Select",
      defaultOptionLabel: "Select Status",
      options: [
        { label: "Active", value: "Y" },
        { label: "Deactive", value: "N" },
      ],
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Status is required."] },
          { name: "STATUS", params: ["Please Select Status."] },
        ],
      },
      GridProps: { xs: 12, md: 2, sm: 2 },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "select",
      },
      name: "ALLOW_ACCESS_CHANNEL",
      label: "Access Channel",
      placeholder: "Select",
      defaultOptionLabel: "Select Access Channel",
      options: [
        { label: "Web", value: "I" },
        { label: "Mobile", value: "M" },
        { label: "Both", value: "B" },
      ],
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Access Channel is required."] },
          {
            name: "ALLOW_ACCESS_CHANNEL",
            params: ["Please Select Access Channel."],
          },
        ],
      },
      GridProps: { xs: 12, md: 2, sm: 2 },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: { componentType: "checkbox" },
      name: "TRN_USER",
      label: "Card User",
      // defaultValue: true,
      isReadOnly: true,
      GridProps: { xs: 12, md: 2, sm: 2 },
      __EDIT__: { isReadOnly: false },
    },
    {
      render: { componentType: "checkbox" },
      name: "VIEW_USER",
      label: "Non Card User",
      // defaultValue: true,
      isReadOnly: true,
      GridProps: { xs: 12, md: 2, sm: 2 },
      __EDIT__: { isReadOnly: false },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DISPLAY_MSG",
      label: "Message (English)",
      placeholder: "Enter Message (English)",
      maxLength: 1000,
      required: true,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Message (English) is required."],
          },
          {
            name: "MSG_ALERT",
            params: ["Please Enter Message (English)."],
          },
        ],
      },
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DISPLAY_MSG_BN",
      label: "Message (Local)",
      placeholder: "Enter Message (Local)",
      maxLength: 1000,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
  ],
};
