import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GetBranchList } from "../api";
import { GridMetaDataType } from "components/dataTableStatic";
import { format, isValid } from "date-fns";

import { lessThanDate } from "registry/rulesEngine";
import { getParsedDate } from "components/utils/utilFunctions/function";

export const HolidayMetadata: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "Holidayconfig",
      label: "Holiday Configuration",
      resetFieldOnUnmount: false,
      validationRun: "all",
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
        render: { componentType: "datePicker" },
        name: "START_DT",
        label: "Start Date",
        format: "dd/MM/yyyy",
        placeholder: "DD/MM/YYYY",
        // defaultValue: new Date(),
        required: true,
        maxLength: 150,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This Field is required"] }],
        },
        validate: (value) => {
          if (Boolean(value?.value) && !isValid(value?.value)) {
            return "Must be a valid date";
          }
          return "";
        },
        autoComplete: "off",
        __EDIT__: { isReadOnly: true },
        //@ts-ignore
        isFieldFocused: true,
      },
      {
        render: { componentType: "datePicker" },
        name: "END_DT",
        label: "End Date",
        format: "dd/MM/yyyy",
        placeholder: "DD/MM/YYYY",
        required: true,
        maxLength: 150,
        showMaxLength: false,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        dependentFields: ["START_DT"],
        runValidationOnDependentFieldsChange: true,
        validate: (fieldValue, dependentFields) => {
          if (Boolean(fieldValue?.value) && !isValid(fieldValue?.value)) {
            return "Must be a valid date";
          }
          if (fieldValue?.value && dependentFields["START_DT"]?.value) {
            let endDate = new Date(fieldValue?.value);
            let startDate = new Date(dependentFields["START_DT"]?.value);
            const d1 = new Date(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate()
            );
            const d2 = new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate()
            );
            if (d1 < d2) {
              return "'End Date' should be greater than 'Start Date'.";
            }
          }
          return "";
        },
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This Field is required"] },
            // { name: "typeError", params: ["Must be a valid date"] },
          ],
        },
        __EDIT__: { isReadOnly: true },
      },
      {
        render: { componentType: "textField" },
        name: "DESCRIPTION",
        label: "Description",
        placeholder: "Enter Description",
        type: "text",
        required: true,
        maxLength: 300,
        showMaxLength: false,
        GridProps: { xs: 12, md: 6, sm: 6 },
        fullWidth: true,
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "DESCRIPTION", params: ["Please select Description."] },
          ],
        },
        __EDIT__: { isReadOnly: false, isFieldFocused: true },
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "Holiday Configuration",
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
        accessor: "BRANCH_CD",
        columnName: "Branch Name*",
        componentType: "editableSelect",
        defaultOptionLabel: "Select Branch Name",
        sequence: 2,
        alignment: "center",
        width: 180,
        maxWidth: 250,
        minWidth: 120,
        options: () => GetBranchList(),
        _optionsKey: "GetBranchList",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["Branch Name is required."] },
            { name: "BRANCH_CD", params: ["Please select Branch Name."] },
          ],
        },
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.BRANCH_CD) {
                lb_error = true;
                ls_msg =
                  "Branch Name is Already entered at Line " + (index + 1);
                return ls_msg;
              }
            });
            if (lb_error) {
              return ls_msg;
            }
          }
          return "";
        },
        __EDIT__: { isReadOnly: true },
      },
      {
        columnName: "",
        componentType: "buttonRowCell",
        accessor: "HOLIDAYS",
        sequence: 3,
        buttonLabel: "Holidays",
        isVisible: false,
        __EDIT__: { isVisible: true },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 4,
      },
    ],
  },
};

export const HolidaysGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Holidays",
    rowIdColumn: "LINE_ID",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [],
  columns: [
    {
      accessor: "_displaySequence",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "HOLIDAY_DT",
      columnName: "Holiday Date*",
      componentType: "editableDatePicker",
      sequence: 2,
      alignment: "left",
      width: 160,
      maxWidth: 200,
      minWidth: 100,
      dateFormat: "dd/MM/yyyy",
      validation: (value, data, prev) => {
        const selectedDate = new Date(value);
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName = dayNames[selectedDate.getDay()];
        data.NAME = dayName;
        if (!Boolean(value)) {
          data.NAME = "";
          return "This is a required field";
        }
        if (!isValid(getParsedDate(value))) {
          data.NAME = "";
          return "Enter valid date";
        } else {
          let response = "";
          if (new Date(value) < data.START_DT) {
            return `Date should be between ${new Date(
              data.START_DT
            ).toLocaleDateString("en-IN")} - ${new Date(
              data.END_DT
            ).toLocaleDateString("en-IN")}`;
          }
          if (new Date(value) > data.END_DT) {
            return `Date should be between ${new Date(
              data.START_DT
            ).toLocaleDateString("en-IN")} - ${new Date(
              data.END_DT
            ).toLocaleDateString("en-IN")}`;
          }
          prev?.forEach((item, date) => {
            if (
              item.HOLIDAY_DT &&
              format(new Date(item.HOLIDAY_DT), "dd/MMM/yyyy") ===
                format(new Date(value), "dd/MMM/yyyy")
            ) {
              response = "This Value already exists.";
              return response;
            }

            // let Current = new Date().toLocaleDateString();
            // let holidayDate = new Date(data?.HOLIDAY_DT).toLocaleDateString();
            // if (holidayDate < Current) {
            //   response = "Entered Futured Date.";
            //   return response;
            // }
          });

          return response;
        }
      },
    },
    {
      accessor: "NAME",
      columnName: "Day Name",
      componentType: "default",
      sequence: 3,
      alignment: "center",
      width: 120,
      maxWidth: 180,
      minWidth: 100,
    },
    {
      accessor: "HOLIDAY_DESC",
      columnName: "Holiday Description*",
      componentType: "editableTextField",
      sequence: 4,
      alignment: "center",
      autoComplete: "off",
      width: 180,
      maxWidth: 250,
      minWidth: 120,
      defaultValue: "",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          {
            name: "HOLIDAY_DESC",
            params: ["Please Entered Holiday Description."],
          },
        ],
      },
    },
    {
      accessor: "DEFAULT_HOLIDAY",
      columnName: "Holiday Type*",
      componentType: "editableSelect",
      sequence: 5,
      alignment: "center",
      width: 150,
      maxWidth: 200,
      minWidth: 120,
      defaultValue: "N",
      required: true,
      options: [{ label: "Other", value: "N" }],
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          { name: "DEFAULT_HOLIDAY", params: ["Please select holiday ."] },
        ],
      },
    },
    {
      columnName: "Action",
      componentType: "deleteRowCell",
      accessor: "_hidden",
      sequence: 6,
      width: 120,
      minWidth: 120,
      maxWidth: 120,
    },
    {
      columnName: "Start Date",
      componentType: "date",
      accessor: "START_DT",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      sequence: 7,
      isVisible: false,
    },
    {
      columnName: "End Date",
      componentType: "date",
      accessor: "END_DT",
      dateFormat: "dd/MM/yyyy HH:mm:ss",
      sequence: 8,
      isVisible: false,
    },
  ],
};
