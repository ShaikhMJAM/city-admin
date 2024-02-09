import { components } from "components/report";

export const supportingDocumentUploadMetaData = {
  title: "Supporting Documents Upload Report",
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
      columnName: "Registration Date",
      accessor: "REG_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Login ID",
      accessor: "CUST_NM",
      width: 140,
      type: "default",
    },
    {
      columnName: "Change Request Type",
      accessor: "CHANGE_REQ_TYPE",
      width: 190,
    },
    {
      columnName: "Document No.",
      accessor: "DOC_NO",
      width: 190,
    },
    {
      columnName: "API Responce ID",
      accessor: "DOC_API_ID",
      width: 200,
    },
    {
      columnName: "Document Name",
      accessor: "DOC_NM",
      width: 170,
    },
    {
      columnName: "Document File Name",
      accessor: "DOC_FILE_NM",
      width: 200,
    },
    {
      columnName: "Channel",
      accessor: "CHANNEL",
      width: 150,
    },
  ],
};
