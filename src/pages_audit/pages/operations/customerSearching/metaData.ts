import { FilterFormMetaType } from "components/formcomponent";

export const CustomerSearchingFilterForm: FilterFormMetaType = {
  gridConfig: {
    dense: true,
    title: "Customer Searching",
    allowColumnHiding: true,
    submitButtonName: "Get Details",
  },
  fields: [
    {
      name: "CUSTOM_USER_NM",
      defaultValue: "",
      isVisible: true,
      gridconfig: { xs: 6, sm: 3 },
      defaultfocus: true,
      label: "Login ID",
      autoComplete: "off",
      placeholder: "Login ID",
      isColumnHidingDisabled: true,
      entertoSubmit: true,
      maxLength: 16,
      showMaxLength: true,
      type: "alphanumeric",
      // validate: (currentField, value) => {
      //   if (/[~`!@#$%^&*()-+={}:"<>?,._-]/g.test(currentField)) {
      //     return "Special characters are not allowed.";
      //   } else if (/\s/g.test(currentField)) {
      //     return "Speace are not allowed.";
      //   }
      //   return "";
      // },
    },
    {
      name: "REG_CARD_ACCT_NO",
      label: "Account/Card Number",
      placeholder: "Account/Card Number",
      type: "number",
      maxLength: 20,
      showMaxLength: true,
    },
    {
      name: "PRIMARY_CBNUMBER",
      label: "Client ID/CB Number",
      placeholder: "Client ID/CB Number",
      maxLength: 20,
      showMaxLength: true,
      type: "alphanumeric",
      // validate: (currentField, value) => {
      //   if (/[~`!@#$%^&*()-+={}:"<>?,._-]/g.test(currentField)) {
      //     return "Special characters are not allowed.";
      //   } else if (/\s/g.test(currentField)) {
      //     return "Speace are not allowed.";
      //   }
      //   return "";
      // },
    },
    {
      name: "MOBILE_NO",
      label: "Mobile No.",
      placeholder: "Mobile Number",
      type: "number",
      maxLength: 13,
      showMaxLength: true,
    },
    {
      name: "NID",
      label: "National ID",
      placeholder: "National ID",
      isVisible: false,
    },
    {
      name: "TIN",
      label: "TIN",
      placeholder: "TIN",
      isVisible: false,
    },
    {
      name: "FATHERS_NAME",
      label: "Father Name",
      placeholder: "Father Name",
      isVisible: false,
    },
    {
      name: "MOTHERS_NAME",
      label: "Mother Name",
      placeholder: "Mother Name",
      isVisible: false,
    },
    {
      name: "CUST_NAME",
      label: "Customer Name",
      placeholder: "Customer Name",
      gridconfig: { xs: 12, sm: 6 },
      isVisible: false,
    },
    {
      name: "MAIL_ID",
      label: "Email ID",
      placeholder: "Email ID",
      gridconfig: { xs: 12, sm: 6 },
      isVisible: false,
      maxLength: 50,
      showMaxLength: true,
      validate: (currentField, value) => {
        if (currentField && !/^[\w\.-]+@[\w\.-]+\.\w+$/.test(currentField)) {
          return "Please enter a valid email address";
        }
        return "";
      },
    },
    {
      accessor: "NOTE",
      name: "NOTE",
      label: "Note :- All Fields contain a wild search facility.",
      type: "typography",
      gridconfig: { xs: 12, sm: 12 },
    },
  ],
};
