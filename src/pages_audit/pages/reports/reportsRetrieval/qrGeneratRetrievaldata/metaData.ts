import { isValid } from "date-fns/esm";
import { GetMiscValue } from "../../api";

export const QrGeneratedRetrievalMetadata = {
  form: {
    name: "enterRetrievalParamaters",
    label: "Enter Retrieval Parameters",
    resetFieldOnUnmount: false,
    validationRun: "all",
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
      // type: "text",
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
        componentType: "loginID",
      },
      name: "A_CUSTOM_USER_NM",
      label: "Login ID",
      fullWidth: true,
      placeholder: "Enter Login ID",
      type: "text",
      validate: "getValidateValue",
      required: true,
      autoComplete: "off",
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
      name: "A_TRN_TYPE",
      label: "Transaction Type",
      defaultValue: "ALL",
      defaultOptionLabel: "Select Transaction Type",
      options: () => GetMiscValue("QR_RPT"),
      _optionsKey: "GetMiscValue",
      fullWidth: true,
      // validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
