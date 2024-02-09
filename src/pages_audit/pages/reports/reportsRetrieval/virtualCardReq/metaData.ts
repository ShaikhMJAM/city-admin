// import { GetMiscValue } from "../../staticReports/api";

import { isValid } from "date-fns/esm";
import { GetMiscValue } from "../../api";

export const VirtualCardReqRetrievalMetadata = {
  form: {
    name: "enterVirtualCardRetrievalPara",
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
        componentType: "radio",
      },
      name: "A_PRODUCT_TYPE",
      label: "Product Type",
      RadioGroupProps: { row: true },
      defaultValue: "BOTH",
      options: [
        {
          label: "Both",
          value: "BOTH",
        },
        { label: "Debit Card", value: "DEBIT CARD" },
        { label: "Prepaid Card", value: "PREPAID CARD" },
      ],
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
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
  ],
};
