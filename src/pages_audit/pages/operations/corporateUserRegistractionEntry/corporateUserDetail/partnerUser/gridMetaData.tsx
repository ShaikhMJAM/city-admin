import { GridMetaDataType } from "components/dataTableStatic";

export const partnerUserGridMetaData: GridMetaDataType = {
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
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
      isAutoSequence: true,
    },
    {
      accessor: "CUSTOMER_ID",
      columnName: "Customer ID",
      sequence: 7,
      alignment: "center",
      componentType: "editableTextField",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "USER_ID",
      columnName: "User Name",
      sequence: 8,
      alignment: "left",
      componentType: "editableTextField",
      width: 160,
      minWidth: 120,
      maxWidth: 200,
    },

    {
      accessor: "NAME",
      columnName: "Person Name",
      sequence: 9,
      alignment: "left",
      componentType: "editableTextField",
      width: 220,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile No.",
      sequence: 10,
      alignment: "center",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID",
      sequence: 11,
      alignment: "left",
      componentType: "editableTextField",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "PAN_NO",
      columnName: "Pan No.",
      sequence: 11,
      alignment: "left",
      componentType: "editableTextField",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "ACTIVE",
      columnName: "Active",
      sequence: 13,
      alignment: "left",
      componentType: "editableCheckbox",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    // {
    //   accessor: "DEACTIVE_DATE",
    //   columnName: "Deactive Date.",
    //   sequence: 14,
    //   alignment: "left",
    //   componentType: "editableCheckbox",
    //   width: 140,
    //   minWidth: 120,
    //   maxWidth: 200,
    // },
    // {
    //   accessor: "DEACTIVE_REASON",
    //   columnName: "Deactice Reason.",
    //   sequence: 15,
    //   alignment: "left",
    //   componentType: "editableCheckbox",
    //   width: 140,
    //   minWidth: 120,
    //   maxWidth: 200,
    // },
    {
      columnName: "",
      componentType: "buttonRowCell",
      accessor: "USER_RIGHTS",
      sequence: 16,
      buttonLabel: "User Rights",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
    },
  ],
};

export const partnerUserViewGridMetaData: GridMetaDataType = {
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
      accessor: "CUSTOMER_ID",
      columnName: "Customer ID",
      sequence: 7,
      alignment: "center",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "USER_ID",
      columnName: "User Name",
      sequence: 8,
      alignment: "left",
      componentType: "default",
      width: 160,
      minWidth: 120,
      maxWidth: 200,
    },

    {
      accessor: "NAME",
      columnName: "Person Name",
      sequence: 9,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "MOBILE_NO",
      columnName: "Mobile No.",
      sequence: 10,
      alignment: "center",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "EMAIL_ID",
      columnName: "Email ID",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "PAN_NO",
      columnName: "Pan No.",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "ACTIVE",
      columnName: "Active",
      sequence: 13,
      alignment: "left",
      componentType: "editableCheckbox",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_DATE",
      columnName: "Deactive Date.",
      sequence: 14,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "DEACTIVE_REASON",
      columnName: "Deactice Reason.",
      sequence: 15,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
  ],
};
