import { getChargeAllow, GetChargeTemplates } from "../api";

export const DynBillerChargeMetadata = {
  form: {
    name: "billerChargeForm",
    label: "Dynamic Biller Charge Configuration",
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
    // {
    //   render: {
    //     componentType: "typography",
    //   },
    //   name: "BRANCH",
    //   label: "Branch",
    //   GridProps: {
    //     xs: 12,
    //     md: 12,
    //     sm: 12,
    //   },
    // },
    {
      render: {
        componentType: "textField",
      },
      name: "CATEGORY_ID",
      label: "Category ID",
      placeholder: "Enter Category ID",
      type: "text",
      isReadOnly: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Category ID is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Category ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "SUB_CATEGORY_ID",
      label: "Sub Category ID",
      placeholder: "Enter Sub Category ID",
      type: "text",
      isReadOnly: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Sub Category ID is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Sub Category ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "BILLER_ID",
      label: "Biller ID",
      placeholder: "Enter Biller ID",
      type: "text",
      isReadOnly: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Biller ID is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Sub Biller ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: { componentType: "select" },
      name: "CHARGE_ALLOW",
      sequence: 2,
      label: "Charge",
      placeholder: "Enter Charge",
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      //   required: true,
      //   validate: "getValidateValue",
      disableCaching: true,
      options: () => getChargeAllow(),
      _optionsKey: "getChargeAllow",
      isFieldFocused: true,
    },
    {
      render: { componentType: "autocomplete" },
      name: "CHRG_TEMP_TRAN_CD",
      sequence: 2,
      label: "Service Charge Template",
      placeholder: "Select Service Charge Template",
      GridProps: { xs: 12, md: 4, sm: 4 },
      fullWidth: true,
      //   required: true,
      //   validate: "getValidateValue",
      disableCaching: true,
      options: () => GetChargeTemplates(),
      _optionsKey: "GetChargeTemplates",
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "POOL_ACCT_NO",
      label: "Finacle Pool Account",
      placeholder: "Enter Finacle Pool Account",
      type: "text",
      maxLength: 20,
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "required", params: ["Biller ID is required."] },
      //     { name: "DATATYPE_CD", params: ["Please enter Sub Biller ID."] },
      //   ],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "ABABIL_POOL_ACCT_NO",
      label: "Ababil Pool Account",
      placeholder: "Enter Ababil Pool Account",
      type: "text",
      maxLength: 20,
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "required", params: ["Biller ID is required."] },
      //     { name: "DATATYPE_CD", params: ["Please enter Sub Biller ID."] },
      //   ],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MERCHANT_ID",
      label: "Merchant ID",
      placeholder: "Enter Merchant ID",
      type: "text",
      maxLength: 20,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TERMINAL_ID",
      label: "Terminal ID",
      placeholder: "Enter Terminal ID",
      type: "text",
      maxLength: 20,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: { componentType: "formbutton", group: 0 },
      name: "TRAN_PARTICULARS_BTN",
      sequence: 4,
      label: "Transaction Particulars",
      maxLength: 20,
      GridProps: { xs: 12, md: 3, sm: 3 },
      fullWidth: true,
      __VIEW__: { isReadOnly: true },
      __EDIT__: { isReadOnly: false },
    },
  ],
};
