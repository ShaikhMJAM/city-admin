import { components } from "components/report";

export const perameterMasterAuditMetaData = {
  title: "Perameters Audit Trail",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  // filters: [
  //   {
  //     accessor: "FROM_DT",
  //     columnName: "From Date",
  //     filterComponentType: "valueDateFilter",
  //     gridProps: {
  //       xs: 12,
  //       md: 12,
  //       sm: 12,
  //     },
  //   },
  //   {
  //     accessor: "TO_DT",
  //     columnName: "To Date",
  //     filterComponentType: "valueDateFilter",
  //     gridProps: {
  //       xs: 12,
  //       md: 12,
  //       sm: 12,
  //     },
  //   },
  // ],
  columns: [
    {
      columnName: "Pera No.",
      accessor: "PARA_CD",
      width: 140,
      type: "default",
    },
    {
      columnName: "Old Value",
      accessor: "OLD_VALUE",
      width: 150,
    },
    {
      columnName: "New Value",
      accessor: "NEW_VALUE",
      width: 150,
    },
    {
      columnName: "Modified By",
      accessor: "MODIFIED_BY",
      width: 150,
    },
    {
      columnName: "Modified Date - Time",
      accessor: "MODIFIED_DATE",
      width: 200,
      Cell: components.DateTimeCell,
    },
    {
      columnName: "Action",
      accessor: "ACTION",
      width: 170,
    },
  ],
};
