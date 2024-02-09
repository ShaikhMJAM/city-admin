import { GridMetaDataType } from "components/dataTableStatic";

export const FromSourceConfigListGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "From Source Key Template",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [15, 25, 50],
    defaultPageSize: 15,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [],
  columns: [
    {
      accessor: "id",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "rigth",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 120,
      isAutoSequence: true,
    },

    {
      accessor: "ALLOW_DISALLOW",
      columnName: "Template Set As",
      componentType: "editableSelect",
      sequence: 2,
      alignment: "left",
      width: 140,
      minWidth: 100,
      maxWidth: 200,
      options: () => {
        return [
          { value: "Y", label: "ALLOW" },
          { value: "N", label: "DISALLOW" },
          { value: "R", label: "NONE" },
        ];
      },
      disableCachingOptions: true,
      validation: (value, data, prev) => {
        if (!Boolean(value)) {
          return "This field is required";
        }
      },
    },
    {
      accessor: "OLD_ALLOW_DISALLOW",
      columnName: "Current Config.",
      sequence: 3,
      alignment: "left",
      componentType: "disableSelect",
      // componentType: "editableSelect",
      options: () => {
        return [
          { value: "Y", label: "ALLOW" },
          { value: "N", label: "DISALLOW" },
          { value: "R", label: "NONE" },
        ];
      },
      placeholder: "",
      width: 180,
      minWidth: 100,
      maxWidth: 250,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 150,
      maxWidth: 500,
    },
    {
      accessor: "SERVICE_TYPE",
      columnName: "Service",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      placeholder: "",
      width: 250,
      minWidth: 150,
      maxWidth: 500,
    },
  ],
};
