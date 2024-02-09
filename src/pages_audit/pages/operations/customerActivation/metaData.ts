import { FilterFormMetaType } from "components/formcomponent";

export const CustomerSearchingFilterForm: FilterFormMetaType = {
  gridConfig: {
    dense: true,
    title: "Customer Activation",
    allowColumnHiding: true,
    submitButtonName: "Fetch Details",
  },
  fields: [
    {
      accessor: "DISP_REG_WITH",
      name: "DISP_REG_WITH",
      defaultValue: "A",
      isVisible: true,
      gridconfig: { xs: 6, sm: 3 },
      label: "Activation Using",
      autoComplete: "off",
      placeholder: "Select Option",
      isColumnHidingDisabled: true,
      entertoSubmit: true,
      isRequired: true,
      type: "select",
      optiondata: [
        { label: "Account Number", value: "A" },
        { label: "Card Number", value: "C" },
        { label: "Client ID", value: "I" },
      ],
      validate: (columnValue, allField, flag) => {
        if (!Boolean(columnValue)) {
          return "This field is required.";
        }
        return "";
      },
    },
    {
      accessor: "DISP_REG_ACCT_CARD_NO",
      name: "DISP_REG_ACCT_CARD_NO",
      defaultValue: "",
      isVisible: true,
      gridconfig: { xs: 6, sm: 3 },
      defaultfocus: true,
      label: "Account Number",
      isRequired: true,
      autoComplete: "off",
      placeholder: "Please Enter Account Number",
      isColumnHidingDisabled: true,
      entertoSubmit: true,
      maxLength: 20,
      showMaxLength: true,
      type: "number",
      dependFields: ["DISP_REG_WITH"],
      dependFieldsonchange: (colomnValue, value, name, extraData) => {
        if (value === "I") {
          return {
            label: "Client ID",
            placeholder: "Please Enter Client ID",
            gridconfig: { xs: 6, sm: 2 },
          };
        } else if (value === "C") {
          return {
            label: "Card Number",
            placeholder: "Please Enter Card Number",
            gridconfig: { xs: 6, sm: 3 },
          };
        } else {
          return {
            label: "Account Number",
            placeholder: "Please Enter Account Number",
            gridconfig: { xs: 6, sm: 3 },
          };
        }
      },
    },
    {
      accessor: "REG_WITH",
      name: "REG_WITH",
      label: "Reg. With",
      placeholder: "Mobile Number",
      type: "number",
      isVisible: false,
      gridconfig: { xs: 6, sm: 3 },
    },
    {
      accessor: "REG_ACCT_CARD_NO",
      name: "REG_ACCT_CARD_NO",
      isVisible: false,
      label: "Reg. Account",
      type: "number",
      gridconfig: { xs: 6, sm: 3 },
    },
    {
      accessor: "MASK_ACCT_CARD_NO",
      name: "MASK_ACCT_CARD_NO",
      defaultValue: "",
      isVisible: false,
      isDisabled: true,
      gridconfig: { xs: 6, sm: 3 },
      label: "Card Number",
      autoComplete: "off",
      placeholder: "Card Number",
      isColumnHidingDisabled: true,
      dependFields: ["DISP_REG_WITH"],
      dependFieldsonchange: (colomnValue, value, name, extraData) => {
        if (value === "I") {
          return { isVisible: true };
        } else {
          return {
            isVisible: false,
          };
        }
      },
    },
    {
      accessor: "CUST_NAME",
      name: "CUST_NAME",
      label: "Name",
      placeholder: "Name",
      isDisabled: true,
      gridconfig: { xs: 6, sm: 6 },
      dependFields: ["DISP_REG_WITH"],
      dependFieldsonchange: (colomnValue, value, name, extraData) => {
        if (value === "I") {
          return { gridconfig: { xs: 4, sm: 4 } };
        } else {
          return {
            gridconfig: { xs: 6, sm: 6 },
          };
        }
      },
    },
    {
      accessor: "CUSTOM_USER_NM",
      name: "CUSTOM_USER_NM",
      defaultValue: "",
      isVisible: true,
      gridconfig: { xs: 6, sm: 3 },
      label: "Login ID",
      autoComplete: "off",
      placeholder: "Login ID",
      type: "alphanumeric",
      isColumnHidingDisabled: true,
      maxLength: 16,
      showMaxLength: true,
      validate: (columnValue, allField, flag) => {
        if (flag === "SECOND") {
          if (!Boolean(columnValue)) {
            return "This field is required.";
          }
          // else if (/[~`!@#$%^&*()-+={}:"<>?,._-]/g.test(columnValue)) {
          //   return "Special characters are not allowed.";
          // } else if (/\s/g.test(columnValue)) {
          //   return "Speace are not allowed.";
          // }
        }
        return "";
      },
    },
    {
      accessor: "MOBILE_NO",
      name: "MOBILE_NO",
      label: "Mobile Number",
      placeholder: "Mobile Number",
      type: "number",
      isDisabled: true,
      gridconfig: { xs: 6, sm: 3 },
    },
    {
      accessor: "BIRTH_DT",
      name: "BIRTH_DT",
      label: "Birth Date",
      placeholder: "Birth Date",
      isDisabled: true,
      gridconfig: { xs: 6, sm: 2 },
    },
    {
      accessor: "MAIL_ID",
      name: "MAIL_ID",
      label: "E-Mail Address",
      placeholder: "E-Mail Address",
      isDisabled: true,
      gridconfig: { xs: 6, sm: 4 },
    },

    {
      accessor: "AAAA",
      name: "AAAA",
      label:
        "Note :- After confirmation temporary password will be sent to the registered mobile number.",
      type: "typography",
      gridconfig: { xs: 12, sm: 12 },
    },
  ],
};
