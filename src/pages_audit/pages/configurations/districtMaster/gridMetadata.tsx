import { GridMetaDataType } from "components/dataTableStatic";
export const DistrictMasterGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "District Master",
    rowIdColumn: "DIST_CD",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    pageSizes: [20, 30, 50],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: true,
    isCusrsorFocused: true,
  },
  filters: [
    {
      accessor: "NEW_DIST_CD",
      columnName: "District Code",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DIST_NM",
      columnName: "District Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DIVISION_CD",
      columnName: "Division Code",
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
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "NEW_DIST_CD",
      columnName: "District Code",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 110,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      accessor: "DIST_NM",
      columnName: "District Name",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 250,
      minWidth: 200,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "DIVISION_CD",
      columnName: "Division Code",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 110,
      minWidth: 100,
      maxWidth: 150,
      showTooltip: true,
    },
    {
      accessor: "DIVISION_NM",
      columnName: "Division Name",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 250,
      minWidth: 200,
      maxWidth: 400,
      showTooltip: true,
    },
    {
      accessor: "GEOCODE",
      columnName: "Geo Code",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 100,
      maxWidth: 200,
      showTooltip: true,
    },
    {
      accessor: "DIST_CD",
      columnName: "Dist. CD.",
      sequence: 7,
      alignment: "left",
      componentType: "default",
      width: 250,
      minWidth: 200,
      maxWidth: 400,
      showTooltip: true,
    },
  ],
};
