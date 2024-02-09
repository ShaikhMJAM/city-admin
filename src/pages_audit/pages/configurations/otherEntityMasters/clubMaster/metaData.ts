import { MetaDataType } from "components/dynamicForm";
import { isValid } from "date-fns";
import { getMastersGridData, GetMiscValue } from "../api";
import { GridMetaDataType } from "components/dataTableStatic";

export const ClubMasterMetadata: MetaDataType = {
  form: {
    name: "clubMaster",
    label: "Club Master",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 1,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
      datetimePicker: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: { componentType: "hidden" },
      name: "TRAN_CD",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "ENTITY_CD",
      label: "Code",
      placeholder: "Enter Code",
      type: "text",
      fullWidth: true,
      required: true,
      maxLength: 20,
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Code is required."] },
          { name: "ENTITY_CD", params: ["Please select Code."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      isFieldFocused: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DESCRIPTION",
      label: "Description",
      placeholder: "Enter Description",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Description is required."] },
          { name: "DESCRIPTION", params: ["Please select Description."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "TO_SOURCE",
      label: "Account Source",
      placeholder: "Please select Parent Type",
      options: () => GetMiscValue(),
      _optionsKey: "GetMiscValue-APP_IND_OTH",
      defaultValue: "",
      fullWidth: true,
      defaultOptionLabel: "Select Account Source",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "accountNumber",
      },
      name: "ACCT_CD",
      label: "Account Number",
      placeholder: "Enter acoount Number",
      type: "text",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Account Number is required."] },
          { name: "ACCT_CD", params: ["Please select Account Number."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TRN_PERTICULERS",
      label: "Transaction Particulars",
      placeholder: "Enter Transaction Particulars",
      type: "text",
      fullWidth: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TRN_PERTICULERS2",
      label: "Transaction Particulars2",
      placeholder: "Enter Transaction Particulars2",
      type: "text",
      fullWidth: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "REMARKS",
      label: "Remark",
      placeholder: "Enter Remark",
      type: "text",
      fullWidth: true,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: { componentType: "hidden" },
      name: "POLICY_LABEL_EN",
      label: "Policy Label(English)",
    },
    {
      render: { componentType: "hidden" },
      name: "POLICY_LABEL_BN",
      label: "Policy Label(English)",
    },
  ],
};

export const ClubMemberListMetaData = {
  gridConfig: {
    dense: true,
    gridLabel: "Club Member Detail",
    rowIdColumn: "SR_CD",
    defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
    allowColumnReordering: true,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: true,
    containerHeight: { min: "65vh", max: "65vh" },
    pageSizes: [15, 20, 30],
    defaultPageSize: 15,
    isCusrsorFocused: true,
  },
  columns: [
    {
      columnName: "Sr. No.",
      componentType: "default",
      accessor: "id",
      sequence: 1,
      alignment: "left",
      width: 70,
      maxWidth: 100,
      minWidth: 50,
      isAutoSequence: true,
    },
    {
      columnName: "Member ID",
      componentType: "default",
      accessor: "MEMBER_ID",
      sequence: 3,
      alignment: "left",
      width: 130,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      columnName: "Member Name",
      componentType: "default",
      accessor: "MEMBER_NAME",
      sequence: 3,
      alignment: "left",
      width: 260,
      maxWidth: 400,
      minWidth: 180,
    },
    {
      accessor: "MEMBER_TYPE",
      columnName: "Member Type",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 180,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "MEMBER_SINCE",
      columnName: "Member Since",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 130,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      accessor: "MEMBER_STATUS_VIEW",
      columnName: "Member Status",
      sequence: 7,
      alignment: "center",
      componentType: "default",
      width: 140,
      maxWidth: 250,
      minWidth: 100,
    },
  ],
};

export const ClubMemberMasterMetaData = {
  form: {
    name: "clubMemberDetails",
    label: "Club Member Detail",
    resetFieldOnUnmount: false,
    validationRun: "all",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 1,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
      datetimePicker: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "hidden",
      },
      name: "SR_CD",
      label: "Sr. Code",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "TRAN_DT",
      label: "Entry Date",
      placeholder: "",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      isReadOnly: true,
    },
    {
      render: {
        componentType: "spacer",
      },
      sequence: 14,
      GridProps: {
        xs: 1,
        md: 9,
        sm: 9,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "CLUB_TRAN_CD",
      label: "Club Member",
      placeholder: "",
      type: "text",
      required: true,
      options: () => getMastersGridData("C"),
      _optionsKey: "GetClubMemberData",
      disableCaching: false,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Club is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      isReadOnly: true,
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "MEMBER_ID",
      label: "Member ID",
      placeholder: "Enter Member ID",
      type: "text",
      required: true,
      maxLength: 50,
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 50) {
            return false;
          }
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      autoComplete: "off",
      showMaxLength: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Member ID is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      __EDIT__: { isReadOnly: true },
      __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MEMBER_NAME",
      label: "Member Name",
      placeholder: "Enter Member Name",
      type: "text",
      required: true,
      maxLength: 300,
      showMaxLength: false,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Member Name is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      autoComplete: "off",
      __EDIT__: { isFieldFocused: true },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "MEMBER_TYPE",
      label: "Member Type",
      placeholder: "Enter Member Type",
      maxLength: 50,
      showMaxLength: false,
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      autoComplete: "off",
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "MEMBER_SINCE",
      label: "Member Since",
      placeholder: "DD/MM/YYYY",
      type: "text",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      autoComplete: "off",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Member Since is required."] },
          // { name: "typeError", params: ["Must be a valid date"] },
        ],
      },
      validate: (value) => {
        if (Boolean(value?.value) && !isValid(value?.value)) {
          return "Must be a valid date";
        } else if (Boolean(value?.value) && value?.value > new Date()) {
          return "Future dates are not allowed.";
        }
        return "";
      },

      format: "dd/MM/yyyy",
    },
    {
      render: {
        componentType: "select",
      },
      name: "MEMBER_STATUS",
      label: "Member Status",
      placeholder: "Enter Member Status",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: () => [
        { value: "Y", label: "Active" },
        { value: "N", label: "Deactive" },
      ],
      required: true,
      _optionsKey: "getMemberStatus",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Member Status is required."] }],
      },
    },
  ],
};
export const ClubMemberUpdateMetadata: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Club Member Details",
    rowIdColumn: "SR_CD",
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
    pageSizes: [20, 30, 50, 60],
    defaultPageSize: 20,
    containerHeight: {
      min: "60vh",
      max: "60vh",
    },
    allowFilter: true,
    allowColumnHiding: true,
    isCusrsorFocused: true,
    allowRowSelection: false,
  },
  filters: [
    {
      accessor: "MEMBER_ID",
      columnName: "Member Id",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "MEMBER_NAME",
      columnName: "Member Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "MEMBER_TYPE",
      columnName: "Member Type",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "MEMBER_SINCE",
      columnName: "Member Since",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "MEMBER_STATUS",
      columnName: "Member Status",
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
      accessor: "TRAN_CD",
      columnName: "Sr.No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      isVisible: false,
      maxWidth: 100,
      // isAutoSequence: true,
    },
    {
      accessor: "MEMBER_ID",
      columnName: "Member Id",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 150,
      minWidth: 120,
      maxWidth: 300,
    },
    {
      accessor: "MEMBER_NAME",
      columnName: "Member Name",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 100,
      maxWidth: 250,
    },
    {
      accessor: "MEMBER_TYPE",
      columnName: "Member Type",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "MEMBER_SINCE",
      columnName: "Member Since",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      accessor: "MEMBER_STATUS",
      columnName: "Member Status",
      sequence: 6,
      alignment: "left",
      componentType: "default",
      width: 140,
      minWidth: 50,
      maxWidth: 170,
    },
  ],
};
