//import { LOSSDK } from "registry/fns/functions";
import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getDistMasterFormData = async ({ formView, distCode }) => {
  if (formView === "add") {
    return {};
  } else {
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "UPDDISTMSTFORMDATA",
      {
        DIST_CD: distCode,
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const updateUserMasterDetails = async (reqData) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPDSECURITYGROUPING",
    reqData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
