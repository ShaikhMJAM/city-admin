import { components } from "components/report";

export const applyForQuickLoanDetailMetaData = {
  title: "Apply for Quick Loan Detail Report",
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
      columnName: "Login ID",
      accessor: "USER_NAME",
      width: 120,
    },
    {
      columnName: "Applicant Name",
      accessor: "APPLICANT_NM",
      width: 170,
    },
    {
      columnName: "Request Date and Time",
      accessor: "TRAN_DT",
      width: 200,
      Cell: components.DateTimeCell,
      type: "default",
    },
    {
      columnName: "Status",
      accessor: "CONF_STATUS",
      width: 150,
    },
    {
      columnName: "FD Account",
      accessor: "FD_ACCOUNT",
      width: 150,
    },
    {
      columnName: "FD Balance",
      accessor: "FD_BALANCE",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "EMI Account",
      accessor: "EMI_ACCOUNT",
      width: 150,
    },
    {
      columnName: "EMI Amount",
      accessor: "EMI_AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Loan Tenure",
      accessor: "LOAN_TENURE",
      width: 100,
    },
    {
      columnName: "Int.Rate",
      accessor: "INT_RATE",
      width: 130,
    },
    {
      columnName: "VAT",
      accessor: "VAT",
      width: 100,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Monthly Income",
      accessor: "MONTHLY_INCOME",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Loan Amount",
      accessor: "LOAN_AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Processing Fee",
      accessor: "LOAN_PROCESSING_FEE",
      width: 130,
    },
    {
      columnName: "File REF No.",
      accessor: "FILE_REF_NO",
      width: 100,
    },
    {
      columnName: "E TIN No.",
      accessor: "E_TIN_NO",
      width: 130,
    },
    {
      columnName: "NID No.",
      accessor: "NID_NO",
      width: 170,
    },
    {
      columnName: "Smart Card No.",
      accessor: "SMART_CARD_NO",
      width: 130,
    },
    {
      columnName: "Birth Date",
      accessor: "BIRTH_DATE",
      Cell: components.DateCell,
      width: 150,
    },
    {
      columnName: "Birth Place",
      accessor: "BIRTH_PLACE",
      width: 120,
    },
    {
      columnName: "Profession",
      accessor: "PROFESSION",
      width: 150,
    },
    {
      columnName: "Soal ID",
      accessor: "SOL_ID",
      width: 120,
    },
    {
      columnName: "Father Name",
      accessor: "FATHER_NAME",
      width: 170,
    },
    {
      columnName: "Mother Name",
      accessor: "MOTHER_NAME",
      width: 170,
    },
    {
      columnName: "Spouse Name",
      accessor: "SPOUSE_NAME",
      width: 170,
    },
    {
      columnName: "Gender",
      accessor: "GENDER",
      width: 100,
      filter: (rows, _, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values["GENDER"];
          return rowValue.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      },
    },
    {
      columnName: "Present Address",
      accessor: "PRESENT_ADDRESS",
      width: 200,
    },
    {
      columnName: "Mobile No.",
      accessor: "MOBNO",
      width: 170,
    },
    {
      columnName: "Permanent Add",
      accessor: "PERMANENT_ADD",
      width: 200,
    },
    {
      columnName: "San.Int.Rate",
      accessor: "SAN_INT_RATE",
      width: 170,
    },
    {
      columnName: "Tenure",
      accessor: "SAN_LOAN_TENURE",
      width: 100,
    },
    {
      columnName: "Other Loan EMI",
      accessor: "OTHER_LOAN_EMI",
      width: 170,
    },
    {
      columnName: "San Loan Amount",
      accessor: "SAN_LOAN_AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "EMI Date",
      accessor: "EMI_DATE",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "CC.Limit Amount",
      accessor: "CC_LIM_AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "San Inst.Amount",
      accessor: "SAN_INST_AMT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Final Loan Amount",
      accessor: "FINAL_LOAN_AMOUNT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "DBR Amount",
      accessor: "DBR_AMT",
      width: 170,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "CIB User",
      accessor: "CIB_USER_ID",
      width: 170,
    },
    {
      columnName: "LTV%",
      accessor: "LTV_PERC",
      width: 100,
    },
    {
      columnName: "CIB Status",
      accessor: "CIB_STATUS",
      width: 170,
    },
    {
      columnName: "CIB Entered Date",
      accessor: "CIB_ENTERED_DATE",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "CIB Remarks",
      accessor: "CIB_REMARKS",
      width: 170,
    },
    {
      columnName: "CIB Machine Name",
      accessor: "CIB_MACHINE_NM",
      width: 170,
    },
    {
      columnName: "DBR Users",
      accessor: "DBR_USER_ID",
      width: 170,
    },
    {
      columnName: "DBR Remarks",
      accessor: "DBR_REMARKS",
      width: 170,
    },
    {
      columnName: "DBR Entered Date",
      accessor: "DBR_ENTERED_DATE",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "DBR Machine Name",
      accessor: "DBR_MACHINE_NM",
      width: 170,
    },
    {
      columnName: "Auth User",
      accessor: "AUTH_USER_ID",
      width: 170,
    },
    {
      columnName: "Auth Remarks",
      accessor: "AUTH_REMARKS",
      width: 170,
    },
    {
      columnName: "Auth Entered Date",
      accessor: "AUTH_ENTERED_DATE",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Auth Machine Name",
      accessor: "AUTH_MACHINE_NM",
      width: 170,
    },
    {
      columnName: "Rejected By",
      accessor: "REJECT_BY",
      width: 170,
    },
    {
      columnName: "Reject Remarks",
      accessor: "REJECT_MACHINE_NM",
      width: 170,
    },
    {
      columnName: "Rejected Date",
      accessor: "REJECT_DATE",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Rejected Machine Name",
      accessor: "REJECT_REMARKS",
      width: 170,
    },
  ],
};
