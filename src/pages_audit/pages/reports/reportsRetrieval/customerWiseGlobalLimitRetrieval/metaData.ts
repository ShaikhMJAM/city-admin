import { isValid } from "date-fns/esm";

export const CustomerGlobalLimitRetrievalMetadata = {
  form: {
    name: "enterRetrievalParamaters",
    label: "Enter Retrieval Parameters",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 12,
          md: 12,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "datePicker",
      },
      name: "A_TO_DT",
      label: "As on Date",
      placeholder: "",
      defaultValue: new Date(),
      fullWidth: true,
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      onFocus: (date) => {
        date.target.select();
      },
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["As on Date is required."] }],
      },
      validate: (value) => {
        if (Boolean(value?.value) && !isValid(value?.value)) {
          return "Must be a valid date";
        }
        return "";
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "A_FREQUENCY",
      label: "Frequency",
      defaultValue: "D",
      options: [
        { label: "Daily", value: "D" },
        { label: "Weekly", value: "W" },
        { label: "Monthly", value: "M" },
      ],
      fullWidth: true,
      placeholder: "",
      type: "text",
      // validate: "getValidateValue",
      // required: true,
      defaultOptionLabel: "Select Frequency",
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
      name: "A_CUSTOM_USER_NM",
      label: "Login ID",
      fullWidth: true,
      placeholder: "Enter Login ID",
      validate: "getValidateValue",
      required: true,
      type: "text",
      autoComplete: "off",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
