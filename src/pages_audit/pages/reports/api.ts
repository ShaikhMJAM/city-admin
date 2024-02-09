import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { components, filters } from "components/report";
import { GeneralAPI } from "registry/fns/functions/general";
import { format } from "date-fns";

export const GetMiscValue = (categoryCode) =>
  GeneralAPI.GetMiscValue(categoryCode);

export const getDynamicReportMetaData = async (reportID) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETDYNAMICREPORTMETADATA", {
      TRAN_CD: reportID,
    });
  if (status === "0") {
    let columns = data[0].COLUMNS.map((one) => {
      let comumn: any = {
        columnName: one.COLUMN_NAME,
        accessor: one.COLUMN_ACCESSOR,
        Filter:
          one.COLUMN_FILTER_TYPE === "SELECT"
            ? filters.SelectColumnFilter
            : one.COLUMN_FILTER_TYPE === "SLIDER"
            ? filters.SliderColumnFilter
            : filters.DefaultColumnFilter,
        width: one.COLUMN_WIDTH,
      };
      if (one.COLUMN_TYPE === "DATE") {
        comumn = { ...comumn, Cell: components.DateCell };
      } else if (one.COLUMN_TYPE === "DATETIME") {
        comumn = { ...comumn, Cell: components.DateTimeCell };
      } else if (one.COLUMN_TYPE === "AMOUNT") {
        comumn = {
          ...comumn,
          isDisplayTotal: true,
          Cell: components.NumberCell,
          alignment: "right",
        };
      } else if (one.COLUMN_TYPE === "NUMBER") {
        comumn = {
          ...comumn,
          Cell: components.NumberCell,
          alignment: "right",
        };
      }
      return comumn;
    });
    let filter = data[0].FILTER.map((one) => {
      return {
        render: {
          componentType: one.COLUMN_TYPE,
        },
        name: one.COLUMN_ACCESSOR,
        label: one.COLUMN_NAME,
        placeholder: "",
        defaultValue:
          one.COLUMN_TYPE === "datePicker" ||
          one.COLUMN_TYPE === "datetimePicker"
            ? new Date()
            : "",
        format: Boolean(one.COLUMN_FORMAT)
          ? one.COLUMN_FORMAT
          : one.COLUMN_TYPE === "datePicker"
          ? "dd/MM/yyyy"
          : one.COLUMN_TYPE === "datetimePicker"
          ? "dd/MM/yyyy HH:mm:ss"
          : "",
        schemaValidation: {
          type: "string",
          rules: [{ name: "required", params: ["This field is required."] }],
        },
        GridProps: {
          xs: 12,
          md: 3,
          sm: 6,
        },
      };
    });
    let result = {
      title: data[0].TITLE,
      disableGroupBy: data[0].DISABLE_GROUP_BY,
      hideFooter: data[0].HIDE_FOOTER,
      hideAmountIn: data[0].HIDE_AMOUNT_IN,
      retrievalType: data[0].RETRIEVAL_TYPE,
      columns: columns,
      filters: {
        form: {
          name: "dynamicReport",
          label: "Retrieval Parameters",
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
        fields: filter,
      },
    };
    return result;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getReportData = async (reportID, filter, otherAPIRequestPara) => {
  const newData: any = {};
  filter.forEach((item) => {
    newData[item.id] = item.value.value;
  });
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(
      reportID,
      {
        A_FROM_DT: format(new Date(), "dd/MM/yyyy"),
        A_TO_DT: format(new Date(), "dd/MM/yyyy"),
        A_CUSTOM_USER_NM: "",
        USER_NAME: newData?.A_CUSTOM_USER_NM ?? "",
        A_TRN_TYPE: "",
        A_STATUS: "ALL",
        A_FR_AMT: "",
        A_TO_AMT: "",
        V_CHANNEL: "ALL",
        CHANNEL: "ALL",
        BILLER_ID: "",
        SUB_CATEGORY_ID: "",
        A_MER_TRAN_CD: "",
        A_FLAG:
          reportID === "OTPSMS" || reportID === "MOBILEEMAILSMS"
            ? "ALL"
            : "DATE",
        A_KEY: "ALL",
        A_FILTER_VALUE: "ALL",
        A_PAGE_NO: "",
        A_PAGE_SIZE: "",
        TRN_TYPE: "ALL",
        A_PRODUCT_TYPE: "BOTH",
        ...newData,
        ...otherAPIRequestPara,
      },
      {},
      300000
    );
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getServerReportData = async ({ reportID, APIRequestPara }) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(reportID, APIRequestPara);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getBankMasterGridDataForServer = async ({
  reportID,
  APIRequestPara,
}) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBANKMASTERSERGRID", {
      ...APIRequestPara,
      reqPara: "",
      // from_row: null,
    });
  if (status === "0") {
    let resData = data.map((item) => {
      return {
        ...item,
        NPSB_ENABLED_LABEL: item.NPSB_ENABLED === "Y" ? "YES" : "NO",
        BEFTN_ENABLED_LABEL: item.BEFTN_ENABLED === "Y" ? "YES" : "NO",
        RTGS_ENABLED_LABEL: item.RTGS_ENABLED === "Y" ? "YES" : "NO",
        NPSB_ENABLED: item.NPSB_ENABLED === "Y" ? true : false,
        BEFTN_ENABLED: item.BEFTN_ENABLED === "Y" ? true : false,
        RTGS_ENABLED: item.RTGS_ENABLED === "Y" ? true : false,
      };
    });
    return { status, data: { rows: resData, total_count: 11000 } };
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
  // if (status === "0") {
  //   return data.map((item) => {
  //     return {
  //       ...item,
  //       NPSB_ENABLED_LABEL: item.NPSB_ENABLED === "Y" ? "YES" : "NO",
  //       BEFTN_ENABLED_LABEL: item.BEFTN_ENABLED === "Y" ? "YES" : "NO",
  //       RTGS_ENABLED_LABEL: item.RTGS_ENABLED === "Y" ? "YES" : "NO",
  //       NPSB_ENABLED: item.NPSB_ENABLED === "Y" ? true : false,
  //       BEFTN_ENABLED: item.BEFTN_ENABLED === "Y" ? true : false,
  //       RTGS_ENABLED: item.RTGS_ENABLED === "Y" ? true : false,
  //     };
  //   });
  // } else {
  //   throw DefaultErrorObject(message, messageDetails);
  // }
};

export const getCustomRetrievalReportData = async (
  reportID,
  filter,
  otherAPIRequestPara
) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(reportID, {
      ...filter?.[0],
      ...otherAPIRequestPara,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
