import { components, filters } from "components/report";

export const ClubMemberMetaData = {
  title: "List Of Club Member Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  autoFetch: false,
  retrievalType: "CLUBMEMBER",
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
      columnName: "Member ID",
      accessor: "MEMBER_ID",
      width: 140,
      type: "default",
    },
    {
      columnName: "Member Name",
      accessor: "MEMBER_NAME",
      width: 150,
    },
    {
      columnName: "Member Type",
      accessor: "MEMBER_TYPE",
      width: 190,
    },
    {
      columnName: "Member Since",
      accessor: "MEMBER_SINCE",
      Cell: components.DateCell,
      width: 190,
    },
    {
      columnName: "Member Status",
      accessor: "STATUS_DESC",
      width: 150,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["STATUS_DESC"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
  ],
};
