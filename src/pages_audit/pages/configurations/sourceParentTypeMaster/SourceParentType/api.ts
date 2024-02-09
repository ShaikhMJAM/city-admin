//import { LOSSDK } from "registry/fns/functions";
import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const updSourceParentGridData = async ({ data, setServerError }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SOURCEPARENTTYPEDML",
    data
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
