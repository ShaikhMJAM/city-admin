import { components, filters } from "components/report";

export const virtualCardReqMetaData = {
  title: "Virtual Card Request Report",
  disableGroupBy: "",
  hideFooter: false,
  hideAmountIn: "False",
  retrievalType: "VIRTUALCARD",
  autoFetch: false,
  columns: [
    {
      columnName: "Request Date",
      accessor: "TRAN_DT",
      width: 160,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 140,
      type: "default",
    },
    {
      columnName: "Product Type",
      accessor: "PRODUCT_TYPE",
      width: 140,
    },
    {
      columnName: "Card Product BIN",
      accessor: "CARD_PRODUCT_BIN",
      width: 160,
    },
    {
      columnName: "Card Product Name",
      accessor: "CARD_PRODUCT_NM",
      width: 200,
    },
    {
      columnName: "Client ID",
      accessor: "CLIENT_ID",
      width: 140,
    },
    {
      columnName: "Account Number",
      accessor: "ACCT_CD",
      width: 160,
    },
    {
      columnName: "CB Number",
      accessor: "CBNUMBER",
      width: 140,
    },
    {
      columnName: "Name On Card",
      accessor: "NAME_ON_CARD",
      width: 150,
    },
    {
      columnName: "Charge Amount",
      accessor: "SERVICE_CHARGE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "VAT Amount",
      accessor: "VAT_CHARGE",
      width: 140,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Status",
      accessor: "STATUS",
      width: 140,
    },
    {
      columnName: "Card Number",
      accessor: "CARD_NO",
      width: 150,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 130,
    },
    {
      columnName: "Device OS",
      accessor: "DEVICE_OS",
      width: 150,
    },
    {
      columnName: "Device IP",
      accessor: "DEVICE_IP",
      width: 150,
    },
    {
      columnName: "OTP Type",
      accessor: "OTP_TYPE",
      width: 130,
    },
    {
      columnName: "OTP Mobile Number",
      accessor: "OTP_MOBILE_NO",
      width: 180,
    },
    {
      columnName: "OTP Email ID",
      accessor: "OTP_EMAIL_ID",
      width: 170,
    },
    {
      columnName: "Currency Code",
      accessor: "CURRENCY_CODE",
      width: 150,
    },

    {
      columnName: "NID",
      accessor: "NID",
      width: 170,
    },
    {
      columnName: "TIN",
      accessor: "TIN",
      width: 150,
    },
    {
      columnName: "Smart Card Number",
      accessor: "SMART_CARD_NO",
      width: 160,
    },
    {
      columnName: "Passport Number",
      accessor: "PASSPORT_NO",
      width: 160,
    },
    {
      columnName: "Product ID",
      accessor: "PRODUCT_ID",
      width: 150,
    },
    {
      columnName: "Financial Profile",
      accessor: "FINANCIAL_PROFILE",
      width: 150,
    },
    {
      columnName: "Limit Currency",
      accessor: "LIMIT_CURRENCY",
      width: 150,
    },
    {
      columnName: "Limit Group",
      accessor: "LIMIT_GROUP",
      width: 140,
    },
    {
      columnName: "RM Code",
      accessor: "RM_CODE",
      width: 150,
    },
    {
      columnName: "Correspondence Address",
      accessor: "CORR_ADDRESS",
      width: 250,
    },
    {
      columnName: "Display Message",
      accessor: "DISPLAY_MSG",
      width: 200,
    },
    {
      columnName: "API Response",
      accessor: "API_RESPONSE",
      width: 150,
      Cell: components.ButtonRowCell,
      type: "default",
    },
  ],
};
