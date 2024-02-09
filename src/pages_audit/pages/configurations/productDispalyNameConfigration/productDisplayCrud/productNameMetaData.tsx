import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";

export const peoductNameMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "productdispalyname",
      label: "Product Display Name Configuration",
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
        render: { componentType: "hidden" },
        name: "SR_CD",
      },
      {
        render: { componentType: "hidden" },
        name: "LINE_ID",
      },
      {
        render: { componentType: "textField" },
        name: "PROD_DISPL_NAME",
        label: "Display Name",
        placeholder: "Enter display name",
        type: "text",
        required: true,
        maxLength: 100,
        showMaxLength: true,
        GridProps: { xs: 12, md: 6, sm: 6 },
        fullWidth: true,
        autoComplete: "off",
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "TEMPLATE_DESC", params: ["Please select Description."] },
          ],
        },
        //@ts-ignore
        isFieldFocused: true,
      },
      {
        render: { componentType: "hidden" },
        name: "ACTIVE",
        label: "Active",
        // defaultValue: true,
        GridProps: { xs: 12, md: 3, sm: 3 },
        __EDIT__: { render: { componentType: "checkbox" } },
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "Product Display Name Configuration",
      rowIdColumn: "LINE_ID1",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_NO",
        columnName: "Sr_no",
        sequence: 1,
        alignment: "right",
        componentType: "default",
        width: 90,
        minWidth: 60,
        maxWidth: 120,
        isAutoSequence: true,
      },
      {
        accessor: "COMP_CD",
        columnName: "Company Code",
        sequence: 1,
        alignment: "right",
        componentType: "default",
        width: 90,
        minWidth: 60,
        maxWidth: 120,
        isVisible: false,
      },
      {
        accessor: "SCHEME_CODE",
        columnName: "Scheme Code/Card BIN*",
        componentType: "editableTextField",
        placeholder: "Enter scheme code/Card BIN no.",
        sequence: 2,
        required: true,
        maxLength: 20,
        alignment: "left",
        autoComplete: "off",
        width: 210,
        maxWidth: 250,
        minWidth: 200,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.SCHEME_CODE) {
                lb_error = true;
                ls_msg =
                  "Scheme Code/Card BIN No is Already entered at Line " +
                  (index + 1);
                return ls_msg;
              }
            });
            if (lb_error) {
              return ls_msg;
            }
          }
          return "";
        },
      },
      {
        accessor: "SCHEME_NAME",
        columnName: "Scheme Name*",
        componentType: "editableTextField",
        sequence: 3,
        alignment: "left",
        autoComplete: "off",
        maxLength: 100,
        required: true,
        placeholder: "Enter scheme name",
        width: 250,
        maxWidth: 260,
        minWidth: 200,
        schemaValidation: {
          type: "string",
          rules: [
            { name: "required", params: ["This field is required"] },
            { name: "TEMPLATE_DESC", params: ["Please select Description."] },
          ],
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
