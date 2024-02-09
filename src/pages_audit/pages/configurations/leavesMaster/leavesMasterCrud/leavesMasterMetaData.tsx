import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";

export const leavesMasterDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "addLeavesMaster",
      label: "Leaves Master",
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
        render: { componentType: "textField" },
        name: "TEMPLATE_DESC",
        label: "Template",
        placeholder: "Enter a Template",
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
      gridLabel: "Leaveas Master Detail",
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
        accessor: "NO_OF_LEAF",
        columnName: "Number of Leaves*",
        componentType: "editableNumberFormat",
        placeholder: "Enter Number of Leaves",
        sequence: 2,
        alignment: "right",
        width: 150,
        autoComplete: "off",
        maxWidth: 250,
        minWidth: 100,
        FormatProps: {
          allowNegative: false,
          allowLeadingZeros: true,
          decimalScale: 0,
          isAllowed: (values) => {
            if (values?.value?.length > 4) {
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
        validation: (value, data, prev) => {
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.NO_OF_LEAF) {
                lb_error = true;
                ls_msg =
                  "Number of Leaves is Already entered at Line " + (index + 1);
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
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 3,
      },
    ],
  },
};
