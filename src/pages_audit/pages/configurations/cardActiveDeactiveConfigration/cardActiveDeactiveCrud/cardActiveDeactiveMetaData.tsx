import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { GetMiscValue } from "../api";

export const cardActiveDeactiveMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "addCardActiveDeactiveMetaData",
      label: "Card Activate/Deactivate Status Configuration",
      resetFieldOnUnmount: false,
      validationRun: "onBlur",
      render: {
        ordering: "auto",
        renderType: "simple",
        gridConfig: {
          item: {
            xs: 12,
            sm: 3,
            md: 3,
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
        render: { componentType: "select" },
        name: "CARD_STATUS",
        label: "Card Status",
        placeholder: " ",
        defaultOptionLabel: "Select Card Status",
        options: () => GetMiscValue(),
        _optionsKey: "GetMiscValue-CARD_STATUS",
        defaultValue: "",
        type: "text",
        required: true,
        showMaxLength: false,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "CARD_STATUS", params: ["Please select Card Status."] },
          ],
        },
        //@ts-ignore
        isFieldFocused: true,
      },
      {
        render: { componentType: "textField" },
        name: "STATUS_VALUE",
        label: "Status Value",
        placeholder: "Enter Status Value",
        type: "text",
        required: true,
        maxLength: 10,
        showMaxLength: true,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "STATUS_VALUE", params: ["Please select Status Value."] },
          ],
        },
      },
      {
        render: { componentType: "select" },
        name: "TYPE_OF_TRAN",
        label: "Operation Type",
        placeholder: " ",
        defaultOptionLabel: "Select Operation Type",
        type: "text",
        required: true,
        showMaxLength: false,
        GridProps: { xs: 12, md: 3, sm: 3 },
        fullWidth: true,
        options: [
          { label: "ACTIVATE", value: "A" },
          { label: "DEACTIVATE", value: "D" },
        ],
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "TYPE_OF_TRAN", params: ["Please select Operation Type."] },
          ],
        },
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "Card Activate/Deactivate Status Configuration",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      // enablePagination: true,
      containerHeight: { min: "45vh", max: "45vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_NO",
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
        accessor: "ENABLE_STATUS",
        columnName: "Enable Status*",
        componentType: "editableSelect",
        defaultOptionLabel: "Select Enable Status",
        placeholder: " ",
        options: () => GetMiscValue(),
        _optionsKey: "GetMiscValue-CARD_STATUS",
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.ENABLE_STATUS) {
                lb_error = true;
                ls_msg =
                  "Enable status is Already entered at Line " + (index + 1);
                return ls_msg;
              }
            });
            if (lb_error) {
              return ls_msg;
            }
          }
          return "";
        },
        sequence: 2,
        alignment: "left",
        width: 150,
        maxWidth: 250,
        minWidth: 100,
      },
      {
        accessor: "STATUS_VALUE",
        columnName: "Status Value*",
        componentType: "editableTextField",
        placeholder: "Enter Status Value",
        sequence: 2,
        alignment: "left",
        width: 150,
        maxWidth: 250,
        minWidth: 100,
        autoComplete: "off",
        maxLength: 10,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.STATUS_VALUE) {
                lb_error = true;
                ls_msg =
                  "Status Value is Already entered at Line " + (index + 1);
                return ls_msg;
              }
            });
            if (lb_error) {
              return ls_msg;
            }
          }
          return "";
        },
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required"] }],
        },
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 3,
      },
    ],
  },
};
