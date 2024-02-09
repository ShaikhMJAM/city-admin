import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("360_API");

export const getBannerMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBANNMSTGRID", {
      BANN_TYPE: "A",
      USER_NAME: null,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getBannerMasterDetailGridData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBANNDTLGRID", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateBannerMasterData = async (reqdata) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "BANNERCONFIGDML",
    reqdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
