import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getReleaseUsersMercGridData = async ({ type }) => {
  if (!Boolean(type)) {
    throw DefaultErrorObject("Please Select Release Type.", "warning");
  } else {
    let APIURL = "BLOCKUSERS_PGW";
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher(`${APIURL}`, {
        TYPE: type,
        DISPLAY_LANGUAGE: "en",
        ACTION: "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};
