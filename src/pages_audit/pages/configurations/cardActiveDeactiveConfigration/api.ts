import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("CARD_STATUS");

export const getcardactivedeatvgrid = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETCARDACTVDACTVGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getcardactivedeativedetail = async (
  transactionID: number,
  formMode: string
) => {
  if (formMode === "new") {
    return [];
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETCARDACTVDACTVDTLDATA", {
        TRAN_CD: transactionID + "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const getcardactivedeativedml = async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "CARDACTIVEDEACTIVEDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
