import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("TRAN_TYPE");

export const getTenureTypeConfigGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETTENURECONFIGGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updateTenureTypeConfigData = async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "FDTYPEHDRDTLDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getDetailsGridData = async (transactionID: number) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFDTYPEDTLDATA", {
      TRAN_CD: transactionID,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const getTenureSubDetailsGridData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFDTYPESDTDATA", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updTenuresTypeData =
  () =>
  async ({ data: reqdata }) => {
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "FDTYPESDTDML",
      reqdata
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
