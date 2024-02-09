import { getLanguageCode } from "../api";

export const DynBillerScreenNotesMetaData: any = {
  form: {
    name: "dynBillerScreenNotes",
    label: "Dynamic Biller Screen Notes",
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
    },
  },
  fields: [
    {
      render: {
        componentType: "arrayField",
      },
      name: "screenNotes",

      // __VIEW__: {
      removeRowFn: "deleteFormArrayFieldData",
      // },
      // __EDIT__: {
      //   removeRowFn: "deleteFormArrayFieldData",
      // },
      // __NEW__: {
      //   removeRowFn: "deleteArrayFieldData",
      // },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "select",
          },
          name: "LANGUAGE_CD",
          label: "Language",
          defaultOptionLabel: "Select Language",
          required: true,
          options: () => getLanguageCode(),
          _optionsKey: "getLanguageCode",
          schemaValidation: {
            type: "string",
            rules: [{ name: "required", params: ["Language is required."] }],
          },
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "SCREEN_MSG",
          label: "Screen Message",
          placeholder: "Enter Screen Message",
          required: true,
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Screen Message is required."] },
            ],
          },
          multiline: true,
          fullWidth: true,
          minRows: 10,
          maxRows: 10,
          GridProps: {
            xs: 12,
            md: 9,
            sm: 9,
          },
        },
      ],
    },
  ],
};
