import { isValid } from "date-fns/esm";

export const SmsEmailRetrievalMetadata = {
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
      name: "A_FROM_DT",
      label: "From Date",
      placeholder: "",
      defaultValue: new Date(),
      fullWidth: true,
      format: "dd/MM/yyyy",
      // __EDIT__: { isReadOnly: true },
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
        rules: [{ name: "required", params: ["From Date is required."] }],
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
        componentType: "datePicker",
      },
      name: "A_TO_DT",
      label: "To Date",
      placeholder: "",
      defaultValue: new Date(),
      fullWidth: true,
      format: "dd/MM/yyyy",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["To Date is required."] }],
      },
      validate: (currentField, dependentField) => {
        if (Boolean(currentField?.value) && !isValid(currentField?.value)) {
          return "Must be a valid date";
        }
        if (
          new Date(currentField?.value) <
          new Date(dependentField?.A_FROM_DT?.value)
        ) {
          return "To Date should be greater than or equal to From Date.";
        }
        return "";
      },
      onFocus: (date) => {
        date.target.select();
      },
      dependentFields: ["A_FROM_DT"],
      runValidationOnDependentFieldsChange: true,
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
      name: "A_STATUS",
      label: "Status",
      fullWidth: true,
      placeholder: "",
      defaultOptionLabel: "Select Status",
      type: "text",
      defaultValue: "ALL",
      options: [
        { label: "ALL", value: "ALL" },
        { label: "PENDING", value: "P" },
        { label: "SUCCCESS", value: "Y" },
        { label: "REJECTED", value: "R" },
      ],
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
      name: "A_FLAG",
      label: "OTP Type",
      defaultValue: "S",
      defaultOptionLabel: "Select OTP Type",
      options: [
        { label: "SMS", value: "S" },
        { label: "EMAIL", value: "E" },
      ],
      fullWidth: true,
      placeholder: "",
      type: "text",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "MOBILE_NO",
      label: "Mobile Number",
      fullWidth: true,
      autoComplete: "off",
      placeholder: "Enter Mobile Number",
      type: "text",
      dependentFields: ["A_FLAG"],
      maxLength: 13,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 13) {
            return false;
          }
          return true;
        },
      },
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.A_FLAG?.value === "S") {
          return false;
        } else {
          return true;
        }
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "EMAIL_ID",
      label: "Email ID",
      fullWidth: true,
      placeholder: "Enter Email ID",
      type: "text",
      maxLength: 300,
      showMaxLength: true,
      dependentFields: ["A_FLAG"],
      autoComplete: "off",
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.A_FLAG?.value === "E") {
          return false;
        } else {
          return true;
        }
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "email", params: ["Email ID is invalid"] }],
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "A_PAGE_NO",
      label: "Page Number",
      fullWidth: true,
      placeholder: "Enter Page Number",
      type: "text",
      defaultValue: 1,
      autoComplete: "off",
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
      name: "A_PAGE_SIZE",
      label: "Page Size",
      fullWidth: true,
      placeholder: "Enter Page Size",
      type: "text",
      defaultValue: 100,
      autoComplete: "off",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
