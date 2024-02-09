import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getBankMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBANKMASTERGRIDDATA", {});
  if (status === "0") {
    return data.map((item) => {
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
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const getBankMasterGridDataForServer =
  ({ reqPara }) =>
  async (fromNo, toNo, sortBy, filterBy) => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETBANKMASTERSERGRID", {
        reqPara: reqPara,
        from_row: fromNo,
        to_row: toNo,
        orderby_columns: sortBy,
        filter_conditions: filterBy,
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
      return { status, data: DefaultErrorObject(message, messageDetails) };
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

export const updateBankMastersData = async (formData: any) => {
  const {
    status,
    message,
    messageDetails,
    isPrimaryKeyError = false,
  } = await AuthSDK.internalFetcher("BANKMASTERUPDATEDML", formData);
  if (status === "0") {
    return message;
  } else {
    if (isPrimaryKeyError) {
      throw {
        error_msg: message,
        severity: "error",
        error_detail: messageDetails,
        isPrimaryKeyError: "Routing number already exists",
      };
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const updateBankMastersDataDelete = async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "BANKMASTERDELETEDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const uploadBankMastersDataFile = async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "FILEUPDBANKMASTER",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
