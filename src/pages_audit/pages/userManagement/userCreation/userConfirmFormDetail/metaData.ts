import { format } from "date-fns";

export const UserconfirmFormMetadata = {
  form: {
    name: "userCreateForm",
    label: "Admin User Confirmation",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    submitAction: "home",

    render: {
      ordering: "sequence",
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
        componentType: "textField",
      },
      name: "USER_NAME",
      sequence: 1,
      label: "User ID",
      placeholder: "Enter User ID",
      type: "text",
      required: true,
      maxLength: 16,

      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "DISP_USER_LEVEL",
      sequence: 2,
      label: "User Level",
      placeholder: "Select User Level",
      enableDefaultOption: true,
      required: true,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "DESCRIPTION",
      sequence: 3,
      label: "User Name",
      placeholder: "Enter User full name here",
      type: "text",
      required: true,
      maxLength: 32,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["User Name is required."] }],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "GROUP_NAME",
      sequence: 5,
      label: "Group Name",
      placeholder: "",
      type: "text",
      required: true,
      // options: () => {
      //   return GeneralAPI.GetSecurityGroupingList();
      // },
      // enableDefaultOption: true,
      // _optionsKey: "GetSecurityGroupingList",
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["Group Name is required."] }],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },

    {
      render: {
        componentType: "phoneNumber",
      },
      name: "CONTACT2",
      sequence: 4,
      label: "Mobile No",
      placeholder: "Mobile No",
      type: "text",
      required: true,
      maxLength: 11,
      StartAdornment: "+88",
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["Mobile no is required."] }],
      // },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "EMAIL_ID",
      sequence: 7,
      label: "Email ID",
      placeholder: "Enter the Email ID.",
      type: "text",
      required: true,
      maxLength: 100,

      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "USER_SUB_TYPE",
      sequence: 6,
      label: "User Sub Type",
      placeholder: "",
      // options: () => {
      //   return GeneralAPI.GetMiscValue("USER_SUB_TYPE");
      // },
      // enableDefaultOption: true,
      // _optionsKey: "GetSubTypeMiscValue",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "NOTIF_TEMPL_TRAN_CD",
      sequence: 8,
      label: "Notification Template",
      placeholder: "",
      // options: () => {
      //   return GeneralAPI.GetUsersNotificationTemplateList();
      // },
      // enableDefaultOption: true,
      // _optionsKey: "GetUsersNotificationTemplateList",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "spacer",
      },
      sequence: 9,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },

    {
      render: {
        componentType: "checkbox",
      },
      name: "ACTIVE_FLAG",
      sequence: 10,
      label: "Active",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "checkbox",
      },
      name: "ALLOW_RELEASE",
      sequence: 11,
      label: "Allow Release",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "INACTIVE_DATE",
      sequence: 12,
      label: "Inactive Date",
      isReadOnly: true,
      placeholder: "",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      dependentFields: ["ACTIVE_FLAG"],
      runValidationOnDependentFieldsChange: true,
      setValueOnDependentFieldsChange: (dependent) => {
        if (
          typeof dependent["ACTIVE_FLAG"]?.value === "boolean" &&
          !Boolean(dependent["ACTIVE_FLAG"]?.value)
        ) {
          return format(new Date(), "dd/MM/yyyy HH:mm:ss");
        }
        return null;
      },
      shouldExclude: (val1, dependent) => {
        if (
          typeof dependent["ACTIVE_FLAG"]?.value === "boolean" &&
          Boolean(dependent["ACTIVE_FLAG"]?.value)
        ) {
          return true;
        }
        return false;
      },
      __EDIT__: { render: { componentType: "textField", group: 0 } },
    },
  ],
};
