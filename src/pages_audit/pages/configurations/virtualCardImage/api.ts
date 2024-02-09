import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getVirtualCardImageGrid = async (confirmed) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETVIRTUALCARDIMAGELIST", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    // return data;
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getVirtualCardImage = async (
  transactionID: any,
  formMode: string
) => {
  if (formMode === "add") {
    return [];
  }
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETVIRTUALCARDIMAGE", {
      TRAN_CD: transactionID ?? "",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const virtualCardConfig = async ({ confirmed, tran_cd }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "VCARDIMAGECONFIRM",
    { CONFIRMED: confirmed, TRAN_CD: tran_cd }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updateCardImage = async ({ data: reqdata }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "VCARDIMAGECONFDML",
    reqdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
