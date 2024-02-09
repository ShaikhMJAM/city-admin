import { GridMetaDataType } from "components/dataTableStatic";
export const ServiceActiveConfigGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Service Active/Deactive Configuration",
    rowIdColumn: "TRN_TYPE",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [20, 30, 40],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [
    {
      accessor: "id",
      columnName: "Sr. No.",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
  columns: [
    {
      accessor: "id1",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Service Name",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "ACTIVE",
      columnName: "Status",
      sequence: 6,
      alignment: "left",
      componentType: "editableSelect",
      placeholder: "",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      options: [
        { label: "Active", value: "Y" },
        { label: "Deactive", value: "N" },
      ],
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "ALLOW_ACCESS_CHANNEL",
      columnName: "Allow Access Channel",
      sequence: 7,
      alignment: "left",
      componentType: "editableSelect",
      placeholder: "",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      options: [
        { label: "Web", value: "I" },
        { label: "Mobile", value: "M" },
        { label: "Both", value: "B" },
      ],
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "TRN_USER",
      columnName: "Card User",
      sequence: 8,
      alignment: "left",
      componentType: "editableCheckbox",
      placeholder: "",
      width: 90,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      accessor: "VIEW_USER",
      columnName: "Non Card User",
      sequence: 9,
      alignment: "left",
      componentType: "editableCheckbox",
      placeholder: "",
      width: 110,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      accessor: "DISPLAY_MSG",
      columnName: "Service Stop Alert Message",
      sequence: 10,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 350,
      minWidth: 150,
      maxWidth: 500,
    },
  ],
};
export const ServiceActiveConfigViewGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Service Active/Deactive Configuration",
    rowIdColumn: "TRN_TYPE",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [20, 30, 40],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    // disableLoader: true,
  },
  filters: [
    {
      accessor: "id",
      columnName: "Sr. No.",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
  columns: [
    {
      accessor: "id1",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Service Name",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 400,
    },
    {
      accessor: "ACTIV_STATUS",
      columnName: "Status",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      color: (val, data) => {
        let active = data?.original?.ACTIVE ?? "";
        return active === "N" ? "red" : active === "Y" ? "green" : "inherit";
      },
      width: 80,
      minWidth: 60,
      maxWidth: 200,
    },
    {
      accessor: "ACCESS_CHANNEL",
      columnName: "Access Channel",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "TRN_USER_VIEW",
      columnName: "Card User",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 90,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      accessor: "VIEW_USER_VIEW",
      columnName: "Non Card User",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 110,
      minWidth: 80,
      maxWidth: 150,
    },
    {
      accessor: "MSG",
      columnName: "Service Stop Alert Message",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      color: (val, data) => {
        let active = data?.original?.ACTIVE ?? "";
        return active === "N" ? "red" : active === "Y" ? "green" : "inherit";
      },
      width: 330,
      minWidth: 150,
      maxWidth: 500,
    },
  ],
};
