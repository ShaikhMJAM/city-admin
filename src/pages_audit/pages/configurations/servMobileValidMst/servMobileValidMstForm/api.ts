import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const updServMobileValidFormData = async ({ data: formData }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SERVICEMOBVALID",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
