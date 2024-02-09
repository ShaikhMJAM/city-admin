import { GeneralAPI } from "registry/fns/functions";
// const GetMiscValue = () => GeneralAPI.GetMiscValue("BEN_RESTRICT");
export const BeneresMasterFormMetadata = {
  form: {
    name: "BeneresForm",
    label: "Beneficiary Restriction Master",
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
      name: "BEN_LABEL",
      label: "Restriction Type",
      placeholder: "",
      defaultOptionLabel: "Select Restriction Type",
      options: () => GeneralAPI.GetMiscValue("BEN_RESTRICT"),
      _optionKey: "benRestric",
      defaultValue: "N",
      fullWidth: true,
      required: true,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Restriction Type is required."] },
          { name: "BEN_LABEL", params: ["Please enter Restriction Type."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    // {
    //   render: {
    //     componentType: "textField",
    //   },
    //   name: "BEN_VALUE",
    //   label: "Value",
    //   placeholder: "Enter Value",
    //   type: "text",
    //   required: true,
    //   maxLength: 300,
    //   showMaxLength: true,
    //   schemaValidation: {
    //     type: "string",
    //     rules: [
    //       { name: "required", params: ["Value is required."] },
    //       { name: "BEN_VALUE", params: ["Please enter Value."] },
    //     ],
    //   },
    //   GridProps: {
    //     xs: 12,
    //     md: 9,
    //     sm: 9,
    //   },
    //   __EDIT__: { isFieldFocused: true },
    // },
    {
      render: {
        componentType: "textField",
      },
      name: "ACCOUNT_NM",
      label: "Account Name",
      fullWidth: true,
      autoComplete: "off",
      placeholder: "Enter Account Name",
      type: "text",
      maxLength: 300,
      showMaxLength: true,
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "N") {
          return false;
        } else {
          return true;
        }
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Account Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Account Name."] },
        ],
      },
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "ACCOUNT_NO",
      label: "Account Number",
      fullWidth: true,
      autoComplete: "off",
      placeholder: "Enter Account Number",
      type: "text",
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "A") {
          return false;
        } else {
          return true;
        }
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Account Number is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Account Number."] },
        ],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "EMAIL_ID",
      label: "Email ID",
      fullWidth: true,
      autoComplete: "off",
      placeholder: "Enter Email ID",
      type: "text",
      maxLength: 300,
      showMaxLength: true,
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "E") {
          return false;
        } else {
          return true;
        }
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email ID is required"] },
          { name: "email", params: ["Invalid Email ID."] },
        ],
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
      maxLength: 13,
      showMaxLength: true,
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "M") {
          return false;
        } else {
          return true;
        }
      },
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 13) {
            return false;
          }
          // if (values.floatValue === 0) {
          //   return false;
          // }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile Number is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Mobile Number."] },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "PRODUCT_CD",
      label: "Product Code",
      fullWidth: true,
      autoComplete: "off",
      placeholder: "Enter Product Code",
      type: "text",
      maxLength: 10,
      showMaxLength: true,
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "P") {
          return false;
        } else {
          return true;
        }
      },
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 10) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Product Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Product Code."] },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "ROUTING_NO",
      label: "Routing Number",
      fullWidth: true,
      placeholder: "Enter Routing Number",
      type: "text",
      maxLength: 11,
      showMaxLength: true,
      required: true,
      dependentFields: ["BEN_LABEL"],
      shouldExclude(fieldData, dependentFieldsValues, formState) {
        if (dependentFieldsValues?.BEN_LABEL?.value === "R") {
          return false;
        } else {
          return true;
        }
      },
      FormatProps: {
        allowNegative: false,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 11) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Routing Number is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Routing Number."] },
        ],
      },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "TRAN_CD",

      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
  ],
};
