//import { LOSSDK } from "registry/fns/functions";
import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const updEmailAcctMstFormData = async ({ data: formData }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "ENCEMAILDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
