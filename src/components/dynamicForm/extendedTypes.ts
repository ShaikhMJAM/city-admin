import { ExtendedFieldMetaDataTypeOptional } from "./types";
import sub from "date-fns/sub";

export const extendedMetaData: ExtendedFieldMetaDataTypeOptional = {
  currency: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "",
      thousandsGroupStyle: "lakh",
      allowNegative: true,
      allowLeadingZeros: false,
      decimalScale: 2,
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
    StartAdornment: "৳",
    enableNumWords: true,
    maxLength: 10,
  },
  currencyWithoutWords: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 2,
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
    StartAdornment: "৳",
    enableNumWords: false,
    maxLength: 10,
  },
  dob: {
    render: {
      componentType: "datePicker",
    },
    //@ts-ignore
    schemaValidation: {
      type: "date",
      rules: [
        { name: "typeError", params: ["Must be a valid date"] },
        {
          name: "max",
          params: [
            sub(new Date(), { years: 18 }),
            "minimum age must be 18 years",
          ],
        },
        {
          name: "min",
          params: [
            sub(new Date(), { years: 100 }),
            "maximum age must be 100 years",
          ],
        },
      ],
    },
  },
  phoneNumber: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Mobile No is required"] },
        { name: "min", params: [11, "Mobile No should be 11 digit."] },
        { name: "max", params: [11, "Mobile No should be 11 digit."] },
      ],
    },
    FormatProps: {
      format: "###########",
      allowNegative: false,
      allowLeadingZeros: true,
      isNumericString: true,
    },
    StartAdornment: "+88",
  },
  panCard: {
    render: {
      componentType: "inputMask",
    },
    fullWidth: true,
    MaskProps: {
      mask: "aaaaa0000a",
      prepare: function (str) {
        return str.toUpperCase();
      },
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["This Field is required"] },
        {
          name: "pancard",
          params: ["Please enter valid Pan Card Number"],
        },
      ],
    },
  },
  panCardOptional: {
    render: {
      componentType: "inputMask",
    },
    MaskProps: {
      mask: "aaaaa0000a",
      prepare: function (str) {
        return str.toUpperCase();
      },
      lazy: true,
    },
  },
  aadharCard: {
    render: {
      componentType: "inputMask",
    },
    fullWidth: true,
    MaskProps: {
      mask: "0000` 0000` 0000",
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["This Field is required"] },
        {
          name: "aadhar",
          params: ["Please enter valid Aadhar Number"],
        },
      ],
    },
  },
  rateOfInt: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      suffix: "%",
      decimalScale: 2,
      fixedDecimalScale: true,
      allowNegative: true,
      allowEmptyFormatting: true,
      isAllowed: (values) => {
        //@ts-ignore
        if (values.floatValue <= 100) {
          return true;
        }
        return false;
      },
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "typeError", params: ["This field is required"] },
        { name: "required", params: ["This field is required"] },
      ],
    },
  },
  MonthlyEmiPayCurrency: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      maxLength: 13,
      isAllowed: (values) => {
        if (values.floatValue === null) {
          return false;
        }
        return true;
      },
    },
    StartAdornment: "৳",
    enableNumWords: true,
  },
  pincode: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Residence Pincode is required"] },
        { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
        { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
      ],
    },
    FormatProps: {
      format: "######",
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
  },
  futureDateNotAllowed: {
    render: {
      componentType: "datePicker",
    },
    //@ts-ignore
    schemaValidation: {
      type: "date",
      rules: [
        { name: "typeError", params: ["Must be a valid date"] },
        {
          name: "max",
          params: [new Date(), "Future Date not allowed."],
        },
      ],
    },
  },
  minAge: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "number",
      rules: [
        { name: "required", params: ["Min Age is required"] },
        { name: "min", params: [25, "Min age should be 25 years"] },
      ],
    },
    FormatProps: {
      format: "##",
    },
  },
  maxAge: {
    render: {
      componentType: "numberFormat",
    },
    schemaValidation: {
      type: "number",
      rules: [
        { name: "required", params: ["Max Age is required"] },
        { name: "max", params: [65, "Max age should be 65 years"] },
      ],
    },
    FormatProps: {
      format: "##",
    },
  },
  rateOfIntWithoutValidation: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      suffix: "%",
      decimalScale: 2,
      fixedDecimalScale: true,
      allowNegative: true,
      allowEmptyFormatting: true,
      isAllowed: (values) => {
        //@ts-ignore
        if (values.floatValue >= 999.99) {
          return false;
        }
        return true;
      },
    },
  },

  rateOfIntUptoThreeDigits: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      suffix: "%",
      decimalScale: 2,
      fixedDecimalScale: true,
      allowNegative: true,
      allowEmptyFormatting: true,
      isAllowed: (values) => {
        //@ts-ignore
        if (values.floatValue < 999.99) {
          return false;
        }
        return true;
      },
    },
  },

  squareFeetFormat: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      isAllowed: (values) => {
        if (values?.value?.length > 20) {
          return false;
        }
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    maxLength: 20,
    showMaxLength: false,
  },
  currencyWithLeadingZeros: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "",
      thousandsGroupStyle: "lakh",
      allowNegative: true,
      allowLeadingZeros: false,
      decimalScale: 2,
      isAllowed: (values) => {
        if (values?.value?.length > 10) {
          return false;
        }
        return true;
      },
    },
    StartAdornment: "৳",
    enableNumWords: true,
    maxLength: 10,
  },
  pincodeNoValidation: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      format: "######",
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
  },
  amountField: {
    render: {
      componentType: "numberFormat",
    },
    className: "textInputFromRight",
    FormatProps: {
      thousandSeparator: true,
      prefix: "",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 2,
      fixedDecimalScale: true,
      placeholder: "00.00",
      isAllowed: (values) => {
        if (values?.value?.length > 15) {
          return false;
        }
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    enableNumWords: false,
    StartAdornment: "৳",
    maxLength: 15,
    showMaxLength: false,
  },
  accountNumber: {
    render: {
      componentType: "textField",
    },
    fullWidth: true,
    inputProps: {
      onChange: function (event) {
        const inputValue = event.target.value;
        const text = inputValue.replace(/[^0-9]/g, "");
        event.target.value = text;
      },
    },
    maxLength: 20,
    showMaxLength: true,
  },
  loginID: {
    render: {
      componentType: "textField",
    },
    fullWidth: true,
    inputProps: {
      onChange: function (event) {
        const inputValue = event.target.value;
        const text = inputValue.replace(/[^a-zA-Z0-9]/g, "");
        event.target.value = text;
      },
    },
    maxLength: 16,
    showMaxLength: true,
  },
  Percentage: {
    render: {
      componentType: "numberFormat",
    },
    className: "textInputFromRight",
    FormatProps: {
      allowNegative: false,
      allowLeadingZeros: true,
      decimalScale: 2,
      isAllowed: (values) => {
        if (values?.value?.length > 5) {
          return false;
        }
        if (parseFloat(values?.value) > 100) {
          return false;
        }
        return true;
      },
    },
    maxLength: 5,
    showMaxLength: true,
    EndAdornment: "%",
  },
};
