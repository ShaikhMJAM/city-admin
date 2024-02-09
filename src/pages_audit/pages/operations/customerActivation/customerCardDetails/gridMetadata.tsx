import { GridMetaDataType } from "components/dataTableStatic";
export const CustomerCardDetailsGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Card Details",
    rowIdColumn: "ACCOUNT_NO",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    hideFooter: true,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "42vh",
      max: "45vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: true,
  },
  filters: [],
  columns: [
    {
      accessor: "id",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 70,
      minWidth: 70,
      maxWidth: 200,
      isAutoSequence: true,
    },
    // {
    //   accessor: "accountCardType",
    //   columnName: "Type",
    //   sequence: 2,
    //   alignment: "left",
    //   componentType: "default",
    //   width: 100,
    //   minWidth: 100,
    //   maxWidth: 200,
    //   isVisible: true,
    // },
    {
      accessor: "ACCOUNT_NO",
      columnName: "Card Number",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 170,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      accessor: "APPCUSTOMER_ID",
      columnName: "Customer ID",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "ACCT_NAME",
      columnName: "Name",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 180,
      maxWidth: 250,
    },
    {
      accessor: "CONSTITUTION",
      columnName: "Constitution",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "PRODUCT_CODE",
      columnName: "Product Code",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "ACCT_TYPE_NM",
      columnName: "Account Type Name",
      sequence: 8,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
      // color: (value) => {
      //   if ((value || "unlock").toLowerCase() === "unlock") {
      //     return "green";
      //   }
      //   return "red";
      // },
    },
    {
      accessor: "CARD_PRODUCT_BIN",
      columnName: "Card Product Bin",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "BIRTH_DATE",
      columnName: "Birth Date",
      sequence: 10,
      alignment: "left",
      componentType: "date",
      dateFormat: "dd/MM/yyyy",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "GENDER",
      columnName: "Gender",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "FATHER_NAME",
      columnName: "Father Name",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "MOTHER_NAME",
      columnName: "Mother Name",
      sequence: 13,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "LINKED_ACCOUNT",
      columnName: "Linked Account",
      sequence: 14,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    // {
    //   accessor: "fullName",
    //   columnName: "Full Name",
    //   sequence: 15,
    //   alignment: "left",
    //   componentType: "default",
    //   width: 150,
    //   minWidth: 100,
    //   maxWidth: 400,
    // },
    {
      accessor: "TIN_NUMBER",
      columnName: "TIN Number",
      sequence: 16,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "NATIONAL_ID13DIGIT",
      columnName: "National ID 13 Digit",
      sequence: 0,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
      isVisible: false,
    },
    {
      accessor: "MODE_OF_OPERATION",
      columnName: "Mode Of Operation",
      sequence: 0,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
      isVisible: false,
    },
    {
      accessor: "NATIONALITY",
      columnName: "Nationality",
      sequence: 17,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "NATIONAL_ID",
      columnName: "National ID",
      sequence: 18,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "IDENTIFICATION_NO",
      columnName: "Identification Number",
      sequence: 19,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile Number",
      sequence: 20,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "E-Mail ID",
      sequence: 21,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
  ],
};
