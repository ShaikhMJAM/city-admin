import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("APP_INDICATOR");
export const getSourceParentGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETSOURCEPARENTTYPEGRID", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        TRN_USER: item.TRN_USER === "Y" ? true : false,
        VIEW_USER: item.VIEW_USER === "Y" ? true : false,
        BENF_ALLOW: item.BENF_ALLOW === "Y" ? true : false,
        SINGUP_ALLOW: item.SINGUP_ALLOW === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

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
