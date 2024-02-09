import { GetMiscValue } from "../api";

export const PageContentEditMetadata = {
  form: {
    name: "screenNote",
    label: "Page Content Configuration",
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
      name: "LANGUAGE_CD",
      label: "Language ID",
      placeholder: "Enter Language ID",
      type: "text",
      options: [
        { label: "Bangla", value: "bn" },
        { label: "English", value: "en" },
      ],
      isReadOnly: true,
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
      name: "CATEGORY_CD",
      label: "Category Code",
      placeholder: "Enter Category Code",
      type: "text",
      isReadOnly: true,
      required: true,
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
      name: "DETAIL_ID",
      label: "Detail ID",
      placeholder: "Enter Detail ID",
      type: "text",
      isReadOnly: true,
      required: true,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "CHANNEL",
      label: "Channel",
      placeholder: "",
      type: "text",
      defaultOptionLabel: "Select Channel",
      options: () => GetMiscValue(),
      _optionsKey: "GetMiscValue-CHANNEL",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Channel is required."] },
          { name: "CHANNEL", params: ["Please enter Channel."] },
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
      name: "DETAIL_DATA",
      label: "Detail Data",
      placeholder: "Enter Detail Data",
      required: true,
      multiline: true,
      minRows: 10,
      maxRows: 10,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Enter Detail Data is required."],
          },
          {
            name: "DETAIL_DATA",
            params: ["Please Enter Detail Data."],
          },
        ],
      },
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
  ],
};
