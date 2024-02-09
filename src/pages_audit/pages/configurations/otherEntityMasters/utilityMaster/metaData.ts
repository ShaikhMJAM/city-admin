import { MetaDataType } from "components/dynamicForm";
import { GetMiscValue } from "../api";

export const UtilMasterMetadata: MetaDataType = {
  form: {
    name: "utilMaster",
    label: "Utility Master",
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
      render: { componentType: "hidden" },
      name: "TRAN_CD",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ENTITY_CD",
      label: "Code",
      placeholder: "Enter Code",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Code is required."] },
          { name: "ENTITY_CD", params: ["Please select Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DESCRIPTION",
      label: "Description",
      placeholder: "Enter Description",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Description is required."] },
          { name: "DESCRIPTION", params: ["Please select Description."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "TO_SOURCE",
      label: "Account Source",
      placeholder: "Please select Parent Type",
      defaultOptionLabel: "Select Account Source",
      options: () => GetMiscValue(),
      _optionsKey: "GetMiscValue-APP_IND_OTH",
      defaultValue: "",
      fullWidth: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "ACCT_CD",
      label: "Account Number",
      placeholder: "Enter Account Number",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Account Number is required."] },
          { name: "ACCT_CD", params: ["Please select Account Number."] },
        ],
      },
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
      name: "TRN_PERTICULERS",
      label: "Transaction Particulars",
      placeholder: "Enter Transaction Particulars",
      type: "text",
      fullWidth: true,
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
      name: "TRN_PERTICULERS2",
      label: "Transaction Particulars2",
      placeholder: "Enter Transaction Particulars2",
      type: "text",
      fullWidth: true,
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
      name: "REMARKS",
      label: "Remark",
      placeholder: "Enter Remark",
      type: "text",
      fullWidth: true,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: { componentType: "hidden" },
      name: "POLICY_LABEL_EN",
      label: "Policy Label(English)",
    },
    {
      render: { componentType: "hidden" },
      name: "POLICY_LABEL_BN",
      label: "Policy Label(English)",
    },
  ],
};
