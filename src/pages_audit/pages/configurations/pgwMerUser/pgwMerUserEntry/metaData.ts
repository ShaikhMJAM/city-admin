export const PgwMerUserEntryMetaData = {
  form: {
    name: "pgwMerUser",
    label: "PGW Merchant User Creation",
    resetFieldOnUnmount: false,
    validationRun: "onBlur",
    submitAction: "home",
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
      render: {
        componentType: "select",
      },
      name: "TRAN_CD",
      label: "Gateway Name (PID)",
      placeholder: "Select Gateway Name (PID)",
      defaultOptionLabel: "Select Gateway Name (PID)",
      type: "text",
      sequence: 1,
      required: true,
      options: "GetPGWList",
      _optionsKey: "GetPGWList",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Gateway Name (PID) is required."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      __EDIT__: {
        isReadOnly: true,
        SelectProps: { IconComponent: () => null },
      },
      __VIEW__: {
        SelectProps: { IconComponent: () => null },
      },
      //@ts-ignore
      isFieldFocused: true,
      autoComplete: "off",
    },
    {
      render: {
        componentType: "loginID",
      },
      name: "USER_NAME",
      sequence: 2,
      label: "Login ID",
      placeholder: "Enter Preferred Login ID",
      type: "text",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Login ID is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      __EDIT__: { isReadOnly: true, isFieldFocused: true },
      autoComplete: "off",
      // __NEW__: { isReadOnly: false, isFieldFocused: true },
    },
    {
      render: {
        componentType: "select",
      },
      name: "USER_ROLE",
      sequence: 3,
      label: "User Role",
      placeholder: "Select User Role",
      defaultOptionLabel: "Select User Role",
      options: [
        { label: "ADMIN", value: "ADMIN" },
        { label: "USER", value: "USER" },
      ],
      _optionsKey: "GetUserRole",
      enableDefaultOption: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["User Role is required."] }],
      },
      __VIEW__: {
        SelectProps: { IconComponent: () => null },
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "USER_STATUS",
      sequence: 4,
      label: "User Status",
      placeholder: "Select User Status",
      defaultOptionLabel: "Select User Status",
      options: [
        { label: "ACTIVE", value: "A" },
        { label: "LOCKED", value: "L" },
        { label: "FORCE PASSWORD CHANGE", value: "F" },
        { label: "INACTIVE", value: "I" },
      ],
      _optionsKey: "GetUserStatus",
      enableDefaultOption: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["User Status is required."] }],
      },
      __VIEW__: {
        SelectProps: { IconComponent: () => null },
      },
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "MOBILE_NO",
      sequence: 5,
      label: "Mobile No",
      placeholder: "Mobile No",
      type: "text",
      required: true,
      maxLength: 11,
      StartAdornment: "+88",
      autoComplete: "off",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Mobile no is required."] }],
      },
      FormatProps: {
        allowNegative: false,
        allowLeadingZeros: true,
        decimalScale: 0,
        isAllowed: (values) => {
          if (values?.value?.length > 11) {
            return false;
          }
          return true;
        },
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
      name: "EMAIL_ID",
      sequence: 6,
      label: "Email ID",
      placeholder: "Enter the Email ID.",
      type: "text",
      required: true,
      maxLength: 100,
      autoComplete: "off",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email ID is required"] },
          { name: "email", params: ["Email ID is invalid"] },
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
        componentType: "textField",
      },
      name: "IP_ADDRESS",
      sequence: 7,
      label: "IP Address",
      placeholder: "Enter the IP Address.",
      type: "text",
      required: true,
      maxLength: 100,
      autoComplete: "off",
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["IP Address is required"] }],
      // },
      validate: (currentField, value) => {
        if (!Boolean(currentField?.value)) {
          return "IP Address is required.";
        } else {
          // const addresses = currentField?.value.split(",");
          const addresses = currentField?.value.includes(",")
            ? currentField?.value.split(",")
            : [currentField?.value];

          const isValidIPAddress = (ip) => {
            // Return true if valid, false otherwise
            const ipRegex =
              /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([0-9]|[1-9][0-9]|1[0-9][0-9]?)\.([0-9]|[1-9][0-9]|1[0-9][0-9]?)\.([0-9]|[1-9][0-9]|1[0-9][0-9]?)$/;
            return ipRegex.test(ip);
          };
          const isAllValidIP = addresses.every((address) =>
            isValidIPAddress(address)
          );

          if (!isAllValidIP) {
            return "Please enter valid IP Address.";
          }
        }
        return "";
      },

      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
  ],
};
