// import { GetMiscValue } from "../../staticReports/api";
import { isValid } from "date-fns/esm";
import { GetMiscValue } from "../../api";
export const FundTrfRetrievalMetadata = {
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
      required: true,
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
        componentType: "amountField",
      },
      name: "A_FR_AMT",
      label: "From Amount",
      fullWidth: true,
      placeholder: "0.00",
      autoComplete: "off",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "amountField",
      },
      name: "A_TO_AMT",
      label: "To Amount",
      fullWidth: true,
      placeholder: "0.00",
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
      placeholder: "",
      defaultOptionLabel: "Select Transaction Type",
      enableDefaultOption: true,
      options: () => GetMiscValue("FUND_TRAN"),
      _optionsKey: "GetMiscValue",
      defaultValue: "",
      fullWidth: true,
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
      label: "Transaction Status",
      fullWidth: true,
      placeholder: "",
      defaultOptionLabel: "Select Transaction Status",
      type: "text",
      defaultValue: "ALL",
      options: [
        { label: "ALL", value: "ALL" },
        { label: "SUCCESS", value: "Y" },
        { label: "PENDING", value: "P" },
        { label: "FAILED", value: "F" },
        { label: "PROCESSING", value: "S" },
        { label: "AUTHORIZED", value: "A" },
      ],
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
      autoComplete: "off",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
