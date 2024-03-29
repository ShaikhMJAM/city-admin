import { GridMetaDataType } from "components/dataTableStatic";
export const BankMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Master",
    rowIdColumn: "ROUTING_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [30, 50, 100],
    defaultPageSize: 30,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
  },
  // filters: [
  //   {
  //     accessor: "id",
  //     columnName: "Sr. No.",
  //     filterComponentType: "valueFilter",
  //     gridProps: {
  //       xs: 12,
  //       md: 12,
  //       sm: 12,
  //     },
  //   },
  // ],
  filters: [
    {
      accessor: "ROUTING_NO",
      columnName: "Routing Number",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "BANK_CD",
      columnName: "Bank Code",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "BRANCH_CD",
      columnName: "Branch Code",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "NEW_DIST_CD",
      columnName: "New District Code",
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
      alignment: "rigth",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "ROUTING_NO",
      columnName: "Routing Number",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "NPSB_BANK_CD",
      columnName: "NPSB Bank Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BANK_CD",
      columnName: "Bank Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BANK_NM",
      columnName: "Bank Name",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 180,
      maxWidth: 500,
      isDisabledOnBlurEvent: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "NEW_DIST_CD",
      columnName: "District Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 110,
      minWidth: 80,
      maxWidth: 150,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BRANCH_CD",
      columnName: "Branch Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 110,
      minWidth: 80,
      maxWidth: 200,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BRANCH_NM",
      columnName: "Branch Name",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 180,
      maxWidth: 500,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "NPSB_ENABLED_LABEL",
      columnName: "NPSB",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BEFTN_ENABLED_LABEL",
      columnName: "BEFTN",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "RTGS_ENABLED_LABEL",
      columnName: "RTGS",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
  ],
};
export const BankMasterUpdateViewMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Master",
    rowIdColumn: "__ROWID",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [30, 50, 100],
    defaultPageSize: 30,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
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
      alignment: "rigth",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "ROUTING_NO",
      columnName: "Routing Number",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "NPSB_BANK_CD",
      columnName: "NPSB Bank Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BANK_CD",
      columnName: "Bank Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 100,
      minWidth: 80,
      maxWidth: 150,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BANK_NM",
      columnName: "Bank Name",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 180,
      maxWidth: 500,
      isDisabledOnBlurEvent: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
    },
    {
      accessor: "NEW_DIST_CD",
      columnName: "District Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 110,
      minWidth: 80,
      maxWidth: 150,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BRANCH_CD",
      columnName: "Branch Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 110,
      minWidth: 80,
      maxWidth: 200,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BRANCH_NM",
      columnName: "Branch Name",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 180,
      maxWidth: 500,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "NPSB_ENABLED_LABEL",
      columnName: "NPSB",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "BEFTN_ENABLED_LABEL",
      columnName: "BEFTN",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "RTGS_ENABLED_LABEL",
      columnName: "RTGS",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
    {
      accessor: "__ROWTYPE",
      columnName: "ROW TYPE",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 80,
      minWidth: 50,
      maxWidth: 100,
      isDisabledOnBlurEvent: true,
    },
  ],
};
