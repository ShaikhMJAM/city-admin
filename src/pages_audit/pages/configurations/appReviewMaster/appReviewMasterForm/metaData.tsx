import { isValid } from "date-fns/esm";

const currentDate = new Date();

export const MobileAppReviewMetaData = {
  form: {
    name: "ReviewUserMaster",
    label: "Application Review User Master",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    // submitAction: "home",
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
      render: { componentType: "hidden" },
      name: "TRAN_CD",
    },
    {
      render: {
        componentType: "hidden",
      },
      name: "USER_NAME",
      label: "User Name",
      placeholder: "",
      type: "text",
      autoComplete: "off",
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["This field is required"] },
          {
            name: "USER_NAME",
            params: ["Please Enter Review by Login ID."],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "loginID",
      },
      name: "CUSTOM_USER_NM",
      label: "Test Login ID",
      placeholder: "Enter Test Login ID",
      type: "text",
      autoComplete: "off",
      // autoFocus: true,
      fullWidth: true,
      required: true,
      postValidationSetCrossFieldValues: "getUserDetailThroughLoginID",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      // __NEW__: { isReadOnly: true },
      //@ts-ignore
      isFieldFocused: true,
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
      name: "CUST_NAME",
      label: "Review Login Name",
      placeholder: "Enter Review Login Name",
      autoComplete: "off",
      type: "text",
      fullWidth: true,
      isReadOnly: true,
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
      name: "APP_VERSION",
      label: "Latest Version",
      placeholder: "Enter Latest Version",
      type: "text",
      autoComplete: "off",
      maxLength: 10,
      showMaxLength: true,
      fullWidth: true,
      required: true,
      validate: (currentField, value) => {
        if (!Boolean(currentField?.value)) {
          return "This field is required.";
        } else if (/^[ ]/.test(currentField?.value)) {
          return "Space at the beginning is not allowed.";
        } else if (/[~`!@#$%^&*()-+={}:"<>?,_]/g.test(currentField?.value)) {
          return "Enter a proper Mobile App Version.";
        } else if (!/^\d+(\.\d+)+$/.test(currentField?.value)) {
          return "Enter a proper Mobile App Version.";
        }
        return "";
      },

      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "datetimePicker",
      },
      name: "VALID_UPTO",
      label: "Expiry Date*",
      placeholder: "Enter Expiry Date",
      type: "date",
      autoComplete: "off",
      fullWidth: true,
      format: "dd/MM/yyyy HH:mm:ss",
      required: true,
      minDate: currentDate,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      validate: (currentField) => {
        if (Boolean(currentField?.value) && !isValid(currentField?.value)) {
          return "Must be a valid date";
        }
        if (currentField?.value < currentDate) {
          return "Past date is not allowed!";
        }
        return "";
      },

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
      name: "LAST_LOGIN_DT",
      label: "Test User Last Login Date",
      placeholder: "Enter Test User Last Login Date",
      autoComplete: "off",
      // type: "date",
      // format: "dd/MM/yyyy",
      fullWidth: true,
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: { componentType: "hidden" },
      name: "ACTIVE",
      label: "Active",
      GridProps: { xs: 12, md: 4, sm: 4 },
      __EDIT__: { render: { componentType: "checkbox" } },
    },
  ],
};
