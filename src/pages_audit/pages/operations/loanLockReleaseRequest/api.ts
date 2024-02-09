import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getLoanLockReleaseReqGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("LOANLOCKRELEASEREQGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
