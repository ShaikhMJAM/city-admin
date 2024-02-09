import { GridMetaDataType } from "components/dataTableStatic";

export const OtherUserGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Corporate User Registration Entry",
    rowIdColumn: "CUSTOMER_ID",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "45vh", max: "45vh" },
    pageSizes: [15, 20, 30],
    defaultPageSize: 15,
    allowRowSelection: false,
  },
  filters: [],
  columns: [
    {
      accessor: "SR_NO",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
      isAutoSequence: true,
    },
    {
      accessor: "CUSTOMER_TYPE",
      columnName: "Customer Type",
      sequence: 2,
      alignment: "left",
      componentType: "editableSelect",
      options: [
        { label: "Existing Customer", value: "Y" },
        { label: "Non Existing Customer", value: "N" },
      ],
      width: 200,
      minWidth: 120,
      maxWidth: 240,
    },
    {
      accessor: "CUSTOMER_ID",
      columnName: "Customer ID",
      sequence: 3,
      alignment: "center",
      componentType: "editableNumberFormat",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "USER_NAME",
      columnName: "User Name",
      sequence: 4,
      alignment: "left",
      componentType: "editableTextField",
      width: 150,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "PERSON_NAME",
      columnName: "Person_Name",
      sequence: 5,
      alignment: "center",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile No.",
      sequence: 6,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID.",
      sequence: 7,
      alignment: "left",
      componentType: "editableTextField",
      width: 250,
      minWidth: 200,
      maxWidth: 300,
    },
    {
      accessor: "DOCUMENT",
      columnName: "Document",
      sequence: 8,
      alignment: "left",
      componentType: "editableCheckbox",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DOCUMENT_NO",
      columnName: "Document No",
      sequence: 9,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    // {
    //   accessor: "UPLOAD_DOCUMENT",
    //   columnName: "Upload Document",
    //   sequence: 15,
    //   alignment: "left",
    //   componentType: "default",
    //   width: 140,
    //   minWidth: 120,
    //   maxWidth: 200,
    // },
    {
      columnName: "Upload Document",
      componentType: "buttonRowCell",
      accessor: "UPLOAD_DOCUMENT",
      sequence: 10,
      buttonLabel: "View Document",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
    },
    // {
    //   accessor: "AUTH_LETTER",
    //   columnName: "Auth. Letter",
    //   sequence: 15,
    //   alignment: "left",
    //   componentType: "default",
    //   width: 140,
    //   minWidth: 120,
    //   maxWidth: 200,
    // },
    {
      columnName: "Auth. Letter",
      componentType: "buttonRowCell",
      accessor: "AUTH_LETTER",
      sequence: 11,
      buttonLabel: "View Auth. Letter",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      accessor: "ACTIVE",
      columnName: "Active",
      sequence: 12,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_DATE",
      columnName: "Deactive",
      sequence: 13,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_REASON",
      columnName: "Deactive Reason",
      sequence: 14,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      columnName: "",
      componentType: "buttonRowCell",
      accessor: "USER_RIGHTS",
      sequence: 15,
      buttonLabel: "User Rights",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
    },
  ],
};

export const OtherUserViewGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Corporate User Registration Entry",
    rowIdColumn: "CUSTOMER_ID",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "40vh", max: "40vh" },
    pageSizes: [15, 20, 30],
    defaultPageSize: 15,
    allowRowSelection: false,
  },
  filters: [],
  columns: [
    {
      accessor: "SR_NO",
      columnName: "Sr. No.",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
      isAutoSequence: true,
    },
    {
      accessor: "CUSTOMER_TYPE",
      columnName: "Customer Type",
      sequence: 7,
      alignment: "left",
      componentType: "editableSelect",
      options: [
        { label: "Existing Customer", value: "Y" },
        { label: "Non Existing Customer", value: "N" },
      ],
      width: 160,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "CUSTOMER_ID",
      columnName: "Customer ID",
      sequence: 8,
      alignment: "center",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "USER_NAME",
      columnName: "User Name",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 250,
    },
    {
      accessor: "PERSON_NAME",
      columnName: "Person_Name",
      sequence: 10,
      alignment: "center",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile No.",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID.",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 250,
      minWidth: 200,
      maxWidth: 300,
    },
    {
      accessor: "DOCUMENT",
      columnName: "Document",
      sequence: 13,
      alignment: "left",
      componentType: "editableCheckbox",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DOCUMENT_NO",
      columnName: "Document No",
      sequence: 14,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      columnName: "Upload Document",
      componentType: "buttonRowCell",
      accessor: "UPLOAD_DOCUMENT",
      sequence: 15,
      buttonLabel: "View Document",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      columnName: "Auth. Letter",
      componentType: "buttonRowCell",
      accessor: "AUTH_LETTER",
      sequence: 15,
      buttonLabel: "View Auth. Letter",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      accessor: "ACTIVE",
      columnName: "Active",
      sequence: 15,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_DATE",
      columnName: "Deactive",
      sequence: 15,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_REASON",
      columnName: "Deactive Reason",
      sequence: 19,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
  ],
};
