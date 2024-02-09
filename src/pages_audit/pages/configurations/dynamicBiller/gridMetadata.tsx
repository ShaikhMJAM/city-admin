import { GridMetaDataType } from "components/dataTableStatic";
export const DynamicBillerGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Dynamic Biller Configuration",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "CATEGORY_ID",
      columnName: "Category ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "SUB_CATEGORY_ID",
      columnName: "Sub Category ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "BILLER_ID",
      columnName: "Biller ID",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "BILLER_NAME",
      columnName: "Biller Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "SUB_CATEGORY_NAME",
      columnName: "Sub Category Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "CATEGORY_NAME",
      columnName: "Category Name",
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
      accessor: "SR_NO",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 80,
      maxWidth: 200,
    },
    {
      accessor: "CATEGORY_ID",
      columnName: "Category ID",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 200,
    },
    {
      accessor: "SUB_CATEGORY_ID",
      columnName: "Sub Category ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 130,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "BILLER_ID",
      columnName: "Biller ID",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessor: "BILLER_NAME",
      columnName: "Biller Name",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "BILLER_DESC",
      columnName: "Biller Description",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "SUB_CATEGORY_NAME",
      columnName: "Sub Category Name",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "SUB_CATEGORY_DESC",
      columnName: "Sub Category Description",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "CATEGORY_NAME",
      columnName: "Category Name",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Category Description",
      sequence: 8,
      alignment: "left",
      componentType: "default",
      width: 160,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "BILLER_INFO_URL",
      columnName: "Biller Info URL",
      sequence: 10,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 350,
    },
    {
      accessor: "BILLER_PAYMENT_URL",
      columnName: "Biller Payment URL",
      sequence: 11,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 350,
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Modified By",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Modified Date",
      sequence: 13,
      alignment: "center",
      componentType: "default",
      //dateFormat: "dd/mm/yyyy",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};

export const DynamicBillerConfirmGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Dynamic Biller Confirmation",
    rowIdColumn: "SR_NO",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "CATEGORY_ID",
      columnName: "Category ID",
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
      accessor: "SR_NO",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 80,
      maxWidth: 200,
    },
    {
      accessor: "CATEGORY_ID",
      columnName: "Category ID",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 130,
      minWidth: 80,
      maxWidth: 200,
    },
    {
      accessor: "CATEGORY_NAME",
      columnName: "Category Name",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 300,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Category Description",
      sequence: 8,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      accessor: "CONFIRM_STATUS",
      columnName: "Confirm Status",
      sequence: 12,
      alignment: "left",
      componentType: "default",
      width: 180,
      minWidth: 160,
      maxWidth: 200,
    },
    {
      accessor: "LAST_ENTERED_BY",
      columnName: "Modified By",
      sequence: 13,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "LAST_MODIFIED_DATE",
      columnName: "Modified Date",
      sequence: 14,
      alignment: "center",
      componentType: "date",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      width: 150,
      minWidth: 130,
      maxWidth: 170,
    },
  ],
};
