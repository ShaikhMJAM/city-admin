import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("APP_IND_OTH");

export const getleavesmstgrid = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETLEAVESMSTGRID", {});
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getDetailsLeavesGridData = async (
  transactionID: number,
  formMode: string
) => {
  if (formMode === "new") {
    return [];
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETLEAVESDTLDATA", {
        TRAN_CD: transactionID + "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const leavessavedata = () => async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "LEAVESDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
