import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("360_API");

export const getMsPropertiesGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMSPROPGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMsPropertiesDetailGridData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMSPROPDTLGRID", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateMsPropertiesData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("PROPERTIESCONFIGDML", reqdata);
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
