import { FilterFormMetaType } from "components/formcomponent";

export const ReleaseUserMercFilterForm: FilterFormMetaType = {
  gridConfig: {
    dense: true,
    title: "Release PGW Block Users",
    allowColumnHiding: false,
    submitButtonName: "Fetch",
  },
  fields: [
    {
      name: "block_type",
      defaultValue: "ALL",
      isVisible: true,
      gridconfig: { xs: 6, sm: 5 },
      defaultfocus: true,
      label: "Block Type*",
      autoComplete: "off",
      placeholder: "Please select status",
      isColumnHidingDisabled: true,
      entertoSubmit: true,
      type: "select",
      optiondata: [
        { label: "ALL", value: "ALL" },
        { label: "Login Password", value: "LOGINPASS" },
        { label: "OTP PIN", value: "OTP" },
      ],
    },
  ],
};
