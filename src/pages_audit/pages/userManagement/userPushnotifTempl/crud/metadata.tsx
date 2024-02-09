import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";

export const UserPushnotifDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "editUserPushnotif",
      label: "Admin User Notification Template",
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
        render: { componentType: "textField" },
        name: "DESCRIPTION",
        label: "Admin User Notification Template Name",
        placeholder: "Enter Admin User Notification Template Name",
        required: true,
        maxLength: 300,
        showMaxLength: false,
        GridProps: { xs: 12, md: 12, sm: 12 },
        fullWidth: true,
        validate: "getValidateValue",
        autoComplete: "off",
        //@ts-ignore
        isFieldFocused: true,
      },
      {
        render: { componentType: "hidden" },
        name: "TRAN_CD",
      },
    ],
  },
  detailsGrid: {
    gridConfig: {
      dense: true,
      gridLabel: "UserPushnotifDetails",
      rowIdColumn: "SR_CD",
      defaultColumnConfig: { width: 150, maxWidth: 250, minWidth: 100 },
      allowColumnReordering: true,
      hideHeader: true,
      disableGroupBy: true,
      enablePagination: true,
      containerHeight: { min: "40vh", max: "40vh" },
      allowRowSelection: false,
      hiddenFlag: "_hidden",
      disableLoader: true,
    },
    columns: [
      {
        accessor: "SR_CD",
        columnName: "Sr. No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 80,
        maxWidth: 150,
        minWidth: 60,
        isAutoSequence: true,
      },
      {
        accessor: "USER_NAME",
        columnName: "User Login ID",
        sequence: 2,
        componentType: "editableSelect",
        placeholder: "",
        defaultOptionLabel: "Select User Login ID",
        width: 300,
        minWidth: 180,
        maxWidth: 450,
        options: "GetSecurityUsersList",
        _optionsKey: "GetSecurityUsersList",
        disableCachingOptions: true,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.USER_NAME) {
                lb_error = true;
                ls_msg =
                  "USER Login ID is Already entered at Line " + (index + 1);
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
        sequence: 12,
      },
    ],
  },
};
