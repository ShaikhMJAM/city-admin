import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getAppReviewGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETAPPREVDATA", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        ACTIVE_FLAG: item.ACTIVE === "Y" ? true : false,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updAppReviewGridData = async ({ data, setServerError }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "APPREVIWEUSERMSTDML",
    data
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
