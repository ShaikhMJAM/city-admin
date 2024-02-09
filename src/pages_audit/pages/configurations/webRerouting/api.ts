import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getWebReroutingGrid = async (confirmed) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETWEBREROUTINGGRID", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
        POPUP_STATUS: item.POPUP_STATUS === "Y" ? true : false,
        LOGIN_STATUS: item.LOGIN_STATUS === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getWebReroutingData = async (
  transactionID: any,
  formMode: string
) => {
  if (formMode === "add") {
    return [];
  }
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETWEBREROUTINGDATA", {
      TRAN_CD: transactionID ?? "",
    });
  if (status === "0") {
    return [
      {
        ...data?.[0],
        ACTIVE: data?.[0]?.ACTIVE === "Y" ? true : false,
        POPUP_STATUS: data?.[0]?.POPUP_STATUS === "Y" ? true : false,
        LOGIN_STATUS: data?.[0]?.LOGIN_STATUS === "Y" ? true : false,
      },
    ];
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateWebReroutingConfig = async ({ data: reqdata }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "WEBREROUTINGCONFIGDML",
    reqdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateWebReroutingConfirm = async ({ confirmed, tran_cd }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "WEBREROUTINGCONFIGCONFIRM",
    { CONFIRMED: confirmed, TRAN_CD: tran_cd }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
