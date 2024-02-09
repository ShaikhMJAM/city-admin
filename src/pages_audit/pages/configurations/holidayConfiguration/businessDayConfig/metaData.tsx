import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GetBranchList } from "../api";
import { GridMetaDataType } from "components/dataTableStatic";
import { format } from "date-fns";

import { lessThanDate } from "registry/rulesEngine";

export const BusinessDayConfigMetadata: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "Holidayconfig",
      label: "Business Day Configuration",
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
        render: { componentType: "datePicker" },
        name: "START_DT",
        label: "Start Date",
        format: "dd/MM/yyyy",
        required: true,
        maxLength: 150,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        isReadOnly: true,
      },
      {
        render: { componentType: "datePicker" },
        name: "END_DT",
        label: "End Date",
        format: "dd/MM/yyyy",
        required: true,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        isReadOnly: true,
      },
      {
        render: { componentType: "textField" },
        name: "DESCRIPTION",
        label: "Decription",
        required: true,
        GridProps: { xs: 12, md: 6, sm: 6 },
        fullWidth: true,
        isReadOnly: true,
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "Business Day Configuration",
      rowIdColumn: "LINE_ID",
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
        accessor: "BUSINESS_DT",
        columnName: "Date",
        sequence: 2,
        alignment: "center",
        componentType: "date",
        dateFormat: "dd/MM/yyyy",
        width: 110,
        maxWidth: 150,
        minWidth: 70,
      },
      {
        accessor: "DAY_NAME",
        columnName: "Day Name",
        sequence: 3,
        componentType: "default",
        width: 110,
        maxWidth: 150,
        minWidth: 70,
      },
      {
        accessor: "HOLIDAY_FLAG",
        columnName: "Business Day/Holiday",
        sequence: 3,
        componentType: "editableSelect",
        options: [
          { label: "Holiday", value: "Y" },
          { label: "Business Day", value: "N" },
        ],
        width: 160,
        maxWidth: 180,
        minWidth: 70,
      },
      {
        accessor: "DAY_DESC",
        columnName: "Description",
        componentType: "editableTextField",
        sequence: 5,
        alignment: "left",
        autoComplete: "off",
        width: 300,
        maxWidth: 500,
        minWidth: 120,
        maxLength: 100,
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
    ],
  },
};
