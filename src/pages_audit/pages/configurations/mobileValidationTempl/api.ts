import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("360_API");

export const getMobileValidationTemplateGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMOBILEVALTEMPLLIST", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMobileValidationTemplateDetailGridData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMOBILEVALIDTLDATA", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateMobileValidationTemplateData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("MOBVALIDTEMPDML", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
