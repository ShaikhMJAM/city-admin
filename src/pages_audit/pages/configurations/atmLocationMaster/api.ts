import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getAtmLocMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETATMLOCGRIDDATA", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
