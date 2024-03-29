import { GridMetaDataType } from "components/dataTableStatic";
import { GetMiscValue } from "./api";
// export const SourceParentGridMetaData: GridMetaDataType = {
//   gridConfig: {
//     dense: true,
//     gridLabel: "Source Parent Type Master",
//     rowIdColumn: "TRAN_CD",
//     defaultColumnConfig: {
//       width: 400,
//       maxWidth: 450,
//       minWidth: 300,
//     },
//     allowColumnReordering: true,
//     disableSorting: false,
//     hideHeader: false,
//     disableGroupBy: true,
//     enablePagination: false,
//     pageSizes: [20, 30, 40],
//     defaultPageSize: 20,
//     containerHeight: {
//       min: "68vh",
//       max: "68vh",
//     },
//     allowFilter: true,
//     allowColumnHiding: false,
//     allowRowSelection: false,
//     isCusrsorFocused: true,
//     hiddenFlag: "_hidden",
//     disableLoader: true,
//   },
//   filters: [
//     {
//       accessor: "BENF_ALLOW",
//       columnName: "Beneficiary Allow",
//       filterComponentType: "valueFilter",
//       gridProps: {
//         xs: 12,
//         md: 12,
//         sm: 12,
//       },
//     },
//     {
//       accessor: "DESCRIPTION",
//       columnName: "Description",
//       filterComponentType: "valueFilter",
//       gridProps: {
//         xs: 12,
//         md: 12,
//         sm: 12,
//       },
//     },
//     {
//       accessor: "PARENT_TYPE",
//       columnName: "Parent Type",
//       filterComponentType: "valueFilter",
//       gridProps: {
//         xs: 12,
//         md: 12,
//         sm: 12,
//       },
//     },
//     {
//       accessor: "SINGUP_ALLOW",
//       columnName: "SignUp Allow",
//       filterComponentType: "valueFilter",
//       gridProps: {
//         xs: 12,
//         md: 12,
//         sm: 12,
//       },
//     },
//     {
//       accessor: "SOURCE_TYPE",
//       columnName: "Source Type",
//       filterComponentType: "valueFilter",
//       gridProps: {
//         xs: 12,
//         md: 12,
//         sm: 12,
//       },
//     },
//   ],
//   columns: [
//     {
//       accessor: "id1",
//       columnName: "Sr. No.",
//       sequence: 1,
//       alignment: "left",
//       componentType: "default",
//       width: 70,
//       minWidth: 60,
//       maxWidth: 100,
//       isAutoSequence: true,
//     },
//     {
//       accessor: "SOURCE",
//       columnName: "Source Name*",
//       sequence: 2,
//       alignment: "left",
//       componentType: "editableSelect",
//       options: () => GetMiscValue(),
//       _optionsKey: "GetMiscValue-APP_INDICATOR",
//       defaultOptionLabel: "Select Source Name",
//       placeholder: "Enter Source Name",
//       width: 120,
//       minWidth: 120,
//       maxWidth: 400,
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//     },
//     {
//       accessor: "COMP_CD",
//       columnName: "COMP_CD",
//       sequence: 2,
//       alignment: "left",
//       componentType: "editableTextField",
//       placeholder: "Enter COMP_CD",
//       width: 120,
//       minWidth: 120,
//       isVisible: false,
//       maxWidth: 400,
//     },
//     {
//       accessor: "SOURCE_TYPE",
//       columnName: "Source Type*",
//       sequence: 3,
//       alignment: "left",
//       componentType: "editableSelect",
//       options: [
//         { label: "Account", value: "ACCT" },
//         { label: "Card", value: "CARD" },
//       ],
//       defaultOptionLabel: "Select Source Type",
//       placeholder: "Enter Source Type",
//       width: 100,
//       minWidth: 120,
//       maxWidth: 400,
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//     },
//     {
//       accessor: "PARENT_TYPE",
//       columnName: "Parent Type*",
//       sequence: 4,
//       alignment: "left",
//       componentType: "editableTextField",
//       placeholder: "Enter Parent Type",
//       maxLength: 50,
//       autoComplete: "off",
//       width: 200,
//       minWidth: 150,
//       maxWidth: 400,
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//       validation: (value, data, prev) => {
//         if (!Boolean(value.trim())) {
//           return "This field is required";
//         }
//         if (!/^[A-Za-z\s]+$/.test(value)) {
//           return "Digits and symbols are not allowed";
//         }
//         return "";
//       },
//     },
//     {
//       accessor: "DESCRIPTION",
//       columnName: "Description*",
//       sequence: 5,
//       alignment: "left",
//       componentType: "editableTextField",
//       placeholder: "Enter Description",
//       autoComplete: "off",
//       maxLength: 100,
//       width: 250,
//       minWidth: 150,
//       maxWidth: 400,
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//       validation: (value, data, prev) => {
//         if (!Boolean(value.trim())) {
//           return "This field is required";
//         }
//         return "";
//       },
//     },
//     {
//       accessor: "SINGUP_ALLOW",
//       columnName: "SignUp Allow*",
//       sequence: 6,
//       alignment: "left",
//       componentType: "editableSelect",
//       placeholder: "",
//       defaultOptionLabel: "Select SignUp Allow",
//       width: 130,
//       minWidth: 100,
//       maxWidth: 200,
//       options: [
//         { label: "Allow", value: "Y" },
//         { label: "Disallow", value: "N" },
//       ],
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//     },
//     {
//       accessor: "BENF_ALLOW",
//       columnName: "Beneficiary Allow*",
//       sequence: 7,
//       alignment: "left",
//       componentType: "editableSelect",
//       placeholder: "",
//       defaultOptionLabel: "Select Beneficiary Allow",
//       width: 130,
//       minWidth: 140,
//       maxWidth: 200,
//       options: [
//         { label: "Allow", value: "Y" },
//         { label: "Disallow", value: "N" },
//       ],
//       schemaValidation: {
//         type: "string",
//         rules: [{ name: "required", params: ["This field is required"] }],
//       },
//     },
//     {
//       accessor: "DISPLAY_ORDER",
//       columnName: "Display Order",
//       sequence: 8,
//       alignment: "left",
//       placeholder: "Enter Display Order",
//       componentType: "editableNumberFormat",
//       autoComplete: "off",
//       FormatProps: {
//         allowNegative: false,
//         isAllowed: (values) => {
//           if (values?.value?.length > 3) {
//             return false;
//           }
//           if (values.floatValue === 0) {
//             return false;
//           }
//           return true;
//         },
//       },
//       width: 130,
//       minWidth: 100,
//       maxWidth: 200,
//       isAutoSequence: true,
//     },
//     {
//       columnName: "Action",
//       componentType: "deleteRowCell",
//       accessor: "_hidden",
//       sequence: 9,
//       width: 100,
//       minWidth: 60,
//       maxWidth: 100,
//     },
//   ],
// };

export const SourceParentGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Source Parent Type Master",
    rowIdColumn: "TRAN_CD",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: false,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [20, 30, 40],
    defaultPageSize: 20,
    containerHeight: {
      min: "68vh",
      max: "68vh",
    },
    allowFilter: true,
    allowColumnHiding: false,
    allowRowSelection: true,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
  },
  filters: [
    // {
    //   accessor: "BENF_ALLOW",
    //   columnName: "Beneficiary Allow",
    //   filterComponentType: "valueFilter",
    //   gridProps: {
    //     xs: 12,
    //     md: 12,
    //     sm: 12,
    //   },
    // },
    {
      accessor: "SOURCE",
      columnName: "Source Name",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "SOURCE_TYPE",
      columnName: "Source Type",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "PARENT_TYPE",
      columnName: "Parent Type",
      filterComponentType: "valueFilter",
      gridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
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
      accessor: "id1",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "left",
      componentType: "default",
      width: 70,
      minWidth: 60,
      maxWidth: 100,
      isAutoSequence: true,
    },
    {
      accessor: "SOURCE",
      columnName: "Source Name",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      maxWidth: 400,
    },
    {
      accessor: "COMP_CD",
      columnName: "COMP_CD",
      sequence: 2,
      alignment: "left",
      componentType: "default",
      width: 120,
      minWidth: 120,
      isVisible: false,
      maxWidth: 400,
    },
    {
      accessor: "SOURCE_TYPE",
      columnName: "Source Type",
      sequence: 3,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 120,
      maxWidth: 400,
    },
    {
      accessor: "PARENT_TYPE",
      columnName: "Parent Type",
      sequence: 4,
      alignment: "left",
      componentType: "default",
      width: 100,
      minWidth: 120,
      maxWidth: 400,
    },
    {
      accessor: "DESCRIPTION",
      columnName: "Description",
      sequence: 5,
      alignment: "left",
      componentType: "default",
      width: 220,
      minWidth: 150,
      maxWidth: 400,
    },
    // {
    //   accessor: "SINGUP_ALLOW",
    //   columnName: "SignUp Allow",
    //   sequence: 6,
    //   alignment: "left",
    //   componentType: "default",
    //   isReadOnly: true,
    //   width: 100,
    //   minWidth: 120,
    //   maxWidth: 400,
    // },
    // {
    //   accessor: "BENF_ALLOW",
    //   columnName: "Beneficiary Allow",
    //   sequence: 7,
    //   alignment: "left",
    //   componentType: "default",
    //   isReadOnly: true,
    //   width: 100,
    //   minWidth: 140,
    //   maxWidth: 400,
    // },
    {
      accessor: "SINGUP_ALLOW",
      columnName: "SignUp Allow",
      sequence: 6,
      alignment: "left",
      componentType: "editableCheckbox",
      isReadOnly: true,
      width: 100,
      minWidth: 120,
      maxWidth: 400,
    },
    {
      accessor: "BENF_ALLOW",
      columnName: "Beneficiary Allow",
      sequence: 7,
      alignment: "left",
      componentType: "editableCheckbox",
      isReadOnly: true,
      width: 100,
      minWidth: 140,
      maxWidth: 400,
    },
    {
      accessor: "DISPLAY_ORDER",
      columnName: "Display Order",
      sequence: 8,
      alignment: "left",
      componentType: "default",
      width: 110,
      minWidth: 90,
      maxWidth: 200,
    },
  ],
};
