import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";
// export const GetMiscValue = () => GeneralAPI.GetMiscValue("CHANNEL");

export const GetMiscValue = async () => {
  const optionValue = await GeneralAPI.GetMiscValue("CHANNEL");
  const addOption = {
    label: "Both",
    value: "B",
  };

  return optionValue.concat([addOption]);
};

export const getPageContentGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETPAGECONTENTGRIDDATA", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updatePageContent = async (formData) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "PAGECONTENTDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
