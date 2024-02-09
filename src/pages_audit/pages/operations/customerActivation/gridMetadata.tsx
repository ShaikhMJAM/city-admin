import { GridMetaDataType } from "components/dataTableStatic";
export const CustomerSearchingGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Customer Searching",
    rowIdColumn: "id",
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
      min: "38vh",
      max: "38vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
  },
  filters: [],
  columns: [
    {
      accessor: "sr_no",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 70,
      minWidth: 70,
      maxWidth: 200,
      isAutoSequence: true,
    },
    {
      accessor: "accountCardType",
      columnName: "Type",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      isVisible: true,
    },
    {
      accessor: "maskAcctCardNo",
      columnName: "Account/Card Number",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 170,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      accessor: "customerId",
      columnName: "Customer ID",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "accountNameOrNameOnCard",
      columnName: "Name",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 180,
      maxWidth: 250,
    },
    {
      accessor: "constitution",
      columnName: "Constitution",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "productCode",
      columnName: "Product Code",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "productName",
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
      accessor: "cardProductBin",
      columnName: "Card Product Bin",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "dob",
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
      accessor: "_NEW_gender",
      columnName: "Gender",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "fathersName",
      columnName: "Father Name",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "mothersName",
      columnName: "Mother Name",
      sequence: 13,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "linkedAccount",
      columnName: "Linked Account",
      sequence: 14,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "fullName",
      columnName: "Full Name",
      sequence: 15,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "tinNumber",
      columnName: "TIN Number",
      sequence: 16,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "nationalId13Digit",
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
      accessor: "modeOfOperation",
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
      accessor: "nationality",
      columnName: "Nationality",
      sequence: 17,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "nationalId",
      columnName: "National ID",
      sequence: 18,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "identificationNo",
      columnName: "Identification Number",
      sequence: 19,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "phone",
      columnName: "Mobile Number",
      sequence: 20,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 400,
    },
    {
      accessor: "email",
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
