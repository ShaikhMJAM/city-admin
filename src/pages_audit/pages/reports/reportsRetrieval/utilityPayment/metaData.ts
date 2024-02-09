import { isValid } from "date-fns/esm";
import {
  getDynamicBillerList,
  getDynamicbillerSubCategorylist,
} from "../../staticReports/api";
export const utilityRetrievalMetadata = {
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
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
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
      onFocus: (date) => {
        date.target.select();
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
      name: "CATEGORY_ID",
      label: "Category",
      placeholder: "",
      defaultOptionLabel: "Select Category",
      enableDefaultOption: true,
      options: () => getDynamicbillerSubCategorylist(),
      _optionsKey: "getDynamicbillerSubCategorylist",
      defaultValue: "",
      fullWidth: true,
      postValidationSetCrossFieldValues: (currentField) => {
        if (Boolean(currentField?.value)) {
          return {
            SUB_CATEGORY_ID: { value: "" },
          };
        }
      },
      // validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },

    {
      render: { componentType: "select" },
      name: "SUB_CATEGORY_ID",
      label: "Biller Name",
      defaultOptionLabel: "Select Biller Name",
      enableDefaultOption: true,
      fullWidth: true,
      options: (value) => {
        if (value?.CATEGORY_ID?.value) {
          return getDynamicBillerList(value?.CATEGORY_ID?.value);
        }
        return [];
      },
      _optionsKey: "getDynamicBillerList",
      dependentFields: ["CATEGORY_ID"],
      disableCaching: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 6, sm: 6 },
      autoComplete: "off",
    },
    {
      render: {
        componentType: "select",
      },
      name: "A_STATUS",
      label: "Trn Status",
      fullWidth: true,
      placeholder: "",
      defaultOptionLabel: "Select Trn Status",
      type: "text",
      defaultValue: "ALL",
      options: [
        { label: "ALL", value: "ALL" },
        { label: "SUCCCESS", value: "Y" },
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
      name: "USER_NAME",
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
