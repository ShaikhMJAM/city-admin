import { MetaDataType } from "components/dynamicForm";
import { isValid } from "date-fns/esm";

export const MarqueeMessageDetailsMetaData: MetaDataType = {
  form: {
    name: "Marquee Message",
    label: "Marquee Text Configuration",
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
      name: "CHANNEL",
      label: "Channel",
      placeholder: "Select",
      defaultOptionLabel: "Channel",
      options: [
        { label: "Internet Banking", value: "I" },
        { label: "Mobile Banking", value: "M" },
      ],
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Enter Channel is required."] },
          { name: "CHANNEL", params: ["Please Enter Channel."] },
        ],
      },
      GridProps: { xs: 12, md: 4, sm: 4 },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "datetimePicker",
      },
      name: "VALID_FROM_DT",
      label: "Effective From",
      placeholder: "Enter Effective From",
      format: "dd/MM/yyyy HH:mm:ss",
      defaultValue: new Date(),
      GridProps: { xs: 12, md: 4, sm: 4 },
      __EDIT__: { GridProps: { xs: 12, md: 3, sm: 3 } },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Effective From is required"] }],
      },
      validate: (value) => {
        if (Boolean(value?.value) && !isValid(value?.value)) {
          return "Must be a valid date";
        }

        return "";
      },

      // dependentFields: ["VALID_TO_DT"],
      // runValidationOnDependentFieldsChange: true,
      // validate: {
      //   conditions: {
      //     all: [
      //       {
      //         fact: "dependentFields",
      //         path: "$.VALID_TO_DT.value",
      //         operator: "greaterThanInclusiveDate",
      //         value: { fact: "currentField", path: "$.value" },
      //       },
      //     ],
      //   },
      //   success: "",
      //   failure: "Effective From should be less than or equal Effective To.",
      // },
    },
    {
      render: {
        componentType: "datetimePicker",
      },
      name: "VALID_TO_DT",
      label: "Effective To",
      placeholder: "Enter Effective To",
      format: "dd/MM/yyyy HH:mm:ss",
      defaultValue: new Date(),
      GridProps: { xs: 12, md: 4, sm: 4 },
      __EDIT__: { GridProps: { xs: 12, md: 3, sm: 3 } },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Effective To is required"] }],
      },
      dependentFields: ["VALID_FROM_DT"],
      runValidationOnDependentFieldsChange: true,
      validate: (currentField, dependentFields) => {
        if (Boolean(currentField?.value) && !isValid(currentField?.value)) {
          return "Must be a valid date";
        }
        if (
          new Date(dependentFields?.VALID_FROM_DT?.value) >
          new Date(currentField?.value)
        ) {
          return "Effective To should be greater than or equal to Effective From.";
        }
        return "";
      },
      // validate: {
      //   conditions: {
      //     all: [
      //       {
      //         fact: "dependentFields",
      //         path: "$.VALID_FROM_DT.value",
      //         operator: "lessThanInclusiveDate",
      //         value: { fact: "currentField", path: "$.value" },
      //       },
      //     ],
      //   },
      //   success: "",
      //   failure:
      //     "Effective To should be greater than or equal to Effective From.",
      // },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "STATUS",
      label: "Active",
      // defaultValue: true,
      __EDIT__: { render: { componentType: "checkbox" } },
      GridProps: { xs: 12, md: 2, sm: 2 },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MSG_ALERT",
      label: "Marquee Text (English)",
      placeholder: "Enter Marquee Text (English)",
      required: true,
      multiline: true,
      minRows: 10,
      maxRows: 10,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Enter Marquee Text (English) is required."],
          },
          {
            name: "MSG_ALERT",
            params: ["Please Enter Marquee Text (English)."],
          },
        ],
      },
      GridProps: { xs: 12, md: 12, sm: 12 },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MSG_ALERT_BN",
      label: "Marquee Text (Local)",
      placeholder: "Enter Marquee Text (Local)",
      multiline: true,
      minRows: 10,
      maxRows: 10,
      GridProps: { xs: 12, md: 12, sm: 12 },
    },

    {
      render: {
        componentType: "hidden",
      },
      name: "COMP_CD",
    },

    {
      render: {
        componentType: "hidden",
      },
      name: "SR_NO",
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "TRAN_CD",
    },
  ],
};
