import { GetMiscValue } from "../api";

export const SourceParentMetaData = {
  form: {
    name: "SourceParentMaster",
    label: "Source Parent Type Master",
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
      label: "TranCD",
      type: "text",
    },
    {
      render: {
        componentType: "select",
      },
      name: "SOURCE",
      label: "Source Name",
      defaultOptionLabel: "Select Source Name",
      type: "text",
      required: true,
      options: () => GetMiscValue(),
      _optionsKey: "GetMiscValue-APP_INDICATOR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Source Name is required."] }],
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "SOURCE_TYPE",
      label: "Source Type",
      placeholder: "Enter Source Type",
      defaultOptionLabel: "Select Source Type",
      type: "text",
      required: true,
      options: [
        { label: "ACCT", value: "ACCT" },
        { label: "CARD", value: "CARD" },
      ],
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Source Type is required."] }],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "PARENT_TYPE",
      label: "Parent Type",
      placeholder: "Enter Parent Type",
      type: "text",
      required: true,
      maxLength: 50,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Parent Type is required."] }],
      },
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
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Description is required."] }],
      },
    },

    // {
    //   render: {
    //     componentType: "select",
    //   },
    //   name: "SINGUP_ALLOW",
    //   label: "SignUp Allow",
    //   defaultOptionLabel: "Select SignUp Allow",
    //   type: "text",
    //   required: true,
    //   options: [
    //     { label: "Allow", value: "Y" },
    //     { label: "Disallow", value: "N" },
    //   ],
    //   GridProps: {
    //     xs: 12,
    //     md: 3,
    //     sm: 3,
    //   },
    // },
    // {
    //   render: {
    //     componentType: "select",
    //   },
    //   name: "BENF_ALLOW",
    //   label: "Beneficiary Allow",
    //   defaultOptionLabel: "Select Beneficiary Allow",
    //   type: "text",
    //   required: true,
    //   options: [
    //     { label: "Allow", value: "Y" },
    //     { label: "Disallow", value: "N" },
    //   ],
    //   GridProps: {
    //     xs: 12,
    //     md: 3,
    //     sm: 3,
    //   },
    // },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "DISPLAY_ORDER",
      label: "Display Order",
      placeholder: "Enter Display Order",
      type: "text",
      maxLength: 3,
      showMaxLength: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Display Order is required."] }],
      },
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 3) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: { componentType: "checkbox" },
      name: "SINGUP_ALLOW",
      label: "SignUp Allow",
      // defaultValue: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "checkbox" },
      name: "BENF_ALLOW",
      label: "Beneficiary Allow",
      // defaultValue: true,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
  ],
};
