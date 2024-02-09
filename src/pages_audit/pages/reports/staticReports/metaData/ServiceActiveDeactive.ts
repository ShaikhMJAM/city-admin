import { components } from "components/report";

export const ServiceActiveDeactiveMetaData = {
  title: "Service Active/Deactive Register",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  groupBy: ["TRN_TYPE", "DESCRIPTION", "ACTIVE", "DISPLAY_MSG"],
  columns: [
    // {
    //   columnName: "Sr. No.",
    //   accessor: "SR_CD",
    //   width: 150,
    //   type: "default",
    // },
    {
      columnName: "Tran. Type",
      accessor: "TRN_TYPE",
      width: 150,
      type: "default",
    },
    {
      columnName: "Sub Tran. Type",
      accessor: "SUB_TRN_TYPE",
      width: 150,
      type: "default",
    },
    {
      columnName: "From Date",
      accessor: "FROM_DT",
      width: 190,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "To Date",
      accessor: "TO_DT",
      width: 220,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Deactive",
      accessor: "ACTIVE_DTL",
      width: 190,
    },
    {
      columnName: "Display Message",
      accessor: "DISPLAY_MSG",
      width: 250,
    },
    {
      columnName: "Description",
      accessor: "DESCRIPTION",
      width: 250,
    },
    {
      columnName: "Display Message Detail",
      accessor: "DISPLAY_MSG_DTL",
      width: 250,
    },
    {
      columnName: "Status",
      accessor: "ACTIVE",
      width: 250,
    },
  ],
};
