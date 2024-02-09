import { FilterFormMetaType } from "components/formcomponent";

export const ScreenAccessRightsFilterForm: FilterFormMetaType = {
  gridConfig: {
    dense: true,
    title: "Screen Access Rights",
    allowColumnHiding: true,
    submitButtonName: "Fetch Details",
  },
  fields: [
    {
      accessor: "SEARCH",
      name: "SEARCH",
      defaultValue: "U",
      isVisible: true,
      gridconfig: { xs: 6, sm: 4 },
      label: "Search",
      autoComplete: "off",
      placeholder: "Select Option",
      isColumnHidingDisabled: true,
      entertoSubmit: true,
      type: "select",
      optiondata: [
        { label: "Users", value: "U" },
        { label: "Groups", value: "G" },
      ],
      validate: (columnValue, allField, flag) => {
        if (!Boolean(columnValue)) {
          return "This field is required.";
        }
        return "";
      },
    },
  ],
};
