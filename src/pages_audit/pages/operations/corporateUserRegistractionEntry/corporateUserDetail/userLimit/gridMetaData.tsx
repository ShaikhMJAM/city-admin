import { GridMetaDataType } from "components/dataTableStatic";

export const UserLimitMetaData = {
  form: {
    name: "userLimit",
    label: "User Limit",
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
      render: { componentType: "checkbox" },
      name: "VIEW_ONLY",
      label: "View Only",
      GridProps: { xs: 6, md: 6, sm: 6 },
    },
    {
      render: { componentType: "checkbox" },
      name: "MAKER",
      label: "Maker",
      GridProps: { xs: 6, md: 6, sm: 6 },
    },
    {
      render: { componentType: "textField" },
      name: "MAKER_PER_DAY_LIMIT",
      label: "Per Day Limit",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["MAKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["MAKER"]?.value === "boolean" &&
          Boolean(dependent["MAKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
    {
      render: { componentType: "textField" },
      name: "MAKER_FORM_AMOUNT",
      label: "From Amount",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["MAKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["MAKER"]?.value === "boolean" &&
          Boolean(dependent["MAKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
    {
      render: { componentType: "textField" },
      name: "MAKER_TO_AMOUNT",
      label: "To Amount",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["MAKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["MAKER"]?.value === "boolean" &&
          Boolean(dependent["MAKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
    {
      render: { componentType: "checkbox" },
      name: "CHECKER",
      defaultValue: true,
      label: "Checker",
      GridProps: { xs: 6, md: 6, sm: 6 },
    },
    {
      render: { componentType: "checkbox" },
      name: "SPECIAL_AUTH",
      label: "Special Authorized",
      GridProps: { xs: 6, md: 6, sm: 6 },
    },

    {
      render: { componentType: "textField" },
      name: "CHECKER_PER_DAY_LIMIT",
      label: "Per Day Limit",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["CHECKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["CHECKER"]?.value === "boolean" &&
          Boolean(dependent["CHECKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
    {
      render: { componentType: "textField" },
      name: "CHECKER_FORM_AMOUNT",
      label: "From Amount",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["CHECKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["CHECKER"]?.value === "boolean" &&
          Boolean(dependent["CHECKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
    {
      render: { componentType: "textField" },
      name: "CHECKER_TO_AMOUNT",
      label: "To Amount",
      placeholder: " ",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      autoComplete: "off",
      dependentFields: ["CHECKER"],
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["CHECKER"]?.value === "boolean" &&
          Boolean(dependent["CHECKER"]?.value)
        ) {
          return false;
        }
        return true;
      },
    },
  ],
};
