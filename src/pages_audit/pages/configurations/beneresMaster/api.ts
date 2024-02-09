import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("BEN_RESTRICT");

export const getBeneresMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBENERESGRIDDATA", {});
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,
        ACCOUNT_NO: item.BEN_VALUE,
        ACCOUNT_NM: item.BEN_VALUE,
        MOBILE_NO: item.BEN_VALUE,
        PRODUCT_CD: item.BEN_VALUE,
        EMAIL_ID: item.BEN_VALUE,
        ROUTING_NO: item.BEN_VALUE,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
