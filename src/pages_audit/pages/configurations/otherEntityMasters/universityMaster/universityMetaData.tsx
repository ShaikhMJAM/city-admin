import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GetMiscValue } from "../api";

export const UniversityMasterDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "addUniversityMaster",
      label: "University Master",
      resetFieldOnUnmount: false,
      validationRun: "onBlur",
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
        autoComplete: "off",
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
        autoComplete: "off",
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
        defaultOptionLabel: "Select Account Source",
        options: () => GetMiscValue(),
        _optionsKey: "GetMiscValue-APP_IND_OTH",
        fullWidth: true,
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
        placeholder: "Enter Account Number",
        type: "text",
        fullWidth: true,
        required: true,
        autoComplete: "off",
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
        autoComplete: "off",
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
        autoComplete: "off",
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
        autoComplete: "off",
        fullWidth: true,
        GridProps: {
          xs: 12,
          md: 3,
          sm: 6,
        },
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "Service Charge Details",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      enablePagination: false,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_CD",
        columnName: "Serial No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 100,
        maxWidth: 150,
        minWidth: 70,
        isAutoSequence: true,
      },
      {
        accessor: "PAYMENT_ID",
        columnName: "Payment ID*",
        placeholder: "Enter Payment ID",
        componentType: "editableNumberFormat",
        sequence: 1,
        width: 200,
        maxWidth: 250,
        minWidth: 120,
        maxLength: 12,
        autoComplete: "off",
        FormatProps: {
          isAllowed: (values) => {
            if (values?.value?.length > 12) {
              return false;
            }
            if (values.floatValue === 0) {
              return false;
            }
            return true;
          },
        },
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
      },
      {
        accessor: "PAYMENT_HEADER",
        columnName: "Payment Header*",
        componentType: "editableTextField",
        placeholder: "Enter Payment Header",
        sequence: 1,
        width: 200,
        maxWidth: 250,
        minWidth: 120,
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
        validation: (value, data, prev) => {
          if (!Boolean(value.trim())) {
            return "This field is required";
          }
          return "";
        },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 11,
      },
    ],
  },
};
