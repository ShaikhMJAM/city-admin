import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getUserGroupGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETUSERGROUPGRIDDATA", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updUsrGrpData = async ({ data: formData }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPDSECURITYGROUPING",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
