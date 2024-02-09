import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getScreenNoteGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETSCREENNOTEGRIDDATA", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateScreenNote = async (formData) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SCREENMSGMSTDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
