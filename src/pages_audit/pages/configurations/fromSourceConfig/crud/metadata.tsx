import { GridMetaDataType } from "components/dataTableStatic";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";

export const FromSourceConfigDetailsMetaData: MasterDetailsMetaData = {
  masterForm: {
    form: {
      name: "editfromSourceConfig",
      label: "From Source Key Value Configuration",
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
        name: "SERVICE_TYPE",
        label: "Service",
        placeholder: "",
        required: true,
        maxLength: 300,
        showMaxLength: false,
        GridProps: { xs: 12, md: 4, sm: 4 },
        fullWidth: true,
        validate: "getValidateValue",
        autoComplete: "off",
        __EDIT__: { isReadOnly: true },
      },
      {
        render: { componentType: "textField" },
        name: "DESCRIPTION",
        label: "Description",
        placeholder: "",
        required: true,
        maxLength: 300,
        showMaxLength: false,
        GridProps: { xs: 12, md: 8, sm: 8 },
        fullWidth: true,
        validate: "getValidateValue",
        autoComplete: "off",
        __EDIT__: { isReadOnly: true },
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
      gridLabel: "FromSourceDetails",
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
        columnName: "Sr. No",
        componentType: "default",
        sequence: 1,
        alignment: "right",
        width: 70,
        maxWidth: 150,
        minWidth: 60,
        isAutoSequence: true,
      },
      {
        accessor: "DB_COLUMN",
        columnName: "Description*",
        componentType: "editableSelect",
        sequence: 2,
        alignment: "left",
        defaultOptionLabel: "Select Description",
        width: 240,
        minWidth: 150,
        maxWidth: 300,
        options: "GetMiscValue",
        _optionsKey: "GetMiscValue",
        requestProps: "360_API",
        disableCachingOptions: true,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
          if (Array.isArray(prev)) {
            let lb_error = false;
            let ls_msg = "";
            prev.forEach((item, index) => {
              if (value === item?.DB_COLUMN) {
                lb_error = true;
                ls_msg =
                  "Description is Already entered at Line " + (index + 1);
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
      // {
      //   accessor: "DESCRIPTION",
      //   columnName: "Description",
      //   componentType: "default",
      //   sequence: 2,
      //   alignment: "left",
      //   width: 180,
      //   minWidth: 100,
      //   maxWidth: 250,
      //   // validation: (value, data, prev) => {
      //   //   if (!Boolean(value)) {
      //   //     return "This field is required";
      //   //   }
      //   // },
      // },
      {
        accessor: "ALLOW_DISALLOW",
        columnName: "Allow/Disallow*",
        componentType: "editableSelect",
        sequence: 2,
        alignment: "left",
        defaultOptionLabel: "Select Allow/Disallow",
        width: 140,
        minWidth: 100,
        maxWidth: 200,
        options: () => {
          return [
            { value: "Y", label: "ALLOW" },
            { value: "N", label: "DISALLOW" },
          ];
        },
        disableCachingOptions: true,
        validation: (value, data, prev) => {
          if (!Boolean(value)) {
            return "This field is required";
          }
        },
      },
      {
        accessor: "TEMPL_TRAN_CD",
        columnName: "Template",
        componentType: "editableSelect",
        sequence: 9,
        alignment: "center",
        defaultOptionLabel: "Select Template",
        enableDefaultOption: true,
        width: 250,
        maxWidth: 350,
        minWidth: 180,
        disableCachingOptions: true,
        options: "GetFromSourceTemplateList",
        _optionsKey: "GetFromSourceTemplateList",
        dependentOptionField: "DB_COLUMN",
      },
      {
        accessor: "ALLOW_FLAG",
        columnName: "Response Key Value",
        sequence: 7,
        componentType: "editableTextField",
        defaultValue: "Y",
        isVisible: false,
      },
      {
        columnName: "",
        componentType: "buttonRowCell",
        accessor: "VIEW_DETAIL",
        sequence: 11,
        buttonLabel: "View Details",
        isVisible: false,
        __EDIT__: { isVisible: true },
        width: 120,
        minWidth: 100,
        maxWidth: 200,
      },
      {
        columnName: "Action",
        componentType: "deleteRowCell",
        accessor: "_hidden",
        sequence: 12,
        width: 100,
        minWidth: 80,
        maxWidth: 200,
      },
    ],
  },
};

export const FromSourceConfigSubDtlGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "From Source Key Value Configuration",
    rowIdColumn: "LINE_ID",
    defaultColumnConfig: {
      width: 400,
      maxWidth: 450,
      minWidth: 300,
    },
    allowColumnReordering: true,
    disableSorting: false,
    hideHeader: true,
    disableGroupBy: true,
    enablePagination: false,
    pageSizes: [10, 20, 30],
    defaultPageSize: 10,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
    allowFilter: false,
    allowColumnHiding: false,
    allowRowSelection: false,
    isCusrsorFocused: true,
    hiddenFlag: "_hidden",
    disableLoader: true,
  },
  filters: [],
  columns: [
    {
      accessor: "_displaySequence",
      columnName: "Sr. No.",
      sequence: 1,
      alignment: "right",
      componentType: "default",
      width: 80,
      minWidth: 80,
      maxWidth: 120,
      isAutoSequence: true,
    },
    {
      accessor: "DB_COLUMN",
      columnName: "Response Key",
      sequence: 6,
      componentType: "disableSelect",
      placeholder: "",
      width: 200,
      minWidth: 180,
      maxWidth: 250,
      skipDefaultOption: true,
      options: "GetMiscValue",
      _optionsKey: "GetMiscValue",
      requestProps: "360_API",
      validation: (value, data, prev) => {
        if (!Boolean(value.trim())) {
          return "This field is required";
        }
        return "";
      },
    },
    {
      accessor: "DB_VALUE",
      columnName: "Response Key Value*",
      sequence: 6,
      componentType: "editableTextField",
      placeholder: "Enter Response Key Value",
      width: 250,
      autoComplete: "off",
      minWidth: 180,
      maxWidth: 350,
      maxLength: 100,
      validation: (value, data, prev) => {
        if (!Boolean(value.trim())) {
          return "This field is required";
        } else {
          let response = "";
          prev?.forEach((item) => {
            if (item.DB_VALUE && item.DB_VALUE === value) {
              response = "This Value already exists.";
              return;
            }
          });
          return response;
        }
      },
    },
    {
      accessor: "ALLOW_FLAG",
      columnName: "Response Key Value",
      sequence: 7,
      componentType: "editableTextField",
      defaultValue: "Y",
      isVisible: false,
    },
    {
      columnName: "Action",
      componentType: "deleteRowCell",
      accessor: "_hidden",
      sequence: 11,
      width: 100,
      minWidth: 100,
      maxWidth: 100,
    },
  ],
};
