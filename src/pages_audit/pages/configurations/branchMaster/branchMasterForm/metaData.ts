import { GetDistrictList } from "./api";
import { isValid } from "date-fns";

export const BranchMasterFormMetadata = {
  form: {
    name: "branchMSTForm",
    label: "Branch Master",
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
        componentType: "textField",
      },
      name: "BRANCH_CD",
      label: "Branch Code",
      placeholder: "Enter Branch Code",
      type: "text",
      isReadOnly: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Branch Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Branch Code."] },
        ],
      },
      GridProps: {
        xl: 1,
        lg: 1,
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "BRANCH_NM",
      label: "Branch Name",
      placeholder: "Enter Branch Name",
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Branch Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Branch Name."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 5,
        sm: 5,
      },
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "BR_OPEN_DT",
      label: "Open Date",
      format: "dd/MM/yyyy",
      placeholder: "dd/mm/yyyy",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
      schemaValidation: {
        type: "date",
        rules: [{ name: "typeError", params: ["Must be a valid date"] }],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "E_MAIL_ID",
      label: "E-Mail",
      placeholder: "Enter E-Mail",
      type: "text",
      required: true,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email ID is required"] },
          { name: "email", params: ["E-Mail is invalid."] },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "CONTACT1",
      label: "Phone(1)",
      placeholder: "Enter Phone(1)",
      type: "text",
      required: true,
      maxLength: 13,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
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
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Phone(1) is required."] },
          { name: "PARA_VALUE", params: ["Please enter Phone(1)."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "CONTACT2",
      label: "Phone(2)",
      placeholder: "Enter Phone(2)",
      type: "text",
      maxLength: 13,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
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
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "LATITUDE",
      label: "Latitude",
      placeholder: "Enter Latitude",
      type: "text",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "LONGITUDE",
      label: "Longitude",
      placeholder: "Enter Longitude",
      type: "text",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ADD1",
      label: "Address",
      placeholder: "Enter Address",
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Address is required."] },
          { name: "PARA_VALUE", params: ["Please enter Address."] },
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
        componentType: "select",
      },
      name: "DIST_CD",
      label: "District",
      placeholder: "Enter District",
      type: "text",
      defaultOptionLabel: "Select District",
      options: () => GetDistrictList(),
      _optionsKey: "GetDistrictList",
      required: true,
      disableCaching: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["District is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "FD_ENABLED",
      label: "FD Allow",
      // defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "DPS_ENABLED",
      label: "DPS Allow",
      // defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "CHQ_BOOK_ENABLED",
      label: "Cheque Book Allow",
      // defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "PAY_ORDER_ENABLED",
      label: "Pay Order Allow",
      // defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "CONTACTPERSON",
      label: "Contact Person/Branch Manager Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "CONTACT_PERSON",
      label: "Contact Person",
      placeholder: "Enter Contact Person",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "MOBILE_NO",
      label: "Mobile Number",
      placeholder: "Enter Mobile Number",
      type: "text",
      maxLength: 13,
      showMaxLength: true,
      StartAdornment: "+88",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 13) {
            return false;
          }
          return true;
        },
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "ACTIVE",
      label: "Active",
      // defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "COMP_CD",
      label: "Company Code",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
  ],
};

export const BranchMasterAddFormMetadata = {
  form: {
    name: "branchMSTForm",
    label: "Branch Master",
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
      name: "BRANCH_CD",
      label: "Branch Code",
      placeholder: "Enter Branch Code",
      type: "text",
      required: true,
      maxLength: 4,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Branch Code is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Branch Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 1,
        sm: 1,
      },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "BRANCH_NM",
      label: "Branch Name",
      placeholder: "Enter Branch Name",
      type: "text",
      required: true,
      maxLength: 100,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Branch Name is required."] },
          { name: "DATATYPE_CD", params: ["Please enter Branch Name."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 5,
        sm: 5,
      },
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "BR_OPEN_DT",
      label: "Open Date",
      format: "dd/MM/yyyy",
      placeholder: "dd/mm/yyyy",
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
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
        componentType: "textField",
      },
      name: "E_MAIL_ID",
      label: "E-Mail",
      placeholder: "Enter E-Mail",
      type: "text",
      maxLength: 200,
      showMaxLength: true,
      // required: true,
      schemaValidation: {
        type: "string",
        rules: [
          // { name: "required", params: ["Email ID is required"] },
          { name: "email", params: ["E-Mail is invalid."] },
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
        componentType: "numberFormat",
      },
      name: "CONTACT1",
      label: "Phone(1)",
      placeholder: "Enter Phone(1)",
      type: "text",
      required: true,
      maxLength: 13,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
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
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Phone(1) is required."] },
          { name: "PARA_VALUE", params: ["Please enter Phone(1)."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "CONTACT2",
      label: "Phone(2)",
      placeholder: "Enter Phone(2)",
      type: "text",
      maxLength: 13,
      showMaxLength: true,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
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
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "LATITUDE",
      label: "Latitude",
      placeholder: "Enter Latitude",
      type: "text",
      maxLength: 100,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "LONGITUDE",
      label: "Longitude",
      placeholder: "Enter Longitude",
      type: "text",
      maxLength: 100,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ADD1",
      label: "Address",
      placeholder: "Enter Address",
      type: "text",
      required: true,
      maxLength: 2000,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Address is required."] },
          { name: "PARA_VALUE", params: ["Please enter Address."] },
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
        componentType: "select",
      },
      name: "DIST_CD",
      label: "District",
      placeholder: "Enter District",
      defaultOptionLabel: "Select District",
      type: "text",
      options: () => GetDistrictList(),
      _optionsKey: "GetDistrictList",
      required: true,
      maxLength: 4,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["District is required."] },
          { name: "PARA_VALUE", params: ["Please enter District."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "FD_ENABLED",
      label: "FD Allow",
      defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "DPS_ENABLED",
      label: "DPS Allow",
      defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "CHQ_BOOK_ENABLED",
      label: "Cheque Book Allow",
      defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "PAY_ORDER_ENABLED",
      label: "Pay Order Allow",
      defaultValue: true,
      GridProps: {
        xs: 12,
        md: 2,
        sm: 2,
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "CONTACTPERSON",
      label: "Contact Person/Branch Manager Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "CONTACT_PERSON",
      label: "Contact Person",
      placeholder: "Enter Contact Person",
      type: "text",
      maxLength: 100,
      showMaxLength: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "MOBILE_NO",
      label: "Mobile Number",
      placeholder: "Enter Mobile Number",
      type: "text",
      maxLength: 13,
      showMaxLength: true,
      StartAdornment: "+88",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 13) {
            return false;
          }
          return true;
        },
      },
    },
  ],
};
