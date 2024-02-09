import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getMsMessageConfigGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMSMESSAGEGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
