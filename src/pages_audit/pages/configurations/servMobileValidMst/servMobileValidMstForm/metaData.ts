import { GeneralAPI } from "registry/fns/functions";

export const ServMobileValidFormMetadata = {
  form: {
    name: "ServMobileValid",
    label: "Service wise Mobile Number Validation Template Mapping",
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
      name: "TRN_TYPE",
      label: "Service Name",
      placeholder: "",
      defaultOptionLabel: "Select Service Name",
      options: () => GeneralAPI.GetMiscValue("MOB_VALIDATION_SERVICE"),
      _optionsKey: "mobValidService",
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Service Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Service Name."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __NEW__: { isFieldFocused: true },
      // __EDIT__: { isFieldFocused: true },
    },

    {
      render: {
        componentType: "select",
      },
      name: "MOB_TMPLT_TRAN_CD",
      label: "Template Name",
      placeholder: "",
      defaultOptionLabel: "Select Template Name",
      options: () => GeneralAPI.GetMobiletemplList(),
      _optionsKey: "GetMobiletemplList",
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Template Name is required."],
          },
          {
            name: "DATATYPE_CD",
            params: ["Please enter Template Name."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      __EDIT__: { isFieldFocused: true },
    },
  ],
};
