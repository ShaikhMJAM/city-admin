import { components } from "components/report";

export const dpsIssuanceMetaData = {
  title: "DPS Issuance Report",
  disableGroupBy: "",
  hideFooter: "",
  hideAmountIn: "False",
  retrievalType: "DATE",
  autoFetch: false,
  columns: [
    {
      columnName: "Request DateTime",
      accessor: "TRAN_DT",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "Request Completed DateTime",
      accessor: "PROCESS_DT",
      Cell: components.DateTimeCell,
      width: 170,
    },
    {
      columnName: "SOL ID",
      accessor: "SOL_ID",
      width: 110,
      type: "default",
    },
    {
      columnName: "SOL Description",
      accessor: "SOL_DESC",
      width: 170,
    },
    {
      columnName: "CIF ID",
      accessor: "CIF_ID",
      width: 120,
    },
    {
      columnName: "CCY",
      accessor: "CCY",
      width: 110,
    },
    {
      columnName: "Scheme Code",
      accessor: "SCHEME_CODE",
      width: 130,
    },
    {
      columnName: "FDR Type",
      accessor: "FDR_TYPE",
      width: 170,
    },
    {
      columnName: "A/c. Name",
      accessor: "ACCT_NM",
      width: 150,
    },
    {
      columnName: "A/c.Opening Date",
      accessor: "ACCT_OPEN_DT",
      Cell: components.DateCell,
      width: 150,
    },
    {
      columnName: "Value Date",
      accessor: "VALUE_DT",
      Cell: components.DateCell,
      width: 130,
    },
    {
      columnName: "Deposit Amount",
      accessor: "AMOUNT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Deposit Period",
      accessor: "DEPOSIT_PERIOD",
      width: 150,
    },
    {
      columnName: "Maturity Date",
      accessor: "MATURITY_DATE",
      Cell: components.DateCell,
      width: 150,
    },
    {
      columnName: "Maturity Value",
      accessor: "MATURITY_AMT",
      width: 150,
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
    },
    {
      columnName: "Repayment A/c ID",
      accessor: "REPAY_ACCT_CD",
      width: 180,
    },
    {
      columnName: "Repayment A/c Name",
      accessor: "REPAY_ACCT_NM",
      width: 180,
    },
    {
      columnName: "Interest Rate",
      accessor: "INTEREST_RATE",
      Cell: components.NumberCell,
      isVisibleCurrSymbol: false,
      alignment: "right",
      width: 130,
    },

    {
      columnName: "Sector Code",
      accessor: "SECTOR_CODE",
      width: 130,
    },
    {
      columnName: "Sub Sector Code",
      accessor: "SUB_SECTOR_CODE",
      width: 150,
    },
    {
      columnName: "Occupation Code",
      accessor: "OCCUPATION_CODE",
      width: 150,
    },
    {
      columnName: "Free Code 3",
      accessor: "FREE_CODE3",
      width: 130,
    },
    {
      columnName: "Free Code 7",
      accessor: "FREE_CODE7",
      width: 130,
    },
    {
      columnName: "Nominee Name",
      accessor: "NOMINEE_NAME",
      width: 140,
    },
    {
      columnName: "Relationship",
      accessor: "NOMINEE_RELATIONSHIP",
      width: 150,
    },
    {
      columnName: "Address Line1",
      accessor: "ADDRESS1",
      width: 190,
    },
    {
      columnName: "Address Line2",
      accessor: "ADDRESS2",
      width: 190,
    },
    {
      columnName: "Nominee Photo ID",
      accessor: "NOMINEE_PHOTO_ID",
      width: 150,
    },
    {
      columnName: "City",
      accessor: "CITY",
      width: 110,
    },
    {
      columnName: "State",
      accessor: "STATE",
      width: 110,
    },
    {
      columnName: "Country",
      accessor: "COUNTRY",
      width: 110,
    },
    {
      columnName: "Postal Code",
      accessor: "POSTAL_CODE",
      width: 110,
    },
    {
      columnName: "Nominee Minor",
      accessor: "NOMINEE_MINOR",
      width: 150,
    },
    {
      columnName: "Date Of Birth",
      accessor: "NOMINEE_DOB",
      Cell: components.DateCell,
      width: 170,
    },
    {
      columnName: "Nominee Pent.",
      accessor: "NOMINATION_PENT",
      isDisplayTotal: true,
      Cell: components.NumberCell,
      alignment: "right",
      width: 170,
    },
    {
      columnName: "SI Srl.No.",
      accessor: "SI_SRL_NO",
      width: 170,
    },
    {
      columnName: "Stand. Inst. Freq. Type",
      accessor: "STAND_INST_FREQ",
      width: 170,
    },
    {
      columnName: "Day of Stand. Inst. Freq.",
      accessor: "STAND_INST_DAY",
      width: 170,
    },
    {
      columnName: "Stand. Inst. Freq.",
      accessor: "STAND_INST",
      width: 170,
    },
    {
      columnName: "Next Execution Date",
      accessor: "NEXT_EXECUTION",
      width: 170,
      Cell: components.DateCell,
    },
    {
      columnName: "Request ID",
      accessor: "REQUEST_CD",
      width: 170,
    },
  ],
};
