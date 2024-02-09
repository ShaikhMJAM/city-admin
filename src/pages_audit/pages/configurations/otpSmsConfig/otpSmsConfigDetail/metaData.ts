import { MetaDataType } from "components/dynamicForm";

export const OtpSmsConfigMetadata: MetaDataType = {
  form: {
    name: "otpSmsConfigForm",
    label: "Mobile OTP SMS Configuration",
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
      name: "ACTIVITY_TYPE",
      label: "Action Code",
      placeholder: "Enter Action Code",
      type: "text",
      fullWidth: true,
      isReadOnly: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Action Code is required."] },
          { name: "ACTIVITY_TYPE", params: ["Please enter Action Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ACTIVITY_NM",
      label: "Action Description",
      placeholder: "Enter Action Description",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Action Description is required."] },
          { name: "ACTIVITY_NM", params: ["Please enter Action Description."] },
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
      render: { componentType: "checkbox" },
      name: "ACTIVE",
      label: "Active",
      GridProps: { xs: 6, md: 2, sm: 2 },
      // placeholder: "",
      // required: true,
      // maxLength: 8,
      // showMaxLength: false,
      // fullWidth: true,
      // autoComplete: "off",
      // className: "textInputFromRight",
      // FormatProps: {
      //   allowNegative: false,
      //   allowLeadingZeros: true,
      //   decimalScale: 0,
      //   isAllowed: (values) => {
      //     if (values?.value?.length > 4) {
      //       return false;
      //     }
      //     if (values.floatValue === 0) {
      //       return false;
      //     }
      //     return true;
      //   },
      // },
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["This Field is required"] }],
      // },
    },
    // {
    //   render: { componentType: "numberFormat" },
    //   name: "BLOCK_MINUTE",
    //   label: "Minutes Of Block",
    //   placeholder: "",
    //   className: "textInputFromRight",
    //   required: true,
    //   maxLength: 8,
    //   showMaxLength: false,
    //   GridProps: { xs: 6, md: 4, sm: 4 },
    //   fullWidth: true,
    //   autoComplete: "off",
    //   FormatProps: {
    //     allowNegative: false,
    //     allowLeadingZeros: true,
    //     decimalScale: 0,
    //     isAllowed: (values) => {
    //       if (values?.value?.length > 5) {
    //         return false;
    //       }
    //       if (values.floatValue === 0) {
    //         return false;
    //       }
    //       return true;
    //     },
    //   },
    //   schemaValidation: {
    //     type: "string",
    //     rules: [{ name: "required", params: ["This Field is required"] }],
    //   },
    // },
    // {
    //   render: {
    //     componentType: "checkbox",
    //   },
    //   name: "AUTO_RELEASE",
    //   label: "Auto Release",
    //   defaultValue: false,
    //   GridProps: {
    //     xs: 12,
    //     md: 4,
    //     sm: 4,
    //   },
    // },
  ],
};
