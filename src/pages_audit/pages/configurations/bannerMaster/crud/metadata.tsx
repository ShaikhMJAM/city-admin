import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { isValidDate } from "components/utils/utilFunctions/function";
import {
  geaterThanDate,
  greaterThanInclusiveDate,
  lessThanDate,
} from "registry/rulesEngine";

export const BannerMasterConfigDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "editBannerMaster",
      label: "Banner Configuration",
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
        render: { componentType: "select" },
        name: "BANN_TYPE",
        label: "Banner Type",
        options: [
          { label: "For All Customers", value: "A" },
          { label: "Specific Customer", value: "C" },
        ],
        _optionsKey: "GetBannType",
        placeholder: "",
        defaultOptionLabel: "Select Banner Type",
        required: true,
        fullWidth: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["Banner Type is required."] }],
        },
        GridProps: {
          xs: 12,
          md: 3,
          sm: 6,
        },
        //@ts-ignore
        isFieldFocused: true,
        __EDIT__: { isReadOnly: true, isFieldFocused: false },
      },
      //@ts-ignore
      {
        render: {
          componentType: "loginID",
        },
        name: "CUSTOME_USER_NM",
        label: "Login ID",
        placeholder: "Enter Login ID",
        type: "text",
        fullWidth: true,
        GridProps: {
          xs: 12,
          md: 3,
          sm: 6,
        },
        required: true,
        //@ts-ignore
        postValidationSetCrossFieldValues: "getUserDetailThroughLoginID",
        /*runValidationOnDependentFieldsChange: true,*/
        dependentFields: ["BANN_TYPE"],
        validate: (fieldData, dependentFieldsValues, formState) => {
          if (
            dependentFieldsValues?.BANN_TYPE?.value === "C" &&
            !Boolean(fieldData?.value)
          ) {
            return "Login ID is required.";
          }
          return "";
        },
        shouldExclude: (value, dependent) => {
          if (dependent["BANN_TYPE"]?.value === "C") {
            return false;
          }
          return true;
        },
      },

      {
        render: { componentType: "hidden" },
        name: "TRAN_CD",
      },
      {
        render: { componentType: "hidden" },
        name: "USER_NAME",
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "BannerMasterDetails",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      // enablePagination: true,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "id",
        columnName: "Sr. No",
        isAutoSequence: true,
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 80,
        maxWidth: 150,
        minWidth: 40,
      },
      {
        accessor: "SR_CD",
        columnName: "Sr. No",
        componentType: "default",
        isVisible: false,
        sequence: 2,
        alignment: "right",
        width: 50,
        maxWidth: 150,
        minWidth: 40,
      },
      {
        accessor: "CHANNEL",
        columnName: "Channel*",
        sequence: 3,
        componentType: "editableSelect",
        defaultOptionLabel: "Select Channel",
        options: [
          { label: "Web", value: "I" },
          { label: "Mobile", value: "M" },
          { label: "Both", value: "B" },
        ],
        placeholder: "",
        width: 150,
        minWidth: 100,
        required: true,
        maxWidth: 200,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
      },
      {
        accessor: "OFFER_TYPE",
        columnName: "Display Type",
        sequence: 4,
        componentType: "editableSelect",
        defaultOptionLabel: "Select Display Type",
        options: [
          { label: "Slider", value: "S" },
          { label: "Popup", value: "P" },
        ],
        placeholder: "",
        width: 150,
        minWidth: 100,
        maxWidth: 250,
        required: true,
        // schemaValidation: {
        //   type: "string",
        //   rules: [{ name: "required", params: ["This field is required"] }],
        // },
      },
      {
        accessor: "FROM_DT",
        columnName: "Effective From*",
        sequence: 5,
        componentType: "editableDatePicker",
        dateFormat: "dd/MM/yyyy",
        required: true,
        disablePast: true,
        // disableToday: true,
        defaultValue: new Date(),
        placeholder: "Enter Effective From",
        width: 170,
        minWidth: 100,
        maxWidth: 250,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required.";
          }
          if (!isValidDate(new Date(value))) {
            return "Invalid date";
          }
          let fromDate = new Date(value);
          let toDate = new Date(data?.TO_DT);
          if (geaterThanDate(fromDate, toDate)) {
            return `From Date Should be Less Than To Date.`;
          }
          if (Array.isArray(prev)) {
            let returnMsg = "";
            prev.forEach((item) => {
              if (greaterThanInclusiveDate(new Date(item?.TO_DT), fromDate)) {
                returnMsg = `From Date Should Greater Than Previous To Date.`;
                return returnMsg;
              }
            });
            return returnMsg;
          }
          return "";
        },
        // __EDIT__: { isReadOnly: true },
      },
      {
        accessor: "TO_DT",
        columnName: "To Date*",
        sequence: 6,
        componentType: "editableDatePicker",
        dateFormat: "dd/MM/yyyy",
        required: true,
        disablePast: true,
        defaultValue: new Date(),
        placeholder: "Enter To Date",
        width: 170,
        minWidth: 100,
        maxWidth: 250,
        validation: (value, data) => {
          if (!Boolean(value)) {
            return "This field is required.";
          }
          if (!isValidDate(new Date(value))) {
            return "Invalid date";
          }
          let toDate = new Date(value);
          let fromDate = new Date(data?.FROM_DT);
          if (lessThanDate(toDate, fromDate)) {
            return `To Date Should be Greater Than From Date.`;
          }
          return "";
        },
      },
      {
        accessor: "SEQ_NO",
        columnName: "Display Order",
        sequence: 7,
        componentType: "editableNumberFormat",
        placeholder: "Enter Display Order",
        width: 120,
        minWidth: 50,
        maxWidth: 150,
        maxLength: 3,
        FormatProps: {
          decimalScale: 0,
          allowNegative: false,
          isAllowed: (values) => {
            if (values?.value?.length > 3) {
              return false;
            }
            if (values.floatValue === 0) {
              return false;
            }
            return true;
          },
        },
        // schemaValidation: {
        //   type: "string",
        //   rules: [{ name: "required", params: ["This field is required"] }],
        // },
      },
      {
        accessor: "UPLOAD",
        componentType: "buttonRowCell",
        columnName: "View/Upload HTML",
        sequence: 12,
        width: 160,
        alignment: "center",
        isVisible: false,
        __EDIT__: { isVisible: true },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        width: 80,
        sequence: 13,
        alignment: "center",
      },
    ],
  },
};
